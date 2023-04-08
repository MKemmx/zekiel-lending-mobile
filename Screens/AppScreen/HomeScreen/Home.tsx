import React, { useState, useCallback } from "react";

import { FontAwesome } from "@expo/vector-icons";

// Nativabase
import { ScrollView, Text, Box, Image } from "native-base";
import { StyleSheet, RefreshControl, TouchableOpacity } from "react-native";

// React Query and Servies
import { useQuery } from "react-query";
import { readDashboard } from "services/dashboard";

// Components and Loader
import RecentUsers from "./Children/RecentUsers";
import RecentLedger from "./Children/RecentLedger";
import HomeHeader from "./HomeHeader";
import HomeSkeleton from "./HomeSkeleton";

// Dashboard Images
import usersImage from "assets/DashboardImages/users.png";
import ledgersImage from "assets/DashboardImages/ledger.png";
import interestImage from "assets/DashboardImages/interest.png";

const Home = () => {
  const {
    data: dashboardData,
    isLoading,
    error,
    refetch,
  } = useQuery("dashboard", readDashboard);

  const [isShownIntrest, setIsShownInterest] = useState(false);
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
        borderWidth="1"
        borderColor="gray.200"
        mt="7"
        w="94%"
        mx="auto"
        backgroundColor="white"
        flexDir={"row"}
        py={5}
        px={4}
        gap={5}
        rounded={"md"}
      >
        <Image source={interestImage} alt="Users" size="md" mb="2" />
        <Box justifyContent="center">
          <Text fontSize="lg" mb={0} bold>
            Total Interest
          </Text>
          <Text fontSize="md" bold>
            {isShownIntrest ? (
              <>
                {"\u20B1"}
                {dashboardData?.totalInterest.toLocaleString("en-US")}
              </>
            ) : (
              <>******</>
            )}
          </Text>
        </Box>

        <Box ml="auto" w="auto" alignItems="center" justifyContent="center">
          <TouchableOpacity onPress={() => setIsShownInterest(!isShownIntrest)}>
            <Box p={2}>
              {isShownIntrest ? (
                <FontAwesome name="eye" size={24} color="black" />
              ) : (
                <FontAwesome name="eye-slash" size={24} color="black" />
              )}
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>

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
            py="3"
            alignItems="center"
            w="100%"
            backgroundColor="white"
            borderWidth="1"
            borderColor="gray.200"
          >
            <Image source={usersImage} alt="Users" size="md" mb="2" />
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
            py="3"
            alignItems="center"
            w="100%"
            backgroundColor="white"
            borderWidth="1"
            borderColor="gray.200"
          >
            <Image source={ledgersImage} alt="Ledgers" size="md" mb={2} />
            <Text fontSize="md" bold>
              Total Credit Ledgers
            </Text>
            <Text fontSize="md" bold>
              {dashboardData?.totalCreditLedger}
            </Text>
          </Box>
        </Box>
      </Box>
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
