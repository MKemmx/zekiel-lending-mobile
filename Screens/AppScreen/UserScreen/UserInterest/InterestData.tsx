import React, { useEffect } from "react";
// Nativebase
import {
  Box,
  Text,
  FlatList,
  HStack,
  VStack,
  Spacer,
  Avatar,
  Spinner,
} from "native-base";
import { RefreshControl } from "react-native";
// DayJS
import dayjs from "dayjs";
// Components
import NoData from "components/NoData";
// Services
import { useMutation } from "react-query";
import { getUserInterest } from "services/interest";
// Modal
import InterestModal from "./InterestModal";

const InterestData = ({ route }: { route: any }) => {
  const { userId } = route.params;
  const interestDataMutation = useMutation(getUserInterest);
  const userData = () => {
    interestDataMutation.mutate({
      userInterestId: userId,
    });
  };

  useEffect(() => {
    userData();
  }, [userId]);

  if (interestDataMutation.isLoading) {
    return (
      <Box flex={1} justifyContent="center">
        <HStack space={2} justifyContent="center">
          <Spinner
            size="lg"
            color="#1D3B80"
            accessibilityLabel="Loading user interests"
          />
        </HStack>
      </Box>
    );
  }

  const userDetails = interestDataMutation?.data?.data?.data?.user;
  const userInterestsData = interestDataMutation?.data?.data?.data?.interest;
  const totalInterest = userInterestsData?.reduce(
    (a: any, c: any) => (a += c.amount),
    0
  );

  return (
    <Box flex={1}>
      <Box backgroundColor="#1D3B80" alignItems={"center"} py={5}>
        <Avatar
          borderWidth="3"
          borderColor="white"
          mb={2}
          size="120px"
          source={{
            uri: userDetails?.image?.url,
          }}
        >
          <Text fontSize="2xl" color="#FFF" bold>
            {userDetails?.firstName[0]}
            {userDetails?.lastName[0]}
          </Text>
        </Avatar>
        <Text color="#FFF" fontSize="lg" bold>
          {userDetails?.firstName} {userDetails?.lastName}
        </Text>
      </Box>

      {/* Fab */}
      <InterestModal userId={userId} userData={userData} />
      {userInterestsData?.length <= 0 ? (
        <Box mt={5}>
          <NoData />
        </Box>
      ) : (
        <FlatList
          ListHeaderComponent={() => {
            return (
              <Box
                flexDir="row"
                rounded="md"
                alignItems="center"
                backgroundColor="#1D3B80"
                py={5}
                px={2}
                mb={3}
              >
                <Text color="#FFF"> Total Interest: </Text>
                <Text color="#FFF" fontSize="md" bold>
                  {"\u20B1"}
                  {totalInterest?.toLocaleString("en-US")}
                </Text>
              </Box>
            );
          }}
          mt={8}
          px={5}
          refreshControl={
            <RefreshControl
              refreshing={interestDataMutation.isLoading}
              onRefresh={userData}
            />
          }
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          keyExtractor={(item: any) => item._id}
          data={userInterestsData}
          renderItem={({ item, index }) => {
            return (
              <Box
                key={index}
                backgroundColor="white"
                rounded={"lg"}
                px={3}
                py={4}
                mb={4}
              >
                <HStack space={[2, 3]} justifyContent="space-between">
                  <VStack alignSelf="center">
                    <Text fontSize="sm" color="coolGray.600">
                      {dayjs(item?.createdAt).format("LLL")}
                    </Text>
                  </VStack>
                  <Spacer />

                  <Box alignSelf="center">
                    <Text fontSize="md" color="success.700" alignSelf="center">
                      +{"\u20B1"}
                      {item?.amount?.toLocaleString("en-US")}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            );
          }}
          // onEndReached={() => {
          //   if (hasNextPage && !isFetching) {
          //     fetchNextPage();
          //   }
          // }}
          // onEndReachedThreshold={1}
          // ListFooterComponent={
          //   <React.Fragment>
          //     {isFetchingNextPage || isFetching ? (
          //       <Box mb={4} pt={1}>
          //         <Spinner size="large" color="#0000ff" />
          //       </Box>
          //     ) : null}
          //   </React.Fragment>
          // }
        />
      )}
    </Box>
  );
};

export default InterestData;
