import {
  Heading,
  Icon,
  LinkBox,
  LinkOverlay,
  Image,
  Text,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Feed } from "../API";

interface FeedProps {
  feed: Feed;
  name?: string | null;
}

export default ({ feed, name = null }: FeedProps) => {
  const hostname = new URL(feed.link as string).hostname;

  return (
    <LinkBox as="article" p="3" borderWidth="1px" rounded="md">
      <Flex alignItems="center">
        <Image
          boxSize="3"
          alt={feed.name}
          src={`https://www.google.com/s2/favicons?domain=` + hostname}
          color="transparent"
        />
        <Text fontSize="xs" fontWeight="bold" ml="1" isTruncated>
          {hostname}
        </Text>
      </Flex>
      <Heading size="md" isTruncated>
        <LinkOverlay as={Link} to={`feed/${feed.id}`}>
          {name || feed.name}
        </LinkOverlay>
      </Heading>
      <Text
        mt="3"
        color="blue.400"
        fontSize="sm"
        fontWeight="bold"
        display="flex"
        alignItems="center"
      >
        Read feed <Icon as={HiArrowRight} ml="1" />
      </Text>
    </LinkBox>
  );
};
