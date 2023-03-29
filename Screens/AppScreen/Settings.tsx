import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  VStack,
  Box,
  Container,
  Center,
  Text,
  Image,
  Button,
} from "native-base";

// Login State
import { useLoginStore } from "../../store/loginStore";

const Settings = () => {
  const { user, logOut } = useLoginStore((state) => state);

  return (
    <SafeAreaView>
      <VStack h="full">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor="#1d3b80"
          h="1/4"
        >
          <Image
            rounded={"lg"}
            source={require("../../assets/newLogo.png")}
            size={150}
            alt="Logo"
          />
        </Box>
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
                Name:
              </Text>
              <Text bold fontSize="lg">
                {user?.userName}
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
                Email:
              </Text>
              <Text bold fontSize="lg">
                {user?.email}
              </Text>
            </Box>

            <Box rounded="md">
              <Button
                backgroundColor="#1D3B80"
                w="100%"
                py={2.5}
                px={2.5}
                onPress={logOut}
              >
                Logout
              </Button>
            </Box>
          </VStack>
        </Container>
        <Box shadow={1} h="16">
          <Center h="100%">
            <Text fontSize="xs" bold color="muted.500">
              Zekiel Lending v.1
            </Text>
          </Center>
        </Box>
      </VStack>
    </SafeAreaView>
  );
};

export default Settings;
