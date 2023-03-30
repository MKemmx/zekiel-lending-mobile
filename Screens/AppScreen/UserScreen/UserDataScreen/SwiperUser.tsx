import React, { useState } from "react";
import {
  Box,
  Text,
  HStack,
  Spacer,
  Modal,
  Button,
  ScrollView,
} from "native-base";
import { TouchableOpacity } from "react-native";

// Day JS
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

const SwiperUser: React.FC<any> = ({ rowData, rowMap }) => {
  const item = rowData.item;
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Box overflow={"hidden"} pr={2} mb={5}>
      <HStack space={[0, 0]} justifyContent="space-between">
        <Spacer />
        <TouchableOpacity>
          <Box
            mr={1}
            justifyContent="center"
            alignSelf="center"
            px={6}
            style={{
              backgroundColor: "#1D3B80",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <Text color="white" fontSize="xs">
              Print
            </Text>
          </Box>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Box
            justifyContent="center"
            alignSelf="center"
            px={6}
            style={{
              backgroundColor: "#17A2B8",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <Text pb={0} mb={0} color="white" fontSize="xs">
              View
            </Text>
          </Box>
        </TouchableOpacity>
      </HStack>

      <Modal isOpen={modalVisible} onClose={setModalVisible} size={"lg"}>
        <Modal.Content maxH="500">
          <Modal.Header flexDirection="row">
            <Text fontSize="sm" mr={1} textTransform="capitalize" bold>
              {item.status}
            </Text>
            Details
            <Spacer />
            <Text fontSize="xs" textTransform="capitalize">
              {dayjs(item.createdAt).format("LL")}
            </Text>
          </Modal.Header>
          <Modal.Body>
            <ScrollView>
              <Box mb={1} flexDirection="row">
                <Text bold> Amount: </Text>
                <Text>
                  {"\u20B1"}
                  {item.amount}
                </Text>
              </Box>

              <Box flexDirection="column">
                <Text bold> Description </Text>
                <Text>
                  {item.description ? item.description : "No description"}
                </Text>
              </Box>
            </ScrollView>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                backgroundColor="red.500"
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                Close
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
};

export default SwiperUser;
