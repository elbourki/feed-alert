/* Amplify Params - DO NOT EDIT
  API_GRAPHQL_GRAPHQLAPIENDPOINTOUTPUT
  API_GRAPHQL_GRAPHQLAPIIDOUTPUT
  API_GRAPHQL_GRAPHQLAPIKEYOUTPUT
  ENV
  REGION
Amplify Params - DO NOT EDIT */
const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const Parser = require("rss-parser");
const {
  GraphQLGateway,
  IAMCredentialsStrategy,
} = require("@crft/appsync-gateway");
var admin = require("firebase-admin");
const AWS = require("aws-sdk");

const parser = new Parser();
const gateway = new GraphQLGateway(
  new IAMCredentialsStrategy(),
  process.env.API_GRAPHQL_GRAPHQLAPIENDPOINTOUTPUT
);
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

const secretsManager = new AWS.SecretsManager({
  region: process.env.REGION,
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/aggregator/queue", async function (req, res) {
  res.json(
    (
      await gateway.runQuery({
        query: `query ListFeeds($filter: ModelFeedFilterInput) {
          listFeeds(filter: $filter) {
            items {
              id
              link
            }
          }
        }`,
        operationName: "ListFeeds",
      })
    ).listFeeds.items
  );
});

const asyncFilter = async (arr, predicate) =>
  arr.reduce(async (memo, e) => [...await memo, ...await predicate(e) ? [e] : []], []);

app.post("/aggregator/parse", async function (req, res) {
  let feed = await parser.parseURL(req.body.link);
  res.json({
    id: req.body.id,
    items: (await asyncFilter(feed.items, async ({
      guid, link, isoDate
    }) => (await gateway.runQuery({
      query: `query ItemByGuid($guid: String) {
        itemByGUID(guid: $guid) {
          items {
            id
          }
        }
      }`,
      operationName: "ItemByGuid",
      variables: {
        guid: guid || link + isoDate
      }
    })).itemByGUID.items.length === 0)).map(({
      isoDate,
      contentSnippet,
      content,
      categories,
      title,
      link,
      guid,
      'content:encoded': html
    }) => ({
      title,
      link,
      guid: guid || link + isoDate,
      html: html || content,
      publishedAt: isoDate,
      categories: JSON.stringify(categories) || '[]',
      snippet: contentSnippet ? contentSnippet.substring(0, 200) : null
    })).slice(0, 10),
  });
});

app.post("/aggregator/store", async function (req, res) {
  const item = req.body.item;
  res.json((await gateway.runQuery({
    query: `mutation CreateItem($input: CreateItemInput!) {
        createItem(input: $input) {
          id,
          title
        }
      }`,
    operationName: "CreateItem",
    variables: {
      input: {
        feedID: req.body.id,
        guid: item.guid,
        title: item.title,
        link: item.link,
        html: item.html,
        snippet: item.snippet,
        publishedAt: item.publishedAt,
        categories: item.categories,
      }
    }
  })).createItem);
});

app.post("/aggregator/notify", async function (req, res) {
  if (admin.apps.length === 0) {
    const secret = await secretsManager
      .getSecretValue({
        SecretId: `${process.env.ENV}/feed-alert/firebase`
      })
      .promise();
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(secret.SecretString)),
    });
  }
  const items = req.body.items;
  const feed = (await gateway.runQuery({
    query: `query GetFeed($id: ID!) {
      getFeed(id: $id) {
        id
        name
      }
    }`,
    operationName: "GetFeed",
    variables: {
      id: req.body.id,
    },
  })).getFeed;
  const titles = items.slice(0, 2).map(i => i.title).join(', ');
  await admin.messaging().send({
    topic: `feed-${feed.id}`,
    notification: {
      title: `${items.length} new ${items.length === 1 ? 'item' : 'items'} from ${feed.name}`,
      body: items.length <= 2 ? titles : `${titles} and more...`,
    },
    webpush: {
      notification: {
        actions: [{
          action: 'read',
          title: 'Read feed'
        }],
        data: {
          link: `https://feed-alert.com/feed/${feed.id}`
        }
      },
    },

  });

  res.status(201).send();
});

app.listen(3000, function () {
  console.log("App started");
});

module.exports = app;