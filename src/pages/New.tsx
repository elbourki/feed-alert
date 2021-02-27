import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  Image,
  Heading,
  Center,
  Collapse,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { API, Auth } from "aws-amplify";
import { Link, useHistory } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import logo from "../logo.png";
import { Helmet } from "react-helmet-async";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import {
  CreateUserFeedMutationVariables,
  ListUserFeedsQueryVariables,
} from "../API";

type FormData = {
  link: string;
  name: string;
};

export default () => {
  const client = useApolloClient();
  const [valid, setValid] = useState(false);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    errors,
    formState,
    setError,
    setValue,
  } = useForm<FormData>();
  const [createUserFeed] = useMutation<any, CreateUserFeedMutationVariables>(
    gql`
      mutation CreateUserFeed($input: CreateUserFeedInput!) {
        createUserFeed(input: $input) {
          id
        }
      }
    `
  );

  const onSubmit = handleSubmit(async ({ link, name }) => {
    if (!valid) {
      return API.post("rest", "/feeds/validate", {
        body: {
          link,
        },
        headers: {
          Authorization: `Bearer ${(await Auth.currentSession())
            .getIdToken()
            .getJwtToken()}`,
        },
      })
        .then((data) => {
          setValue("name", data.name);
          setValid(true);
        })
        .catch(() => {
          setError("link", {
            message: "This link doesn't seem to be a valid RSS feed URL.",
          });
        });
    } else {
      return API.post("rest", "/feeds/new", {
        body: {
          link,
        },
        headers: {
          Authorization: `Bearer ${(await Auth.currentSession())
            .getIdToken()
            .getJwtToken()}`,
        },
      })
        .then(async (data) =>
          client
            .query<any, ListUserFeedsQueryVariables>({
              query: gql`
                query ListUserFeeds($filter: ModelUserFeedFilterInput) {
                  listUserFeeds(filter: $filter) {
                    items {
                      id
                    }
                  }
                }
              `,
              fetchPolicy: "no-cache",
              variables: {
                filter: {
                  feedID: { eq: data.id },
                },
              },
            })
            .then(
              ({
                data: {
                  listUserFeeds: { items },
                },
              }) => {
                if (items.length) history.push("/");
                else
                  return createUserFeed({
                    variables: {
                      input: {
                        feedID: data.id,
                        name,
                      },
                    },
                  }).then(() => history.push("/"));
              }
            )
        )
        .catch(() =>
          setError("link", {
            message: "Something went wrong",
          })
        );
    }
  });

  return (
    <Container
      centerContent
      justifyContent="center"
      minH="100vh"
      maxW="sm"
      py="4"
    >
      <Helmet>
        <title>Add feed</title>
      </Helmet>
      <Box w="full">
        <Image
          boxSize="45px"
          src={logo}
          alt="Feed Alert logo"
          display="table"
          m="auto"
        />
        <Heading fontSize="3xl" textAlign="center" mt="2" mb="6">
          Add a new RSS feed
        </Heading>
        <form onSubmit={onSubmit}>
          <FormControl isInvalid={!!errors.link}>
            <Input
              name="link"
              placeholder="https://townhall.hashnode.com/rss.xml"
              type="url"
              ref={register({
                required: "You need to enter a valid RSS feed URL",
              })}
            />
            <FormErrorMessage>
              {errors.link && errors.link.message}
            </FormErrorMessage>
          </FormControl>
          <Collapse in={valid} animateOpacity>
            <FormControl isInvalid={!!errors.name} mt="4">
              <Input
                name="name"
                placeholder="Hashnode Townhall's RSS feed"
                ref={register({
                  required: valid
                    ? "A feed name is required to proceed"
                    : false,
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
          </Collapse>
          <Button
            mt="4"
            isFullWidth
            colorScheme="blue"
            isLoading={formState.isSubmitting}
            type="submit"
          >
            {valid ? "Add feed" : "Continue"}
          </Button>
        </form>
        <Center color="gray.400" mt="5">
          <Icon as={HiArrowLeft} mr="2" />
          <Link to="/">Back to homepage</Link>
        </Center>
      </Box>
    </Container>
  );
};
