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
} from "native-base";

import { useNavigation } from "@react-navigation/native";

import { Formik } from "formik";
import * as Yup from "yup";

// React Query
import { useMutation, useQueryClient } from "react-query";

// Services
import { createUser } from "../../../../services/user";

// Toast Component
import Toast from "./Toast";

const formSchema = Yup.object().shape({
  firstName: Yup.string().required("This field is required"),
  middleName: Yup.string().required("Please type N/A if not applicable"),
  lastName: Yup.string().required("This field is required"),
  address: Yup.string().required("This field is required"),
  phoneNumber: Yup.string().required("This field is required"),
  bankName: Yup.string().required("This field is required"),
  accountNumber: Yup.string().required("This field is required"),
  pinCode: Yup.string().required("This field is required"),
});

const AddUser = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    bankName: "",
    accountNumber: "",
    pinCode: "",
  });

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
  });

  const item = {
    title: "Network connection restored",
    description: "New user has been created!",
    variant: "left-accent",
    isClosable: true,
  };

  const handleSubmit = (values: any) => {
    createUserMuation.mutate(values);
  };

  return (
    <ScrollView w="100%">
      <Box px={3} py={5}>
        <Formik
          initialValues={initialValues}
          validationSchema={formSchema}
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
