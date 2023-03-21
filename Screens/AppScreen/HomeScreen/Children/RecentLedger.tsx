import React from "react";
// Nativebase
import { Text, Box, Image, FlatList, Container } from "native-base";

interface IItem {
  _id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  userRef: any;
}

function renderItem({ item }: { item: any }) {
  return (
    <Box
      flexDirection="row"
      alignItems="center"
      p="4"
      backgroundColor="white"
      borderWidth="1"
      borderColor="gray.200"
      shadow="1"
    >
      <Image
        alt={item?.userRef?.firstName}
        source={{ uri: item?.userRef?.image?.url }}
        style={{ width: 100, height: 100, borderRadius: 8 }}
      />
      <Box marginLeft={5}>
        <Text fontWeight="bold" fontSize={14}>
          {item?.userRef?.firstName}
        </Text>

        <Text textTransform="capitalize" fontWeight="normal" fontSize={14}>
          {item?.status} {item?.amount}
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

      {recentLedgerData?.length <= 0 ? (
        <Container
          borderRadius={5}
          mx="auto"
          width="100%"
          backgroundColor="gray.300"
          display="flex"
          justifyContent="center"
          alignItems="center"
          h="40"
        >
          <Text fontWeight="bold" fontSize={14}>
            No Data
          </Text>
        </Container>
      ) : (
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
      )}
    </Box>
  );
};

export default RecentLedger;
