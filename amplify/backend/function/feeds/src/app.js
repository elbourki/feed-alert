/* Amplify Params - DO NOT EDIT
  API_GRAPHQL_GRAPHQLAPIENDPOINTOUTPUT
  API_GRAPHQL_GRAPHQLAPIIDOUTPUT
  ENV
  REGION
Amplify Params - DO NOT EDIT */
const express = require("express");
const bodyParser = require("body-parser");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const Parser = require("rss-parser");
const {
  GraphQLGateway,
  IAMCredentialsStrategy
} = require('@crft/appsync-gateway');
var admin = require('firebase-admin');
const AWS = require('aws-sdk');

const parser = new Parser();
const gateway = new GraphQLGateway(
  new IAMCredentialsStrategy(),
  process.env.API_GRAPHQL_GRAPHQLAPIENDPOINTOUTPUT
);
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

const secretsManager = new AWS.SecretsManager({
  region: process.env.REGION
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.post("/feeds/new", async function (req, res) {
  try {
    let feed = await parser.parseURL(req.body.link);
    const response = {
      name: feed.title
    };
    const results = (await gateway.runQuery({
      query: `query ListFeeds($filter: ModelFeedFilterInput) {
        listFeeds(filter: $filter) {
          items {
            id
          }
        }
      }`,
      operationName: "ListFeeds",
      variables: {
        filter: {
          link: {
            eq: req.body.link
          }
        },
      },
    })).listFeeds.items;
    if (results.length) {
      response.id = results[0].id;
    } else {
      response.id = (await gateway.runQuery({
        query: `mutation CreateFeed($input: CreateFeedInput!) {
          createFeed(input: $input) {
            id
          }
        }`,
        operationName: "CreateFeed",
        variables: {
          input: {
            link: req.body.link,
            name: feed.title,
            featured: false
          }
        },
      })).createFeed.id;
    }
    res.json(response);
  } catch (e) {
    console.error(e);
    res.status(400).send();
  }
});

app.post("/feeds/validate", async function (req, res) {
  try {
    let feed = await parser.parseURL(req.body.link);
    res.json({
      name: feed.title,
    });
  } catch (e) {
    console.error(e);
    res.status(400).send();
  }
});

app.post("/feeds/subscribe", async function (req, res) {
  if (admin.apps.length === 0) {
    const secret = await secretsManager.getSecretValue({ SecretId: `${process.env.ENV}/feed-alert/firebase` }).promise();
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(secret.SecretString))
    });
  }
  const response = await (req.body.unsubscribe ? admin.messaging().unsubscribeFromTopic(req.body.token, `feed-${req.body.id}`) : admin.messaging().subscribeToTopic(req.body.token, `feed-${req.body.id}`));

  res.json({
    success: response.successCount > 0,
  });
});

app.listen(3000, function () {
  console.log("App started");
});

module.exports = app;