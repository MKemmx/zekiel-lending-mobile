// Nativabase
import { Text, Box, Flex, Image, View } from "native-base";
import { Dimensions, StyleSheet } from "react-native";
const screenHeight = Dimensions.get("window").height;

const HomeHeader = () => {
  return (
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
            source={require("../../../assets/newLogo.png")}
            size={150}
            alt="Logo"
          />
        </Box>
      </Flex>
    </View>
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

export default HomeHeader;
