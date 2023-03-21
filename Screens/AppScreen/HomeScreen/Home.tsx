import React, { useState, useCallback } from "react";

// Nativabase
import { ScrollView, Text, Box, Image } from "native-base";
import { StyleSheet, RefreshControl } from "react-native";
import HomeHeader from "./HomeHeader";

// Components
import RecentUsers from "./Children/RecentUsers";
import RecentLedger from "./Children/RecentLedger";

// React Query
import { useQuery } from "react-query";

// Services
import { readDashboard } from "../../../services/dashboard";

// Loading Skeleton
import HomeSkeleton from "./HomeSkeleton";

const Home = () => {
  const {
    data: dashboardData,
    isLoading,
    error,
    refetch,
  } = useQuery("dashboard", readDashboard);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  if (isLoading) {
    return <HomeSkeleton />;
  }

  if (error) {
    console.log(error);
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

      <Box
        mt="7"
        gap={3}
        mx="auto"
        maxWidth="90%"
        justifyContent="center"
        alignItems="center"
        display="flex"
        flexDirection="row"
      >
        <Box style={styles.dashboardCard}>
          <Box
            py="2"
            alignItems="center"
            w="100%"
            backgroundColor="white"
            borderWidth="1"
            borderColor="gray.100"
            shadow="1"
          >
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/1256/1256650.png",
              }}
              alt="Users"
              size="md"
              mb="2"
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
            py="2"
            alignItems="center"
            w="100%"
            backgroundColor="white"
            borderWidth="1"
            borderColor="gray.100"
            shadow="1"
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
              Total Credit Ledgers
            </Text>
            <Text fontSize="md" bold>
              {dashboardData?.totalCreditLedger}
            </Text>
          </Box>
        </Box>
      </Box>

      <RecentUsers recentUsersData={dashboardData.recentUsers} />
      <RecentLedger recentLedgerData={dashboardData.recentCreditLedger} />
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
