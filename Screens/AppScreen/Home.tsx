// Nativabase
import { ScrollView, Text, Box, Flex, Image, View } from "native-base";
import { Dimensions, StyleSheet } from "react-native";
const screenHeight = Dimensions.get("window").height;

const Home = () => {
  return (
    <ScrollView backgroundColor={"white"} flex={1}>
      <View
        w="100%"
        alignItems="flex-end"
        justifyContent="center"
        style={styles.dashboardHeader}
      >
        <Flex justifyContent="center" direction="row">
          <Box flex={1} justifyContent="center" alignItems="center">
            <Text bold color={"white"} fontSize="lg">
              Zekiel E-Lending
            </Text>
            <Text color={"white"} fontSize="sm">
              Online Money Lending App.
            </Text>
          </Box>
          <Box flex={1} justifyContent="center" alignItems="center">
            <Image
              rounded={"lg"}
              source={require("../../assets/newLogo.png")}
              size={150}
              alt="Logo"
            />
          </Box>
        </Flex>
      </View>
      <Flex px={3} mt={7} direction="row">
        <Box flex={1}>
          <Box style={styles.dashboardCard} borderRadius="md" shadow={4}>
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/1256/1256650.png",
              }}
              alt="Users"
              size="md"
              mb={2}
            />
            <Text fontSize="md" bold>
              Users
            </Text>
          </Box>
        </Box>
        <Box flex={1}>
          <Box style={styles.dashboardCard} borderRadius="md" shadow={4}>
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
      </Flex>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dashboardHeader: {
    height: screenHeight * 0.35,
    backgroundColor: "#1D3B80",
    paddingHorizontal: 10,
  },
  dashboardCard: {
    backgroundColor: "#FFF",
    alignItems: "center",
    height: "auto",
    paddingVertical: 13,
    marginHorizontal: 8,
    marginVertical: 10,
  },
});

export default Home;
