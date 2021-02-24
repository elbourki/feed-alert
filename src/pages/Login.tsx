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
    return Auth.signIn(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        if (error.code === "UserNotConfirmedException") {
          return Auth.resendSignUp(email).then(() =>
            history.push("/verify", {
              email,
            })
          );
        } else {
          setError("email", {
            message: error.message,
          });
        }
      });
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
        <title>Login</title>
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
          Welcome back!
        </Heading>
        <form onSubmit={onSubmit}>
          <FormControl isInvalid={!!errors.email}>
            <Input
              name="email"
              placeholder="hello@feed-alert.com"
              type="email"
              ref={register({
                required: "You need your email to login",
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
                required: "You need your password to login",
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
            Login
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
