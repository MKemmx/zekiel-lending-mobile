// Nativabase
import React from "react";
import { ScrollView, Box, Skeleton, FlatList } from "native-base";

// Components
import HomeHeader from "./HomeHeader";

const HomeSkeleton = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      backgroundColor={"white"}
      flex={1}
    >
      <HomeHeader />
      <Box
        px={5}
        pt={10}
        pb={6}
        display="flex"
        justifyContent="space-between"
        flexDirection="row"
      >
        <Skeleton h="40" w="47%" />
        <Skeleton h="40" w="47%" />
      </Box>

      <Box mb={5}>
        <Skeleton mb={2} px={5} w="48" h="3" />
        <FlatList
          data={[...new Array(3)].map((item, index) => {
            return { ...item, id: index };
          })}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return <Skeleton h="40" w="48" />;
          }}
          ItemSeparatorComponent={() => {
            return <Box w="6"></Box>;
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        />
      </Box>

      <Box mb={5}>
        <Skeleton mb={2} px={5} w="48" h="3" />
        <FlatList
          data={[...new Array(3)].map((item, index) => {
            return { ...item, id: index };
          })}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return <Skeleton h="40" w="48" />;
          }}
          ItemSeparatorComponent={() => {
            return <Box w="6"></Box>;
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        />
      </Box>
    </ScrollView>
  );
};

export default HomeSkeleton;
