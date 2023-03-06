import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
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
import { createUtang } from "../../../../services/userData";

const formSchema = Yup.object().shape({
  amount: Yup.string().required("This field is required"),
});

const AddUtang = ({ route }: { route: any }) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const { userId } = route.params;
  const initialValues = {
    userRef: userId,
    amount: "",
    description: "",
    status: "utang",
  };

  const createUserDataLedger = useMutation(createUtang, {
    onSuccess: () => {
      queryClient
        .invalidateQueries("userData", userId)
        .then(() => navigation.goBack());
    },
  });

  // Submit Form
  const handleSubmit = (values: any) => {
    createUserDataLedger.mutate(values);
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
                  />
                </FormControl>

                <Button
                  isLoading={createUserDataLedger.isLoading}
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
            );
          }}
        </Formik>
      </Box>
    </ScrollView>
  );
};

export default AddUtang;
