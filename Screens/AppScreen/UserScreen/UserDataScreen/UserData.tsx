import React from "react";
import {
  Box,
  Text,
  Avatar,
  HStack,
  Spacer,
  View,
  Container,
  Fab,
  Flex,
  Stack,
} from "native-base";
import { RefreshControl, TouchableOpacity } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { useNavigation } from "@react-navigation/native";

// Day JS
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

// React Query
import { useQuery } from "react-query";

// Icons
import { Ionicons, FontAwesome5, AntDesign } from "@expo/vector-icons";

// Services
import { readOneUser } from "../../../../services/user";

const UserData = ({ route }: { route: any }) => {
  const navigation = useNavigation();
  const { userId } = route.params;

  const { isLoading, isError, data, error, isFetching, refetch } = useQuery({
    queryKey: ["userData", userId],
    queryFn: () => readOneUser(userId),
  });

  const handleRefresh = React.useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>Something went wrong!</Text>
      </View>
    );
  }

  return (
    <Box flex={1}>
      <Box h="auto" backgroundColor="light.300">
        <Box py={3} h="auto" w="100%" rounded="lg" flexDirection="column">
          <Box
            w="100%"
            justifyContent="space-between"
            alignItems="center"
            flexDirection="row"
            px={3}
          >
            <Box w="25%">
              <Avatar
                style={{
                  borderColor: "white",
                  borderWidth: 3,
                }}
                size="100px"
                source={{
                  uri: "http://demo.solwininfotech.com/wordpress/probit/wp-content/uploads/2015/12/Rick-Kelly.jpg",
                }}
              />
            </Box>

            <Box w="70%">
              <Box
                w="100%"
                backgroundColor="white"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Box w="50%" py={2}>
                  <Text color="muted.700" textAlign="center" bold>
                    {"\u20B1"}
                    {data?.results?.totalStatus[1].totalAmount}
                  </Text>
                  <Text color="muted.700" textAlign="center">
                    Total Utang
                  </Text>
                </Box>

                <Box w="50%" py={2}>
                  <Text color="muted.700" textAlign="center" bold>
                    {"\u20B1"}
                    {data?.results?.totalStatus[0].totalAmount}
                  </Text>
                  <Text color="muted.700" textAlign="center">
                    Total Bayad
                  </Text>
                </Box>
              </Box>
              <Box
                w="100%"
                mx="auto"
                alignItems="center"
                justifyContent="center"
                backgroundColor="white"
                py={3}
              >
                <Text textAlign="center" bold>
                  {"\u20B1"}
                  {data?.results?.totalStatus[2].totalAmount}
                </Text>
                <Text textAlign="center"> Balance </Text>
              </Box>
            </Box>
          </Box>

          <Box
            px={3}
            justifyContent="space-between"
            alignItems="center"
            w="100%"
            mt={5}
            flexDirection={"row"}
          >
            <Box>
              <Box>
                <Text fontSize="xs" color="muted.600">
                  Personal Info
                </Text>
              </Box>
              <Stack direction="column" mb="2.5" mt="1.5" space={1}>
                <Box flexDirection="row">
                  <Text> Name </Text>
                  <Text ml={1}>
                    {data?.results?.user?.firstName}
                    {data?.results?.user?.middleName}
                    {data?.results?.user?.lastName}
                  </Text>
                </Box>
                <Box flexDirection="row">
                  <Text> Address </Text>
                  <Text ml={1}>{data?.results?.user?.address}</Text>
                </Box>
                <Box flexDirection="row">
                  <Text> Phone Number </Text>
                  <Text ml={1}>{data?.results?.user?.phoneNumber}</Text>
                </Box>
              </Stack>
            </Box>
            <Box>
              <Box>
                <Text fontSize="xs" color="muted.600">
                  Bank Information
                </Text>
              </Box>
              <Stack direction="column" mb="2.5" mt="1.5" space={1}>
                <Box flexDirection="row">
                  <Text> Bank Name </Text>
                  <Text ml={1}>{data?.results?.user?.bankName}</Text>
                </Box>
                <Box flexDirection="row">
                  <Text> Account Number </Text>
                  <Text ml={1}>{data?.results?.user?.accountNumber}</Text>
                </Box>
                <Box flexDirection="row">
                  <Text> Pin Code </Text>
                  <Text ml={1}>{data?.results?.user?.pinCode}</Text>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box flex={1} px="5" py="2" mt="1" mb="16">
        <SwipeListView
          useFlatList={true}
          removeClippedSubviews
          refreshControl={
            <RefreshControl
              refreshing={isFetching && isLoading}
              onRefresh={handleRefresh}
            />
          }
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          keyExtractor={(data: any) => data._id.toString()}
          data={data?.results?.userCredits}
          renderItem={({ item, index }) => {
            const isBayad = item.status === "bayad" ? true : false;
            return (
              <Box
                key={index}
                backgroundColor="white"
                rounded={"lg"}
                px={3}
                py={2}
                mb={3}
              >
                <HStack py={2} space={[3, 3]} justifyContent="space-between">
                  <Box>
                    <Text lineHeight="sm" bold fontSize="xs">
                      {dayjs(item.createdAt).format("LL")}
                    </Text>
                    <Text fontSize="xs">
                      {dayjs(item.createdAt).format("LT")}
                    </Text>
                  </Box>
                  <Spacer />
                  <Box alignSelf="center">
                    <Text
                      fontSize="md"
                      color={isBayad ? "success.700" : "danger.700"}
                      alignSelf="center"
                    >
                      {item?.status === "bayad" ? "+" : "-"}
                      {"\u20B1"}
                      {item?.amount}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            );
          }}
          renderHiddenItem={(rowData, rowMap) => {
            return (
              <Box overflow={"hidden"} pr={2} mb={5}>
                <HStack space={[0, 0]} justifyContent="space-between">
                  <Spacer />
                  <TouchableOpacity>
                    <Box
                      justifyContent={"center"}
                      alignSelf="center"
                      px={6}
                      style={{
                        backgroundColor: "blue",
                        height: "100%",
                        justifyContent: "center",
                      }}
                    >
                      <Text color="white" fontSize="xs">
                        Print
                      </Text>
                    </Box>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Box
                      justifyContent={"center"}
                      alignSelf="center"
                      px={6}
                      style={{
                        backgroundColor: "red",
                        height: "100%",
                        justifyContent: "center",
                      }}
                    >
                      <Text color="white" fontSize="xs">
                        Delete
                      </Text>
                    </Box>
                  </TouchableOpacity>
                </HStack>
              </Box>
            );
          }}
          leftOpenValue={-1}
          rightOpenValue={-230}
          onRowOpen={(rowKey, rowMap) => {
            setTimeout(() => {
              rowMap[rowKey].closeRow();
            }, 5000);
          }}
          // onEndReachedThreshold={1}
          // onEndReached={() => {
          //   if (hasNextPage && !isFetching) {
          //     fetchNextPage();
          //   }
          // }}
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
      </Box>

      <Fab
        style={{ backgroundColor: "#1D3B80" }}
        w="40%"
        placement="bottom-left"
        renderInPortal={false}
        shadow={1}
        size="md"
        label="Utang"
        onPress={() => {
          navigation.navigate("Add Utang", { userId });
        }}
      />
      <Fab
        // style={{ backgroundColor: "#1D3B80" }}
        w="40%"
        placement="bottom-right"
        renderInPortal={false}
        shadow={1}
        size="md"
        label="Bayad"
        onPress={() => {
          navigation.navigate("Add Bayad", { userId });
        }}
      />
    </Box>
  );
};

export default UserData;
