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
} from "native-base";

const Register = ({ navigation }: { navigation: any }) => {
  return (
    // <View>
    <Center flex={1} px="3">
      <Container w="100%">
        <Box w="100%" alignItems="center">
          {/* Header Style */}

          <Box></Box>

          {/* Form */}
          <VStack space="3" w="100%">
            <FormControl isRequired>
              <Stack>
                <FormControl.Label>Name</FormControl.Label>
                <Input type="text" placeholder="Enter Name" />
              </Stack>
            </FormControl>

            <FormControl isRequired>
              <Stack>
                <FormControl.Label>Email</FormControl.Label>
                <Input type="email" placeholder="Enter email" />
              </Stack>
            </FormControl>

            <FormControl isRequired>
              <Stack>
                <FormControl.Label>Password</FormControl.Label>
                <Input type="password" placeholder="Enter password" />
              </Stack>
            </FormControl>

            <Box mt="1">
              <Button colorScheme="primary">Register</Button>
            </Box>

            <Flex justifyContent={"center"} flexDirection={"row"} mt="1">
              <Text fontSize="sm" style={{ color: "gray" }}>
                Already have account?{" "}
              </Text>
              <Text
                onPress={() => {
                  navigation.navigate("Login");
                }}
                fontSize="sm"
                style={{ color: "gray" }}
              >
                Login here
              </Text>
            </Flex>
          </VStack>
        </Box>
      </Container>
    </Center>
    // </View>
  );
};

export default Register;
