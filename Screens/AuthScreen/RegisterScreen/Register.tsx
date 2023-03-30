import React from "react";
// Native Base
import {
  FormControl,
  Input,
  Box,
  Center,
  Container,
  Button,
  VStack,
  Text,
  Flex,
  View,
  WarningOutlineIcon,
  Image,
  Heading,
} from "native-base";

// API Service
import { useMutation } from "react-query";
import { Formik } from "formik";
import { registerAccount } from "../../../services/register";
// Validations
import { registerValidation } from "./registerValidation";

const Register = ({ navigation }: { navigation: any }) => {
  const registerMutation = useMutation(registerAccount, {
    onSuccess: () => {
      navigation.navigate("Login");
    },
  });
  const handleRegister = (data: any) => {
    registerMutation.mutate(data);
  };

  return (
    <Center backgroundColor={"white"} flex={1}>
      <Container w="100%">
        <Box w="100%" alignItems="center">
          <Box mb="3">
            <Image
              rounded={"2xl"}
              style={{ resizeMode: "contain" }}
              source={require("../../../assets/newLogo.png")}
              size={190}
              alt="Logo"
            />
          </Box>

          <Box w="100%" mb="3">
            <Heading size="md" fontWeight="600" color="coolGray.800">
              Register Page
            </Heading>
          </Box>

          <VStack space="3" w="100%">
            <Formik
              validationSchema={registerValidation}
              initialValues={{ email: "", userName: "", password: "" }}
              onSubmit={handleRegister}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View>
                  <FormControl mb={1}>
                    <FormControl
                      isInvalid={
                        errors.userName && touched.userName ? true : false
                      }
                    >
                      <FormControl.Label> Username </FormControl.Label>
                      <Input
                        type="text"
                        size="lg"
                        placeholder="Enter username"
                        onChangeText={handleChange("userName")}
                        onBlur={handleBlur("userName")}
                        value={values.userName}
                      />
                      {errors.userName && touched.userName && (
                        <FormControl.ErrorMessage
                          leftIcon={<WarningOutlineIcon size="xs" />}
                        >
                          {errors.userName}
                        </FormControl.ErrorMessage>
                      )}
                    </FormControl>
                  </FormControl>

                  <FormControl mb={1}>
                    <FormControl
                      isInvalid={errors.email && touched.email ? true : false}
                    >
                      <FormControl.Label> Email </FormControl.Label>
                      <Input
                        type="email"
                        size="lg"
                        placeholder="Enter email"
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                      />
                      {errors.email && touched.email && (
                        <FormControl.ErrorMessage
                          leftIcon={<WarningOutlineIcon size="xs" />}
                        >
                          {errors.email}
                        </FormControl.ErrorMessage>
                      )}
                    </FormControl>
                  </FormControl>

                  <FormControl mb={1}>
                    <FormControl
                      isInvalid={
                        errors.password && touched.password ? true : false
                      }
                    >
                      <FormControl.Label> Password </FormControl.Label>
                      <Input
                        type="password"
                        size="lg"
                        placeholder="Enter password"
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                      />
                      {errors.password && touched.password && (
                        <FormControl.ErrorMessage
                          leftIcon={<WarningOutlineIcon size="xs" />}
                        >
                          {errors.password}
                        </FormControl.ErrorMessage>
                      )}
                    </FormControl>
                  </FormControl>

                  <Box mt={2}>
                    <Button
                      backgroundColor={"#1d3b80"}
                      isLoading={registerMutation.isLoading}
                      onPress={() => {
                        handleSubmit();
                      }}
                      colorScheme="primary"
                    >
                      Register
                    </Button>
                  </Box>
                </View>
              )}
            </Formik>

            <Flex justifyContent={"center"} flexDirection={"row"}>
              <Text fontSize="sm" mr={1} color="gray.500">
                Already have account?
              </Text>
              <Text
                onPress={() => {
                  navigation.navigate("Login");
                }}
                fontSize="sm"
                color="#1D3B80"
              >
                Login here
              </Text>
            </Flex>
          </VStack>
        </Box>
      </Container>
    </Center>
  );
};

export default Register;
