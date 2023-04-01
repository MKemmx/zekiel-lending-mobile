import React from "react";
import {
  FormControl,
  Input,
  Stack,
  Button,
  WarningOutlineIcon,
  Text,
  View,
  ScrollView,
  Box,
  Alert,
  VStack,
  HStack,
  IconButton,
  CloseIcon,
  useToast,
} from "native-base";

// React Query
import { useQuery, useMutation, useQueryClient } from "react-query";
// React navigation
import { useNavigation } from "@react-navigation/native";
// Formik
import { Formik } from "formik";

// Services
import { readOneUser, updateUser } from "../../../../../services/user";
import ToastPopper from "../../../../../helpers/ToastPopper";

const EditUser = ({ route }: { route: any }) => {
  // Query Client and Navigation
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  // Toast
  const toast = useToast();
  const { userId } = route.params;

  const readOneUserQuery = useQuery({
    queryKey: ["userData", userId],
    queryFn: () => readOneUser(userId),
  });

  const updateUserMutaion = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userData", userId] });
      navigation.goBack();
      toast.show({
        placement: "top",
        render: ({ id }) => {
          const toastDetils = {
            title: "Success",
            description: "User updated!",
            variant: "left-accent",
            isClosable: true,
            status: "success",
          };
          return <ToastPopper id={id} {...toastDetils} />;
        },
      });
    },
  });

  if (readOneUserQuery.isLoading) {
    return (
      <View width="100%" alignItems="center" py="12">
        <Text fontSize="lg">Loading...</Text>
      </View>
    );
  }

  if (readOneUserQuery.isError) {
    return (
      <View>
        <Text>Error</Text>
        <Text> {`${readOneUserQuery?.error?.response?.data?.msg}`} </Text>
      </View>
    );
  }

  const handleSubmit = (updateData: any) => {
    updateUserMutaion.mutate(updateData);
  };

  const initialState = {
    _id: readOneUserQuery?.data?.results?.user?._id,
    firstName: readOneUserQuery?.data?.results?.user?.firstName,
    middleName: readOneUserQuery?.data?.results?.user?.middleName,
    lastName: readOneUserQuery?.data?.results?.user?.lastName,
    address: readOneUserQuery?.data?.results?.user?.address,
    phoneNumber: readOneUserQuery?.data?.results?.user?.phoneNumber,
    bankName: readOneUserQuery?.data?.results?.user?.bankName,
    accountNumber: readOneUserQuery?.data?.results?.user?.accountNumber,
    pinCode: readOneUserQuery?.data?.results?.user?.pinCode,
  };

  return (
    <ScrollView>
      <Stack space={3} w="100%" maxW="400">
        {updateUserMutaion.isError && (
          <Alert w="100%" status={"error"}>
            <VStack space={2} flexShrink={1} w="100%">
              <HStack flexShrink={1} space={2} justifyContent="space-between">
                <HStack space={2} flexShrink={1}>
                  <Alert.Icon mt="1" />
                  <Text fontSize="md" color="coolGray.800">
                    {updateUserMutaion?.error?.response?.data?.msg}
                  </Text>
                </HStack>
                <IconButton
                  onPress={updateUserMutaion.reset}
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

      <Box px={3} py={5}>
        <Formik initialValues={initialState} onSubmit={handleSubmit}>
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
                      value={values?.firstName}
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
                      value={values?.middleName}
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
                      value={values?.lastName}
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
                      value={values?.address}
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
                      value={values?.phoneNumber}
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
                      placeholder="Enter bank name"
                      onChangeText={handleChange("bankName")}
                      onBlur={handleBlur("bankName")}
                      value={values?.bankName}
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
                    <FormControl.Label>
                      Account Number / Card Number
                    </FormControl.Label>
                    <Input
                      size="lg"
                      keyboardType="numeric"
                      placeholder="Enter account/card #"
                      onChangeText={handleChange("accountNumber")}
                      onBlur={handleBlur("accountNumber")}
                      value={values?.accountNumber?.toString()}
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
                    <FormControl.Label> Pin Code </FormControl.Label>
                    <Input
                      size="lg"
                      keyboardType="numeric"
                      placeholder="Enter pin code"
                      onChangeText={handleChange("pinCode")}
                      onBlur={handleBlur("pinCode")}
                      value={values?.pinCode?.toString()}
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
                    backgroundColor="#1D3B80"
                    isLoading={updateUserMutaion.isLoading}
                    spinnerPlacement="end"
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

export default EditUser;
