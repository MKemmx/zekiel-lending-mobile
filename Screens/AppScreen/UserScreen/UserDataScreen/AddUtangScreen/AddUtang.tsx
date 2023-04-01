import React, { useState } from "react";
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
  Text,
} from "native-base";
import { TouchableOpacity } from "react-native";

// React Navigation
import { useNavigation } from "@react-navigation/native";

// React Query
import { useMutation, useQueryClient } from "react-query";

// Date Picker
import dayjs from "dayjs";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

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

  // Add Custom Date
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (e: any, date: any) => {
    setSelectedDate(date);
  };
  const handleOpenDate = () => {
    DateTimePickerAndroid.open({
      value: selectedDate,
      onChange: handleDateChange,
      mode: "date",
      is24Hour: false,
    });
  };

  // Submit Form
  const handleSubmit = (values: any) => {
    const mergedData = {
      ...values,
      createdAt: selectedDate,
    };
    createUserDataLedger.mutate(mergedData);
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

                <Box
                  py={2}
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                >
                  <Text> Select Utang Date: </Text>

                  <Box
                    borderColor="gray.300"
                    borderWidth="1"
                    px={2}
                    py={1}
                    ml={2}
                  >
                    <TouchableOpacity onPress={handleOpenDate}>
                      <Text> {dayjs(selectedDate).format("MM/DD/YYYY")} </Text>
                    </TouchableOpacity>
                  </Box>
                </Box>

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
