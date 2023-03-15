import { Image, Text, Box, Heading } from "native-base";

interface INoData {
  searchText: string;
}

const NoData: React.FC<INoData> = ({ searchText }) => {
  const headerMessage = searchText ? "No search result found" : "No data";
  const subtitleMessage = searchText
    ? "Sorry there are no results for this search"
    : "Add your input";

  return (
    <Box rounded={"lg"} style={{ backgroundColor: "white" }} py={12}>
      <Box height={10} mb={10} alignItems={"center"}>
        <Heading size="lg" fontWeight="600">
          {headerMessage}
        </Heading>
        <Text
          style={{ textAlign: "center" }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          {subtitleMessage}
        </Text>
      </Box>

      <Image
        rounded={"lg"}
        source={require("../assets/NoData.png")}
        resizeMode={"cover"}
        style={{ width: "100%", height: 250 }}
        alt="Nodata-Image"
      />
    </Box>
  );
};

export default NoData;
