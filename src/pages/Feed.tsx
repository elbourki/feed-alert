import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Container,
  Flex,
  Drawer,
  DrawerOverlay,
  Text,
  DrawerBody,
  DrawerContent,
  useBreakpointValue,
  useDisclosure,
  Spacer,
  IconButton,
  Heading,
  Image,
  Spinner,
  ButtonGroup,
  useToast,
  useColorModeValue,
  useColorMode,
  LinkBox,
  LinkOverlay,
  Tag,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  HiArrowLeft,
  HiBell,
  HiExternalLink,
  HiLink,
  HiMenu,
  HiMinusSm,
  HiMoon,
  HiPlus,
  HiSun,
  HiVolumeUp,
  HiX,
} from "react-icons/hi";
import {
  Link,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import {
  CreateUserFeedMutationVariables,
  DeleteUserFeedMutationVariables,
  Feed,
  GetFeedQueryVariables,
  GetItemQueryVariables,
  ListUserFeedsQueryVariables,
  UserFeed,
} from "../API";
import { AuthContext } from "../auth-context";
import useLocalStorageState from "use-local-storage-state";
import firebase from "firebase/app";
import config from "../config";
import { API } from "aws-amplify";
import { Markup } from "interweave";
import { formatRelative } from "date-fns";

interface SidebarProps {
  feed: Feed;
  name?: string | null;
  userFeed: UserFeed | null;
  refetch: any;
}

const Sidebar = ({ feed, name, userFeed, refetch }: SidebarProps) => {
  const toast = useToast();
  const history = useHistory();
  const muted = useColorModeValue("gray.500", "gray.400");
  const scrollbarTrack = useColorModeValue("gray.100", "dark.secondary");
  const scrollbarThumb = useColorModeValue(
    "gray.300",
    "rgba(255, 255, 255, 0.25)"
  );
  const [createUserFeed] = useMutation<any, CreateUserFeedMutationVariables>(
    gql`
      mutation CreateUserFeed($input: CreateUserFeedInput!) {
        createUserFeed(input: $input) {
          id
        }
      }
    `
  );
  const [deleteUserFeed] = useMutation<any, DeleteUserFeedMutationVariables>(
    gql`
      mutation DeleteUserFeed($input: DeleteUserFeedInput!) {
        deleteUserFeed(input: $input) {
          id
        }
      }
    `
  );
  const user = useContext(AuthContext);
  const [togglingUserFeed, setTogglingUserFeed] = useState(false);
  const [togglingNotifications, setTogglingNotifications] = useState(false);
  const [notifications, setNotifications] = useLocalStorageState<string[]>(
    "notifications",
    []
  );

  const hostname = new URL(feed.link as string).hostname;
  const subscribed = notifications.includes(feed.id as string);

  const toggleUserFeed = () => {
    if (!user) return history.push("/login");
    setTogglingUserFeed(true);
    (userFeed
      ? deleteUserFeed({
          variables: {
            input: {
              id: userFeed.id as string,
            },
          },
        })
      : createUserFeed({
          variables: {
            input: {
              feedID: feed.id as string,
              name: feed.name,
            },
          },
        })
    )
      .then(() => refetch())
      .then(() => setTogglingUserFeed(false));
  };

  const toggleNotifications = () => {
    setTogglingNotifications(true);
    firebase
      .messaging()
      .getToken({
        vapidKey: config.vapid,
      })
      .then(async (token) => {
        return API.post("rest", "/feeds/subscribe", {
          body: {
            unsubscribe: subscribed,
            id: feed.id,
            token,
          },
        }).then(() => {
          if (subscribed)
            setNotifications(
              notifications.filter((value) => {
                return value !== feed.id;
              })
            );
          else setNotifications([...notifications, feed.id as string]);
        });
      })
      .catch(() =>
        toast({
          title: "Couldn't enable push notifications",
          description:
            "Try configuring site permissions to allow notifications manually",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        })
      )
      .finally(() => setTogglingNotifications(false));
  };

  const items = feed.items?.items?.length
    ? [...feed.items.items].sort(
        (a, b) =>
          new Date(b?.publishedAt as string).getTime() -
          new Date(a?.publishedAt as string).getTime()
      )
    : null;

  return (
    <Flex flexDir="column" w="100%" h="100%">
      <Box p="3" borderWidth="1px" rounded="md">
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
          {name || feed.name}
        </Heading>
        <ButtonGroup
          size="sm"
          isAttached
          variant="outline"
          display="flex"
          mt="3"
        >
          <Button
            mr="-px"
            leftIcon={userFeed ? <HiMinusSm /> : <HiPlus />}
            onClick={() => toggleUserFeed()}
            flexGrow={1}
            color={userFeed ? "red.400" : undefined}
            isLoading={togglingUserFeed}
          >
            {userFeed ? "Remove from feeds" : "Add to feeds"}
          </Button>
          <IconButton
            color={subscribed ? "yellow.300" : undefined}
            onClick={() => toggleNotifications()}
            aria-label="Notify"
            icon={<HiBell />}
            isLoading={togglingNotifications}
          />
        </ButtonGroup>
      </Box>
      <Box
        borderWidth="1px"
        rounded="md"
        flexGrow={1}
        mt="2"
        overflowY="auto"
        sx={{
          "&::-webkit-scrollbar": {
            w: "2",
          },
          "&::-webkit-scrollbar-track": {
            bg: scrollbarTrack,
          },
          "&::-webkit-scrollbar-thumb": {
            bg: scrollbarThumb,
            borderRadius: "md",
          },
        }}
      >
        {items ? (
          items.map((item) => (
            <LinkBox
              as="div"
              key={item?.id}
              borderBottomWidth="1px"
              _last={{ borderBottomWidth: 0 }}
            >
              <Box p="3">
                <Heading size="sm">
                  <LinkOverlay as={Link} to={`/feed/${feed.id}/${item?.id}`}>
                    {item?.title}
                  </LinkOverlay>
                </Heading>
                <Text fontSize="sm" color={muted}>
                  {formatRelative(
                    new Date(item?.publishedAt as string),
                    new Date()
                  )}
                </Text>
                <Text
                  lineHeight="1.3"
                  mt="1"
                  mb="1"
                  noOfLines={3}
                  fontSize="sm"
                >
                  {item?.snippet}
                </Text>
                <Flex flexWrap="wrap">
                  {JSON.parse(item?.categories as string).map(
                    (category: string, i: number) => (
                      <Tag size="sm" key={i} variant="subtle" mt="1" mr="1">
                        {category}
                      </Tag>
                    )
                  )}
                </Flex>
              </Box>
            </LinkBox>
          ))
        ) : (
          <Flex
            h="100%"
            alignItems="center"
            justifyContent="center"
            p="2"
            textAlign="center"
          >
            <Text fontWeight="bold" fontSize="sm">
              No items yet, please check back later
            </Text>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

const Reader = () => {
  const history = useHistory();
  const toast = useToast();
  const { url } = useRouteMatch();
  const { itemID } = useParams<any>();
  const scrollbarTrack = useColorModeValue("gray.100", "dark.secondary");
  const scrollbarThumb = useColorModeValue(
    "gray.300",
    "rgba(255, 255, 255, 0.25)"
  );
  const { loading, error, data } = useQuery<any, GetItemQueryVariables>(
    gql`
      query GetItem($id: ID!) {
        getItem(id: $id) {
          id
          title
          link
          html
          categories
          publishedAt
        }
      }
    `,
    {
      variables: {
        id: itemID,
      },
    }
  );

  useEffect(() => {
    if (!loading && (error || !data?.getItem)) {
      toast({
        title: "Couldn't load item",
        description:
          "Check your internet connection or try refreshing the page.",
        status: "error",
        duration: null,
        isClosable: true,
        position: "bottom-right",
      });
      history.push(url.replace(`/${itemID}`, ""));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading, data?.getItem]);

  return loading || !data?.getItem ? (
    <Flex h="100%" justifyContent="center" alignItems="center">
      <Spinner />
    </Flex>
  ) : (
    <>
      <Helmet>
        <title>{data.getItem.title}</title>
      </Helmet>
      <Box
        overflowY="auto"
        h="100%"
        sx={{
          "&::-webkit-scrollbar": {
            w: "2",
          },
          "&::-webkit-scrollbar-track": {
            bg: scrollbarTrack,
          },
          "&::-webkit-scrollbar-thumb": {
            bg: scrollbarThumb,
            borderRadius: "md",
          },
        }}
      >
        <Flex
          borderBottomWidth="1px"
          position="absolute"
          w="100%"
          p="2"
          alignItems="center"
          top="0"
          sx={{
            backdropFilter: "blur(10px)",
          }}
        >
          <Heading size="sm" isTruncated flexGrow={1} mr="2">
            {data?.getItem.title}
          </Heading>
          <a target="_blank" rel="noreferrer" href={data?.getItem.link}>
            <IconButton
              aria-label="Open in a new tab"
              variant="outline"
              size="sm"
              icon={<HiLink />}
            />
          </a>
        </Flex>
        {data?.getItem.html ? (
          <Box
            maxW="75ch"
            mx="auto"
            pt="14"
            pb="14"
            px="2"
            sx={{
              "& a": {
                textDecoration: "underline",
              },
            }}
          >
            <Markup content={data?.getItem.html} />
          </Box>
        ) : (
          <Flex
            h="100%"
            alignItems="center"
            justifyContent="center"
            p="2"
            textAlign="center"
          >
            <Text fontWeight="bold" fontSize="sm">
              This item has no content, please read on the original publisher's
              site
            </Text>
          </Flex>
        )}
        <Flex
          position="absolute"
          bottom="0"
          justifyContent="center"
          w="100%"
          p="2"
        >
          <a target="_blank" rel="noreferrer" href={data?.getItem.link}>
            <Button leftIcon={<HiExternalLink />} size="sm" colorScheme="blue">
              Read on {new URL(data?.getItem.link as string).hostname}
            </Button>
          </a>
        </Flex>
      </Box>
    </>
  );
};

export default () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { feedID } = useParams<any>();
  const { url } = useRouteMatch();
  const user = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure({
    defaultIsOpen: true,
  });
  const drawer = useBreakpointValue({ base: true, md: false });
  const history = useHistory();
  const toast = useToast();
  const mainBg = useColorModeValue("light.primary", "dark.primary");
  const contentBg = useColorModeValue("light.secondary", "dark.secondary");
  const { loading, error, data } = useQuery<any, GetFeedQueryVariables>(
    gql`
      query GetFeed($id: ID!) {
        getFeed(id: $id) {
          id
          name
          link
          items {
            items {
              id
              title
              snippet
              categories
              publishedAt
            }
          }
        }
      }
    `,
    {
      variables: {
        id: feedID,
      },
      fetchPolicy: "cache-and-network",
    }
  );
  const {
    loading: userFeedLoading,
    data: userFeedData,
    refetch: userFeedRefetch,
  } = useQuery<any, ListUserFeedsQueryVariables>(
    gql`
      query ListUserFeeds($filter: ModelUserFeedFilterInput) {
        listUserFeeds(filter: $filter) {
          items {
            id
            feedID
            name
          }
        }
      }
    `,
    {
      variables: {
        filter: {
          feedID: { eq: feedID },
        },
      },
      fetchPolicy: "no-cache",
      skip: !user,
    }
  );

  const userFeed: UserFeed | null =
    user && !userFeedLoading && userFeedData.listUserFeeds.items.length
      ? userFeedData.listUserFeeds.items[0]
      : null;

  useEffect(() => {
    if (!loading && (error || !data?.getFeed)) {
      toast({
        title: "Couldn't load feed",
        description:
          "Check your internet connection or try refreshing the page.",
        status: "error",
        duration: null,
        isClosable: true,
        position: "bottom-right",
      });
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading, data?.getFeed]);

  const sidebar = !loading && data?.getFeed && (
    <Sidebar
      feed={data.getFeed}
      userFeed={userFeed}
      refetch={userFeedRefetch}
    />
  );

  return loading || !data?.getFeed ? (
    <Flex minH="100vh" justifyContent="center" alignItems="center">
      <Spinner />
    </Flex>
  ) : (
    <Container maxW="container.xl">
      <Helmet>
        <title>{userFeed ? userFeed.name : data.getFeed.name}</title>
      </Helmet>

      <Flex h="100vh" minH="300px" py="2">
        {drawer ? (
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            size="full"
          >
            <DrawerOverlay>
              <DrawerContent bg={mainBg}>
                {/* <DrawerCloseButton /> */}
                <DrawerBody px="4">
                  <Box position="absolute" top="1.25rem" right="1.75rem">
                    <IconButton
                      aria-label="Close menu"
                      onClick={onClose}
                      size="sm"
                      variant="outline"
                      icon={<HiX />}
                    ></IconButton>
                  </Box>
                  {sidebar}
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        ) : (
          <Box w="xs" mr="2" flexShrink={0}>
            {sidebar}
          </Box>
        )}
        <Box flexGrow={1} flexDir="column" display="flex">
          <Flex>
            <Link to="/">
              <Button size="sm" variant="outline" leftIcon={<HiArrowLeft />}>
                Back to homepage
              </Button>
            </Link>
            <Spacer />
            <IconButton
              aria-label="Toggle theme"
              variant="outline"
              size="sm"
              onClick={toggleColorMode}
              icon={colorMode === "light" ? <HiMoon /> : <HiSun />}
            />
            {drawer && (
              <IconButton
                ml="2"
                aria-label="Menu"
                onClick={onOpen}
                size="sm"
                variant="outline"
                icon={<HiMenu />}
              ></IconButton>
            )}
          </Flex>
          <Box
            borderWidth="1px"
            rounded="md"
            mt="2"
            bgColor={contentBg}
            flexGrow={1}
            h="calc(100% - 2.5rem)"
            position="relative"
          >
            <Switch>
              <Route exact path={`${url}/`}>
                <Flex
                  h="100%"
                  alignItems="center"
                  justifyContent="center"
                  p="2"
                  textAlign="center"
                >
                  <Text fontWeight="bold" fontSize="sm">
                    Choose a feed item to start reading
                  </Text>
                </Flex>
              </Route>
              <Route path={`${url}/:itemID`} component={Reader} />
            </Switch>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};
