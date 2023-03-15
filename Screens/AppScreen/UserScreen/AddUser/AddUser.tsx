import React, { useState } from "react";
import {
  FormControl,
  Input,
  Stack,
  ScrollView,
  Button,
  WarningOutlineIcon,
  Box,
  useToast,
  Alert,
  VStack,
  HStack,
  Text,
  IconButton,
  CloseIcon,
} from "native-base";
import { TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Formik } from "formik";
import * as ImagePicker from "expo-image-picker";

// React Query
import { useMutation, useQueryClient } from "react-query";

// Services
import { createUser } from "../../../../services/user";

// Toast Component
import Toast from "./Toast";
import ImageViewer from "./ImageViewer";

// Vilidation Schema
import { userValidationSchema } from "./ValidationShema";
import { initialState } from "./InitialState";

const AddUser = () => {
  const toast = useToast();
  const navigation = useNavigation();

  const [selectedImage, setSelectedImage] = useState<any | null>(null);
  const [initialValues, setInitialValues] = useState(initialState);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      // const imageURI: string = result.assets[0].uri;
      setSelectedImage(result);
    } else {
      setSelectedImage(null);
      alert("You did not select any image.");
    }
  };

  // Query Client
  const queryClient = useQueryClient();

  // User Mutation
  const createUserMuation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigation.goBack();
      toast.show({
        placement: "top",
        render: ({ id }) => {
          return <Toast id={id} {...item} />;
        },
      });
    },
    onError: (error: any) => {
      console.log(error.response.data.msg);
    },
  });

  const item = {
    title: "New Added",
    description: "New user has been created!",
    variant: "left-accent",
    isClosable: true,
  };

  const handleSubmit = (values: any) => {
    let objectData = {
      ...values,
    };
    const formData: any = new FormData();
    for (let key in objectData) {
      formData.append(key, objectData[key]);
    }

    if (selectedImage) {
      const { uri } = selectedImage.assets[0];
      formData.append("image", {
        uri,
        name: uri.split("/").splice(-1)[0],
        type: "image/jpeg",
      });
    }
    createUserMuation.mutate(formData);
  };

  return (
    <ScrollView w="100%">
      <Box px={3} py={5}>
        <Stack space={3} w="100%" maxW="400">
          {createUserMuation.isError && (
            <Alert w="100%" status={"error"}>
              <VStack space={2} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2} justifyContent="space-between">
                  <HStack space={2} flexShrink={1}>
                    <Alert.Icon mt="1" />
                    <Text fontSize="md" color="coolGray.800">
                      {createUserMuation.error}
                    </Text>
                  </HStack>
                  <IconButton
                    variant="unstyled"
                    _focus={{
                      borderWidth: 0,
                    }}
                    icon={<CloseIcon size="3" />}
                    _icon={{
                      color: "coolGray.600",
                    }}
                  />
                </HStack>
              </VStack>
            </Alert>
          )}
        </Stack>

        <TouchableOpacity onPress={pickImageAsync}>
          <Box my={2}>
            <ImageViewer
              placeholderImageSource={"Select Image"}
              selectedImage={selectedImage}
            />
          </Box>
        </TouchableOpacity>
        <Formik
          initialValues={initialValues}
          validationSchema={userValidationSchema}
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
                <Stack alignSelf="center" px="4" mb={5} w={"100%"} space={4}>
                  <FormControl
                    isInvalid={
                      errors.firstName && touched.firstName ? true : false
                    }
                  >
                    <FormControl.Label>First name</FormControl.Label>
                    <Input
                      size="lg"
                      placeholder="Enter first name"
                      onChangeText={handleChange("firstName")}
                      onBlur={handleBlur("firstName")}
                      value={values.firstName}
                    />
                    {errors.firstName && touched.firstName && (
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}
                      >
                        {errors.firstName}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>

                  <FormControl
                    isInvalid={
                      errors.middleName && touched.middleName ? true : false
                    }
                  >
                    <FormControl.Label> Middle name</FormControl.Label>
                    <Input
                      size="lg"
                      placeholder="Enter middle name"
                      onChangeText={handleChange("middleName")}
                      onBlur={handleBlur("middleName")}
                      value={values.middleName}
                    />
                    {errors.middleName && touched.middleName && (
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}
                      >
                        {errors.middleName}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>

                  <FormControl
                    isInvalid={
                      errors.lastName && touched.lastName ? true : false
                    }
                  >
                    <FormControl.Label> Last name </FormControl.Label>
                    <Input
                      size="lg"
                      placeholder="Enter last name"
                      onChangeText={handleChange("lastName")}
                      onBlur={handleBlur("lastName")}
                      value={values.lastName}
                    />
                    {errors.lastName && touched.lastName && (
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}
                      >
                        {errors.lastName}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>

                  <FormControl
                    isInvalid={errors.address && touched.address ? true : false}
                  >
                    <FormControl.Label> Address </FormControl.Label>
                    <Input
                      size="lg"
                      placeholder="Enter address"
                      onChangeText={handleChange("address")}
                      onBlur={handleBlur("address")}
                      value={values.address}
                    />
                    {errors.address && touched.address && (
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}
                      >
                        {errors.address}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>

                  <FormControl
                    isInvalid={
                      errors.phoneNumber && touched.phoneNumber ? true : false
                    }
                  >
                    <FormControl.Label> Phone Number </FormControl.Label>
                    <Input
                      size="lg"
                      keyboardType="numeric"
                      placeholder="Enter phone number"
                      onChangeText={handleChange("phoneNumber")}
                      onBlur={handleBlur("phoneNumber")}
                      value={values.phoneNumber}
                    />
                    {errors.phoneNumber && touched.phoneNumber && (
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}
                      >
                        {errors.phoneNumber}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>

                  <FormControl
                    isInvalid={
                      errors.bankName && touched.bankName ? true : false
                    }
                  >
                    <FormControl.Label> Bank Name </FormControl.Label>
                    <Input
                      size="lg"
                      placeholder="Enter banks name"
                      onChangeText={handleChange("bankName")}
                      onBlur={handleBlur("bankName")}
                      value={values.bankName}
                    />
                    {errors.bankName && touched.bankName && (
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}
                      >
                        {errors.bankName}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>

                  <FormControl
                    isInvalid={
                      errors.accountNumber && touched.accountNumber
                        ? true
                        : false
                    }
                  >
                    <FormControl.Label> Bank Account Number </FormControl.Label>
                    <Input
                      size="lg"
                      placeholder="Enter account #"
                      onChangeText={handleChange("accountNumber")}
                      onBlur={handleBlur("accountNumber")}
                      value={values.accountNumber}
                    />
                    {errors.accountNumber && touched.accountNumber && (
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}
                      >
                        {errors.accountNumber}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>

                  <FormControl
                    isInvalid={errors.pinCode && touched.pinCode ? true : false}
                  >
                    <FormControl.Label> Bank Pin Code </FormControl.Label>
                    <Input
                      size="lg"
                      keyboardType="numeric"
                      placeholder="Enter pin code"
                      onChangeText={handleChange("pinCode")}
                      onBlur={handleBlur("pinCode")}
                      value={values.pinCode}
                    />
                    {errors.pinCode && touched.pinCode && (
                      <FormControl.ErrorMessage
                        leftIcon={<WarningOutlineIcon size="xs" />}
                      >
                        {errors.pinCode}
                      </FormControl.ErrorMessage>
                    )}
                  </FormControl>

                  <Button
                    isLoading={false}
                    spinnerPlacement="end"
                    isLoadingText="Saving..."
                    color="primary.900"
                    shadow={2}
                    onPress={() => {
                      handleSubmit();
                    }}
                  >
                    Save
                  </Button>
                </Stack>
              </>
            );
          }}
        </Formik>
      </Box>
    </ScrollView>
  );
};

export default AddUser;
