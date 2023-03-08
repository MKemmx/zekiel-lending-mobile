// Nativabase
import { ScrollView, Text, Box, Image, HStack } from "native-base";
import { StyleSheet } from "react-native";
import HomeHeader from "./HomeHeader";

// Components
import RecentUsers from "./RecentUsers";
import RecentUtang from "./RecentUtang";

const Home = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      backgroundColor={"white"}
      flex={1}
    >
      <HomeHeader />
      <HStack mt={7} w="100%" px={5} direction="row">
        <Box style={styles.dashboardCard}>
          <Box
            alignItems={"center"}
            w="100%"
            backgroundColor={"red.100"}
            py={2}
          >
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/1256/1256650.png",
              }}
              alt="Users"
              size="md"
              mb={2}
            />
            <Text fontSize="md" bold>
              Total Utangs
            </Text>
          </Box>
        </Box>

        <Box style={styles.dashboardCard}>
          <Box
            py={2}
            alignItems={"center"}
            w="100%"
            backgroundColor={"red.100"}
          >
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/1256/1256650.png",
              }}
              alt="Users"
              size="md"
              mb={2}
            />
            <Text fontSize="md" bold>
              Total Utangs
            </Text>
          </Box>
        </Box>
      </HStack>
      <RecentUsers />
      <RecentUtang />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dashboardCard: {
    width: "50%",
    height: "auto",
    backgroundColor: "#FFF",
  },
});

export default Home;
