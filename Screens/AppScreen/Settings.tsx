import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  VStack,
  Box,
  Container,
  Spacer,
  Center,
  Text,
  ScrollView,
} from "native-base";

const Settings = () => {
  return (
    <SafeAreaView>
      <VStack h="full">
        {/* Header */}
        <Box backgroundColor="#1d3b80" h="1/4">
          Header
        </Box>
        {/* Body */}
        <Container
          flex={1}
          mx="auto"
          w="100%"
          style={{ backgroundColor: "red" }}
        >
          Body
        </Container>
        {/* Footer */}
        <Box backgroundColor="white" shadow={1} h="16">
          <Center h="100%">
            <Text fontSize="xs" bold color="muted.500">
              Zekiel Lending V.1
            </Text>
          </Center>
        </Box>
      </VStack>
    </SafeAreaView>
  );
};

export default Settings;
