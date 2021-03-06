import {
  HStack,
  Button,
  Container,
  Flex,
  Heading,
  Spacer,
  Image,
  useColorMode,
  Text,
  IconButton,
  Box,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import {
  HiLockClosed,
  HiLogout,
  HiMoon,
  HiPlus,
  HiSun,
  HiUserAdd,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import logo from "../logo.png";
import { Auth } from "aws-amplify";
import { AuthContext } from "../auth-context";
import Discover from "../components/Discover";
import Feeds from "../components/Feeds";

export default () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useContext(AuthContext);

  return (
    <Container maxW="container.xl">
      <Helmet>
        <title>Homepage</title>
      </Helmet>
      <Flex py="2">
        <Flex flexDir="row" alignItems="center" userSelect="none">
          <Image boxSize="20px" src={logo} alt="Feed Alert logo" />
          <Heading ml="2" size="sm">
            Feed Alert
          </Heading>
        </Flex>
        <Spacer />
        <HStack>
          <IconButton
            aria-label="Toggle theme"
            variant="outline"
            size="sm"
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <HiMoon /> : <HiSun />}
          />
          {!user ? (
            <>
              <Link to="/login">
                <Button size="sm" variant="outline" leftIcon={<HiLockClosed />}>
                  Login
                </Button>
              </Link>
              <Link to="/join">
                <Button size="sm" colorScheme="blue" leftIcon={<HiUserAdd />}>
                  Sign up
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/new">
                <Button size="sm" variant="outline" leftIcon={<HiPlus />}>
                  Add feed
                </Button>
              </Link>
              <Button
                onClick={() => Auth.signOut()}
                size="sm"
                variant="outline"
                leftIcon={<HiLogout />}
              >
                Logout
              </Button>
            </>
          )}
        </HStack>
      </Flex>
      {!user ? (
        <Flex
          flexDir="column"
          minH="450px"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Box maxW="4xl">
            <Heading
              bgGradient="linear(to-l, #00DFD8, #007CF0)"
              bgClip="text"
              fontSize="6xl"
              fontWeight="extrabold"
            >
              Stay on Top of The Latest News
            </Heading>
            <Text fontSize="2xl" color="#888" mt="3">
              Read your favorite feeds, keep up-to-date and receive
              up-to-the-minute alerts about new stories as they happen!
            </Text>
          </Box>
        </Flex>
      ) : (
        <Feeds />
      )}
      <Discover />
    </Container>
  );
};
