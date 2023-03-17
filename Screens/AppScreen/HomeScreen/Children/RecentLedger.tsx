import React from "react";
// Nativebase
import { Text, Box, Image, FlatList } from "native-base";

interface IItem {
  _id: string;
  firstName: string;
  middleName: string;
  lastName: string;
}

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
        alt={item?.firstName}
        source={{ uri: "https://dummyimage.com/300x300/000/fff" }}
        style={{ width: 100, height: 100, borderRadius: 8 }}
      />
      <Box marginLeft={8}>
        <Text fontWeight="bold" fontSize={16}>
          {item.firstName}
        </Text>
      </Box>
    </Box>
  );
}

const RecentLedger: React.FC<any> = ({ recentLedgerData }) => {
  return (
    <Box mt={5} mb={5}>
      <Box px={3} mb={3}>
        <Text fontSize="md" color="muted.700" bold>
          Recent Ledgers
        </Text>
      </Box>

      <FlatList
        data={recentLedgerData}
        keyExtractor={(item) => item._id}
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

export default RecentLedger;
