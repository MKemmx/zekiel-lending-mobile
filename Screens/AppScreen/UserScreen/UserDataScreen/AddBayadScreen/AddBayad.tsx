import React from "react";
import { Formik } from "formik";
import {
  FormControl,
  Input,
  Stack,
  ScrollView,
  Button,
  WarningOutlineIcon,
  Box,
  TextArea,
  useToast,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "react-query";

// Alert Popper
import ToastPopper from "../../../../../helpers/ToastPopper";
// Validaion Schema
import { addBayadValidationSchema } from "./AddBayadValidationSchema";
import { addBayadInitialState } from "./initalState";
// API Service
import { createBayad } from "../../../../../services/userData";

const AddBayad = ({ route }: { route: any }) => {
  const { userId } = route.params;
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const toast = useToast();

  const userDataMutation = useMutation(createBayad, {
    onSuccess: () => {
      queryClient
        .invalidateQueries("userData", userId)
        .then(() => navigation.goBack());
      toast.show({
        placement: "top",
        render: ({ id }) => {
          const toastDetils = {
            title: `Success`,
            description: `Bayad was successfully saved`,
            variant: "left-accent",
            isClosable: true,
            status: "success",
          };
          return <ToastPopper id={id} {...toastDetils} />;
        },
      });
    },
    onError: (error: any) => {
      toast.show({
        placement: "top",
        render: ({ id }) => {
          const toastDetils = {
            title: "Error",
            description: `${error.response.data.msg}`,
            variant: "left-accent",
            isClosable: true,
            status: "error",
          };
          return <ToastPopper id={id} {...toastDetils} />;
        },
      });
    },
  });

  // Submit Form
  const handleSubmit = (values: any) => {
    userDataMutation.mutate(values);
  };

  return (
    <ScrollView w="100%">
      <Box px={3} py={5}>
        <Formik
          initialValues={addBayadInitialState(userId)}
          validationSchema={addBayadValidationSchema}
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
              <Stack alignSelf="center" px="4" mb={5} w={"100%"} space={5}>
                <FormControl
                  isInvalid={errors.amount && touched.amount ? true : false}
                >
                  <FormControl.Label> Amount </FormControl.Label>
                  <Input
                    size="lg"
                    keyboardType="numeric"
                    placeholder="Enter Amount"
                    onChangeText={handleChange("amount")}
                    onBlur={handleBlur("amount")}
                    value={values.amount}
                  />
                  {errors.amount && touched.amount && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {errors.amount}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>

                <FormControl>
                  <FormControl.Label> Description </FormControl.Label>
                  <TextArea
                    size="lg"
                    autoCompleteType={false}
                    h="32"
                    placeholder="Enter utang description"
                    w="100%"
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                    value={values.description}
                  />
                </FormControl>

                <Button
                  isLoading={userDataMutation.isLoading}
                  spinnerPlacement="end"
                  backgroundColor="#1D3B80"
                  shadow={2}
                  onPress={() => {
                    handleSubmit();
                  }}
                >
                  Save
                </Button>
              </Stack>
            );
          }}
        </Formik>
      </Box>
    </ScrollView>
  );
};

export default AddBayad;
