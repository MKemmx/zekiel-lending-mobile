import { Text, Box, Image, FlatList } from "native-base";
import React from "react";

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

const RecentUtang = () => {
  return (
    <Box mt={5} mb={5}>
      <Box px={3} mb={3}>
        <Text fontSize="md" color="muted.700" bold>
          Recent Utangs
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
  );
};

export default RecentUtang;
