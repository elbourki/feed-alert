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
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import { Link, useHistory } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import logo from "../logo.png";
import { Helmet } from "react-helmet-async";

type FormData = {
  email: string;
  password: string;
};

export default () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    errors,
    formState,
    setError,
  } = useForm<FormData>();

  const onSubmit = handleSubmit(({ email, password }) => {
    return Auth.signUp({
      username: email,
      password: password,
      attributes: {
        email,
      },
    })
      .then((e) =>
        history.push(e.userConfirmed ? "/" : "/verify", {
          email,
        })
      )
      .catch((error) =>
        setError("email", {
          message: error.message,
        })
      );
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
        <title>Sign up</title>
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
          Create an account
        </Heading>
        <form onSubmit={onSubmit}>
          <FormControl isInvalid={!!errors.email}>
            <Input
              name="email"
              placeholder="hello@feed-alert.com"
              type="email"
              ref={register({
                required: "You need an email to create an account",
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password} mt="4">
            <Input
              name="password"
              placeholder="••••••••"
              type="password"
              ref={register({
                required: "You need a password to create an account",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt="4"
            isFullWidth
            colorScheme="blue"
            isLoading={formState.isSubmitting}
            type="submit"
          >
            Continue
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
