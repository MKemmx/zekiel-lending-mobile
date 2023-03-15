import React, { useState, useCallback } from "react";

// Nativabase
import { ScrollView, Text, Box, Image, HStack } from "native-base";
import { StyleSheet, RefreshControl } from "react-native";
import HomeHeader from "./HomeHeader";

// Components
import RecentUsers from "./Children/RecentUsers";
import RecentUtang from "./Children/RecentUtang";

// React Query
import { useQuery } from "react-query";

// Services
import { readDashboard } from "../../../services/dashboard";

// Loading Skeleton
import HomeSkeleton from "./HomeSkeleton";

const Home = () => {
  const {
    data: dashboardData,
    loading,
    error,
    refetch,
  } = useQuery("dashboard", readDashboard);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  if (loading) {
    return <HomeSkeleton />;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
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
              Total Users
            </Text>

            <Text fontSize="md" bold>
              {dashboardData?.totalUser}
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

            <Text fontSize="md" bold>
              {dashboardData?.totalCreditLedger}
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
