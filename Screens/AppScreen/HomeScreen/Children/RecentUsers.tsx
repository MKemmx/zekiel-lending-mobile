import { Text, Box, Image, FlatList, Container } from "native-base";
import React from "react";

interface IItem {
  id: string;
  name: string;
  imageUrl: string;
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
        alt={item?.firstName}
        source={{ uri: item?.image?.url }}
        style={{ width: 100, height: 100, borderRadius: 8 }}
      />
      <Box marginLeft={5}>
        <Text fontWeight="bold" fontSize={14}>
          {`${item.firstName} ${item.lastName}  `}
        </Text>
      </Box>
    </Box>
  );
}

const RecentUsers: React.FC<any> = ({ recentUsersData }) => {
  return (
    <Box mt={5}>
      <Box px={3} mb={3}>
        <Text fontSize="md" color="muted.700" bold>
          Recently Added Users
        </Text>
      </Box>

      {recentUsersData?.length <= 0 ? (
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
          data={recentUsersData}
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

export default RecentUsers;
