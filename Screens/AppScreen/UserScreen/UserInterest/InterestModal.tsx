import React, { useState } from "react";
// Nativebase
import {
  Fab,
  Icon,
  Button,
  Modal,
  FormControl,
  Input,
  Center,
  Box,
  Text,
} from "native-base";
import { TouchableOpacity, Alert } from "react-native";
// Icons
import { AntDesign } from "@expo/vector-icons";
// Day JS
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);
// Date Picker
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
// Services
import { useMutation } from "react-query";
import { createUserInterest } from "services/interest";

// Inteface
interface PropsInterestModal {
  userId: string;
  userData: () => void;
}

const InterestModal: React.FC<PropsInterestModal> = ({ userId, userData }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  // States
  const [amount, setAmount] = useState<string>("");
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

  const createInterestMutation = useMutation(createUserInterest, {
    onSuccess: () => {
      userData();
      handleClose();
      Alert.alert(
        "Success",
        "Interest has been added",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    },
  });
  const handleCreateInterest = () => {
    const mainData = {
      userRef: userId,
      amount: +amount,
      createdAt: selectedDate,
    };
    createInterestMutation.mutate(mainData);
  };

  return (
    <>
      <Center>
        <Modal isOpen={open} onClose={handleClose} safeAreaTop={true}>
          <Modal.Content maxWidth="350">
            <Modal.CloseButton />
            <Modal.Header>Add Interest </Modal.Header>
            <Modal.Body>
              <FormControl mb={3}>
                <FormControl.Label>Interest Amount</FormControl.Label>
                <Input
                  keyboardType="numeric"
                  onChangeText={(num) => {
                    setAmount(num);
                  }}
                  value={amount.toString()}
                />
              </FormControl>

              <Box
                py={2}
                display="flex"
                flexDirection="column"
                alignItems="baseline"
                w="100%"
              >
                <Text mb={1} color="text.600">
                  {" "}
                  Enter Date{" "}
                </Text>
                <Box
                  w="100%"
                  borderColor="gray.300"
                  borderWidth="1"
                  py={2}
                  rounded="sm"
                  px={1}
                >
                  <TouchableOpacity onPress={handleOpenDate}>
                    <Text fontSize="sm">
                      {" "}
                      {dayjs(selectedDate).format("MM/DD/YYYY")}{" "}
                    </Text>
                  </TouchableOpacity>
                </Box>
              </Box>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  disabled={createInterestMutation.isLoading}
                  onPress={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  backgroundColor="#1D3B80"
                  isLoading={createInterestMutation.isLoading}
                  disabled={createInterestMutation.isLoading}
                  onPress={handleCreateInterest}
                >
                  Save
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>

      <Fab
        onPress={handleOpen}
        style={{ backgroundColor: "#1D3B80" }}
        placement="bottom-right"
        renderInPortal={false}
        shadow={2}
        size="md"
        icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
      />
    </>
  );
};

export default InterestModal;
