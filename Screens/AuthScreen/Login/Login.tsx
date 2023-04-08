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
  Heading,
  Image,
  WarningOutlineIcon,
  Alert,
  VStack,
  HStack,
  Text,
  CloseIcon,
  IconButton,
} from "native-base";
// Image
import logo from "assets/newLogo.png";
// Form
import { Formik } from "formik";
import { loginValidationSchema } from "./loginValidation";
//  React Query Services
import { useMutation } from "react-query";
import { loginService } from "services/login";
// Auth Store
import { useLoginStore } from "store/loginStore";
// Initial State
import { INITIAL_STATE } from "./initialState";

const Login = ({ navigation }: { navigation: any }) => {
  const { setLoginResponseData } = useLoginStore((state) => state);
  const loginMutation = useMutation(loginService, {
    onSuccess: ({ data }) => {
      const authResponse = {
        isAuthenticated: true,
        token: data?.token,
        user: data.loggedAdmin,
      };
      setLoginResponseData(authResponse);
    },
  });

  const handleSubmit = (loginData: any) => {
    loginMutation.mutate(loginData);
  };

  return (
    <Center backgroundColor={"white"} flex={1} pb={9}>
      <Container w="100%">
        <Box w="100%" alignItems="center">
          <Box mb="3">
            <Image
              rounded={"2xl"}
              style={{ resizeMode: "contain" }}
              source={logo}
              size={190}
              alt="Logo"
            />
          </Box>

          <Box w="100%" mb="4">
            <Heading size="lg" fontWeight="600" color="coolGray.800">
              Welcome
            </Heading>
            <Heading color="coolGray.600" fontWeight="medium" size="xs">
              Sign in to continue!
            </Heading>
          </Box>

          {loginMutation?.isError && (
            <Alert mb={3} w="100%" status={"error"}>
              <VStack
                flexDirection="row"
                justifyContent="space-between"
                space={2}
                flexShrink={1}
                w="100%"
              >
                <HStack
                  flexShrink={1}
                  space={2}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <HStack space={2} flexShrink={1} alignItems="center">
                    <Alert.Icon />
                    <Text> {loginMutation?.error?.response?.data.msg} </Text>
                  </HStack>
                </HStack>

                <IconButton
                  onPress={loginMutation.reset}
                  icon={<CloseIcon size="3" />}
                  _icon={{
                    color: "coolGray.600",
                  }}
                />
              </VStack>
            </Alert>
          )}

          <Formik
            initialValues={INITIAL_STATE}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => {
              return (
                <>
                  <Stack alignSelf="center" mb={5} w={"100%"} space={3}>
                    <FormControl
                      isInvalid={
                        errors.userName && touched.userName ? true : false
                      }
                    >
                      <Input
                        size="lg"
                        placeholder="Username"
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

                    <FormControl
                      isInvalid={
                        errors.password && touched.password ? true : false
                      }
                    >
                      <Input
                        size="lg"
                        placeholder="Password"
                        type="password"
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

                    <Button
                      backgroundColor="#1D3B80"
                      isLoading={loginMutation.isLoading}
                      shadow={1}
                      onPress={() => {
                        handleSubmit();
                      }}
                    >
                      Login
                    </Button>
                    {/* 
                    <Flex justifyContent={"center"} flexDirection={"row"}>
                      <Text fontSize="sm" mr={1} color="gray.500">
                        Don't have an account?
                      </Text>
                      <Text
                        onPress={() => {
                          navigation.navigate("Register");
                        }}
                        fontSize="sm"
                        color="#1D3B80"
                      >
                        Register here
                      </Text>
                    </Flex> */}
                  </Stack>
                </>
              );
            }}
          </Formik>
        </Box>
      </Container>
    </Center>
  );
};

export default Login;
