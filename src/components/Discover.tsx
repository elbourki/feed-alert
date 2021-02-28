import { gql, useQuery } from "@apollo/client";
import { Heading, Box, Icon, useToast, Skeleton, Grid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { HiSparkles } from "react-icons/hi";
import { ListFeedsQueryVariables, Feed } from "../API";
import FeedComponent from "./Feed";

export default () => {
  const { loading, error, data } = useQuery<any, ListFeedsQueryVariables>(
    gql`
      query ListFeeds($filter: ModelFeedFilterInput) {
        listFeeds(filter: $filter) {
          items {
            id
            name
            link
          }
        }
      }
    `,
    {
      variables: {
        filter: {
          featured: {
            eq: true,
          },
        },
      },
    }
  );
  const toast = useToast();

  useEffect(() => {
    if (error)
      toast({
        title: "Couldn't load feeds",
        description:
          "Check your internet connection or try refreshing the page.",
        status: "error",
        duration: null,
        isClosable: true,
        position: "bottom-right",
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <Box py="3">
      <Heading display="flex" size="sm" alignItems="center" pb="3">
        <Icon as={HiSparkles} mr="2" /> Discover feeds
      </Heading>
      <Grid
        templateColumns={{
          sm: "repeat(2, minmax(0, 1fr))",
          md: "repeat(4, minmax(0, 1fr))",
        }}
        gap="2"
      >
        {loading || error
          ? [...Array(8)].map((v, k) => (
              <Skeleton rounded="md" key={k} height="100px" />
            ))
          : data.listFeeds.items.map((feed: Feed) => (
              <FeedComponent feed={feed} key={feed.id} />
            ))}
      </Grid>
    </Box>
  );
};
