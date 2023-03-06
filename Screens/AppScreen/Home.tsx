// Nativabase
import {
  ScrollView,
  Text,
  Box,
  Flex,
  Image,
  View,
  FlatList,
} from "native-base";
import { Dimensions, StyleSheet } from "react-native";
const screenHeight = Dimensions.get("window").height;

interface IItem {
  id: string;
  name: string;
  imageUrl: string;
}

const DATA: IItem[] = [
  {
    id: "1",
    name: "Item 1",
    imageUrl: "https://dummyimage.com/300x300/000/fff",
  },
  {
    id: "2",
    name: "Item 2",
    imageUrl: "https://dummyimage.com/300x300/000/fff",
  },
  {
    id: "3",
    name: "Item 3",
    imageUrl: "https://dummyimage.com/300x300/000/fff",
  },
];

function renderItem({ item }: { item: IItem }) {
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      p={4}
      shadow={2}
      backgroundColor="red.100"
    >
      <Image
        alt={item?.name}
        source={{ uri: item.imageUrl }}
        style={{ width: 100, height: 100, borderRadius: 8 }}
      />
      <Box marginLeft={8}>
        <Text fontWeight="bold" fontSize={16}>
          {item.name}
        </Text>
      </Box>
    </Box>
  );
}

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

      <Box mt={5}>
        <Box px={3} mb={3}>
          <Text fontSize="md" color="muted.700" bold>
            Recently Added Users
          </Text>
        </Box>

        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          ItemSeparatorComponent={() => {
            return <Box w="3"> </Box>;
          }}
        />
      </Box>
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
