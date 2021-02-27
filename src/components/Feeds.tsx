import { gql, useQuery } from "@apollo/client";
import {
  Heading,
  Box,
  Icon,
  useToast,
  Skeleton,
  Grid,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { HiPlus, HiRss } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Feed, ListUserFeedsQueryVariables, UserFeed } from "../API";
import FeedComponent from "./Feed";

export default () => {
  const { loading, error, data } = useQuery<any, ListUserFeedsQueryVariables>(
    gql`
      query ListUserFeeds($filter: ModelUserFeedFilterInput) {
        listUserFeeds(filter: $filter) {
          items {
            id
            name
            feed {
              id
              name
              link
            }
          }
        }
      }
    `,
    {
      fetchPolicy: "no-cache",
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
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <Box py="3">
      <Heading display="flex" size="sm" alignItems="center" pb="3">
        <Icon as={HiRss} mr="2" /> Your feeds
      </Heading>
      {!loading && !error && data.listUserFeeds.items.length === 0 ? (
        <Flex flexDir="column" alignItems="center" py="8">
          <Text mb="2">You don't have any feeds yet</Text>
          <Link to="/new">
            <Button size="sm" colorScheme="blue" leftIcon={<HiPlus />}>
              Add feed
            </Button>
          </Link>
        </Flex>
      ) : (
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
            : data.listUserFeeds.items.map(
                (userFeed: UserFeed & { feed: Feed }) => (
                  <FeedComponent
                    feed={userFeed.feed}
                    name={userFeed.name}
                    key={userFeed.id}
                  />
                )
              )}
        </Grid>
      )}
    </Box>
  );
};
