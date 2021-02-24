import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  Image,
  Heading,
  PinInput,
  PinInputField,
  HStack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import { useHistory, useLocation } from "react-router-dom";
import logo from "../logo.png";
import { Helmet } from "react-helmet-async";

type FormData = {
  pin: string;
};

export default () => {
  const location = useLocation();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    errors,
    formState,
    setError,
    setValue,
  } = useForm<FormData>();

  useEffect(() => {
    register({ name: "pin" });
    if (!location.state?.email) history.push("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = handleSubmit(({ pin }) => {
    return Auth.confirmSignUp(location.state.email, pin)
      .then(() => history.push("/login"))
      .catch((error) =>
        setError("pin", {
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
        <title>Account verification</title>
      </Helmet>
      <Box w="full">
        <Image
          boxSize="45px"
          src={logo}
          alt="Feed Alert logo"
          display="table"
          m="auto"
        />
        <Heading fontSize="3xl" textAlign="center" mt="2">
          Verify your account
        </Heading>
        <Text fontSize="sm" textAlign="center" mt="2" mb="6" color="gray.300">
          We sent an email to {location.state?.email}, please enter the 6 digit
          verification code.
        </Text>
        <form onSubmit={onSubmit}>
          <FormControl isInvalid={!!errors.pin}>
            <HStack justifyContent="center">
              <PinInput onChange={(v) => setValue("pin", v)}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
            <FormErrorMessage justifyContent="center">
              {errors.pin && errors.pin.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt="6"
            isFullWidth
            colorScheme="blue"
            isLoading={formState.isSubmitting}
            type="submit"
          >
            Finish sign up
          </Button>
        </form>
      </Box>
    </Container>
  );
};
