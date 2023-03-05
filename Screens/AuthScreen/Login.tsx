import React from "react";

// Native Base
import {
  FormControl,
  Input,
  Stack,
  Box,
  Center,
  Container,
  Button,
  VStack,
  Text,
  Flex,
  Heading,
  Image,
} from "native-base";

// Auth Store
import { useLoginStore } from "../../store/loginStore";

const Login = ({ navigation }: { navigation: any }) => {
  const { login } = useLoginStore((state) => state);

  return (
    <Center backgroundColor={"white"} flex={1} pb={9}>
      <Container w="100%">
        <Box w="100%" alignItems="center">
          {/* Logo */}
          <Box mb="3">
            <Image
              rounded={"2xl"}
              style={{ resizeMode: "contain" }}
              source={require("../../assets/newLogo.png")}
              size={190}
              alt="Logo"
            />
          </Box>

          {/* Header Style */}
          <Box w="100%" mb="3">
            <Heading size="lg" fontWeight="600" color="coolGray.800">
              Welcome
            </Heading>
            <Heading color="coolGray.600" fontWeight="medium" size="xs">
              Sign in to continue!
            </Heading>
          </Box>

          {/* Form */}
          <VStack space="3" w="100%">
            <FormControl>
              <Stack>
                <Input size={"lg"} type="email" placeholder="Enter email" />
              </Stack>
            </FormControl>

            <FormControl>
              <Stack>
                <Input
                  size={"lg"}
                  type="password"
                  placeholder="Enter password"
                />
              </Stack>
            </FormControl>

            <Box>
              <Button
                backgroundColor={"#1d3b80"}
                size={"lg"}
                onPress={login}
                colorScheme="primary"
              >
                Login
              </Button>
            </Box>

            <Flex justifyContent={"center"} flexDirection={"row"}>
              <Text mr={1} fontSize="sm" color="coolGray.500">
                Dont have an account?
              </Text>
              <Text
                onPress={() => {
                  navigation.navigate("Register");
                }}
                color="#1d3b80"
                fontSize="sm"
              >
                Register here
              </Text>
            </Flex>
          </VStack>
        </Box>
      </Container>
    </Center>
  );
};

export default Login;
