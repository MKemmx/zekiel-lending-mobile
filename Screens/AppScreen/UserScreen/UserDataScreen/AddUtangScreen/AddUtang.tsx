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
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "react-query";
// API Service
import { createUtang } from "../../../../../services/userData";
import { addUtangValidationSchema } from "./AddUtangValidationSchema";
import { addBayadInitialState } from "./initalState";

const AddUtang = ({ route }: { route: any }) => {
  const { userId } = route.params;
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const createUserDataLedger = useMutation(createUtang, {
    onSuccess: () => {
      queryClient
        .invalidateQueries("userData", userId)
        .then(() => navigation.goBack());
    },
    onError: (err: any) => {
      console.log(err?.response.data.msg);
    },
  });

  // Submit Form
  const handleSubmit = (values: any) => {
    console.log(values);
    createUserDataLedger.mutate(values);
  };

  return (
    <ScrollView w="100%">
      <Box px={3} py={5}>
        <Formik
          initialValues={addBayadInitialState(userId)}
          validationSchema={addUtangValidationSchema}
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
                    textAlignVertical="top"
                    size="lg"
                    autoCompleteType={false}
                    h="40"
                    placeholder="Enter utang description"
                    w="100%"
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                    value={values.description}
                  />
                </FormControl>

                <Button
                  isLoading={createUserDataLedger.isLoading}
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

export default AddUtang;
