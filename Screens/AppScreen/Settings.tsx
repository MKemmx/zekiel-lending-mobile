import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { VStack, Box, Container, Spacer, Center, Text } from "native-base";

const Settings = () => {
  return (
    <SafeAreaView>
      <VStack h="full">
        {/* Header */}
        <Box backgroundColor="#1d3b80" h="1/4">
          Header
        </Box>
        {/* Body */}
        <Container py={12} flex={1} mx="auto" w="100%">
          <Box>
            <Text fontSize="sm">Personal Info</Text>
          </Box>
          <VStack w="full" my={2} space={3}>
            <Box
              rounded="md"
              style={{ backgroundColor: "#FFF" }}
              display="flex"
              flexDirection={"row"}
              py={3}
              px={3}
            >
              <Text mr={3} fontSize="lg">
                Name
              </Text>
              <Text bold fontSize="lg">
                Mark Kemm Asdilla
              </Text>
            </Box>
            <Box
              rounded="md"
              style={{ backgroundColor: "#FFF" }}
              display="flex"
              flexDirection={"row"}
              py={3}
              px={3}
            >
              <Text mr={3} fontSize="lg">
                Email
              </Text>
              <Text bold fontSize="lg">
                kimasdilla@gmail.com
              </Text>
            </Box>
          </VStack>
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
