import { View, Text } from "react-native";
import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { VStack, Box, Container } from "native-base";

const Settings = () => {
  return (
    <SafeAreaView>
      <View>
        <Container mx={"auto"} justifyContent={"center"}>
          <VStack
            borderRadius="md"
            style={{ backgroundColor: "red" }}
            space="2"
          >
            <Box pt="4">Settings Screen</Box>
          </VStack>
        </Container>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
