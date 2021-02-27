import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Container,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
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
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  HiArrowLeft,
  HiBell,
  HiMenu,
  HiMinusSm,
  HiMoon,
  HiPlus,
  HiSun,
} from "react-icons/hi";
import { Link, Route, Switch, useHistory, useParams } from "react-router-dom";
import {
  CreateUserFeedMutationVariables,
  DeleteUserFeedMutationVariables,
  Feed,
  GetFeedQueryVariables,
  ListUserFeedsQueryVariables,
  UserFeed,
} from "../API";
import { AuthContext } from "../auth-context";
import useLocalStorageState from "use-local-storage-state";
import firebase from "firebase/app";
import config from "../config";
import { API, Auth } from "aws-amplify";

interface SidebarProps {
  feed: Feed;
  name?: string | null;
  userFeed: UserFeed | null;
  refetch: any;
}

const Sidebar = ({ feed, name, userFeed, refetch }: SidebarProps) => {
  const toast = useToast();
  const history = useHistory();
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

  const hostname = new URL(feed.link as string).hostname;
  const [notifications, setNotifications] = useLocalStorageState<string[]>(
    "notifications",
    []
  );
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
          headers: {
            Authorization: `Bearer ${(await Auth.currentSession())
              .getIdToken()
              .getJwtToken()}`,
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
        })
      )
      .finally(() => setTogglingNotifications(false));
  };

  return (
    <Box>
      <Box as="article" p="3" borderWidth="1px" rounded="md">
        <Flex alignItems="center">
          <Image
            boxSize="3"
            alt={feed.name}
            src={`https://www.google.com/s2/favicons?domain=` + hostname}
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
    </Box>
  );
};

export default () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { feedID } = useParams<any>();
  const user = useContext(AuthContext);
  const { loading, error, data } = useQuery<any, GetFeedQueryVariables>(
    gql`
      query GetFeed($id: ID!) {
        getFeed(id: $id) {
          id
          name
          link
        }
      }
    `,
    {
      variables: {
        id: feedID,
      },
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
            lastReadItemID
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawer = useBreakpointValue({ base: true, md: false });
  const toast = useToast();
  const contentBg = useColorModeValue("light.secondary", "dark.secondary");

  const userFeed: UserFeed | null =
    user && !userFeedLoading && userFeedData.listUserFeeds.items.length
      ? userFeedData.listUserFeeds.items[0]
      : null;

  useEffect(() => {
    if (error)
      toast({
        title: "Couldn't load feed",
        description:
          "Check your internet connection or try refreshing the page.",
        status: "error",
        duration: null,
        isClosable: true,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const sidebar = !loading && (
    <Sidebar
      feed={data.getFeed}
      userFeed={userFeed}
      refetch={userFeedRefetch}
    />
  );

  return loading ? (
    <Flex minH="100vh" justifyContent="center" alignItems="center">
      <Spinner />
    </Flex>
  ) : (
    <Container maxW="container.xl">
      <Helmet>
        <title>{userFeed ? userFeed.name : data.getFeed.name}</title>
      </Helmet>

      <Flex minH="100vh" py="2">
        {drawer ? (
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            size="full"
          >
            <DrawerOverlay>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerBody>{sidebar}</DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        ) : (
          <Box minW="xs" mr="2">
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
          >
            <Switch>
              <Route exact path="/"></Route>
              <Route path="/:itemId"></Route>
            </Switch>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};
