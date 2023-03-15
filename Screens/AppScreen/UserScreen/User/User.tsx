import React from "react";
// Nativebase
import { Fab, Icon, Box } from "native-base";
// Icons
import { AntDesign } from "@expo/vector-icons";
// Components
import UserItem from "./Children/UserItem";

const User = ({ navigation }: { navigation: any }) => {
  return (
    <Box flex={1} px={5} pt={5} pb={16}>
      <UserItem navigation={navigation} />
      <Fab
        style={{ backgroundColor: "#1D3B80" }}
        placement="bottom-right"
        renderInPortal={false}
        shadow={2}
        size="md"
        onPress={() => {
          navigation.navigate("Add User");
        }}
        icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />}
      />
    </Box>
  );
};

export default User;
