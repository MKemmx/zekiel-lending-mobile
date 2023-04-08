import React, { useState } from "react";
import {
  Box,
  Text,
  Avatar,
  HStack,
  Spacer,
  View,
  Fab,
  Stack,
  ScrollView,
} from "native-base";

// React native
import { TouchableOpacity, RefreshControl } from "react-native";

import { SwipeListView } from "react-native-swipe-list-view";
import { useNavigation } from "@react-navigation/native";

// Components
import SwiperUser from "./SwiperUser";
import Loading from "./Loading";
import Nodata from "components/NoData";

// Day JS
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

// Date Picker
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

// React Query and Services
import { useQuery } from "react-query";
import { readOneUser } from "services/user";

const UserData = ({ route }: { route: any }) => {
  const navigation = useNavigation();
  const { userId } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { isLoading, isError, data, isFetching, refetch } = useQuery({
    queryKey: ["userData", userId, selectedDate],
    queryFn: () => readOneUser(userId, selectedDate),
  });

  const handleRefresh = React.useCallback(() => {
    refetch();
  }, [refetch]);

  // Main Data
  const userCredits = data?.results?.userCredits;
  const handleDateChange = (e: any, date: any) => {
    setSelectedDate(date);
  };
  const handleOpenDate = () => {
    DateTimePickerAndroid.open({
      value: selectedDate,
      onChange: handleDateChange,
      mode: "date",
      is24Hour: false,
    });
  };

  if (isLoading) {
    return (
      <View>
        <Loading />
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text> Someting went wrong! </Text>
      </View>
    );
  }

  return (
    <Box flex={1}>
      <Box h="auto" backgroundColor="gray.200">
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
                  uri: data?.results?.user?.image?.url,
                }}
              >
                <Text color="#FFF" fontSize="3xl">
                  {data?.results?.user?.firstName[0]}
                  {data?.results?.user?.lastName[0]}
                </Text>
              </Avatar>
            </Box>

            <Box rounded={5} backgroundColor="white" w="70%">
              <Box w="100%" flexDirection="row" justifyContent="space-between">
                <Box w="50%" py={2}>
                  <Text color="muted.700" textAlign="center" bold>
                    {"\u20B1"}
                    {data?.results?.totalUtang.toLocaleString("en-US")}
                  </Text>
                  <Text color="muted.700" textAlign="center">
                    Total Utang
                  </Text>
                </Box>

                <Box w="50%" py={2}>
                  <Text color="success.700" textAlign="center" bold>
                    {"\u20B1"}
                    {data?.results?.totalBayad.toLocaleString("en-US")}
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
                <Text color="danger.700" textAlign="center" bold>
                  {"\u20B1"}
                  {data?.results?.totalBalance.toLocaleString("en-US")}
                </Text>
                <Text textAlign="center"> Balance </Text>
              </Box>
            </Box>
          </Box>

          <ScrollView
            mt={1}
            px={3}
            pt={3}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            w="auto"
          >
            <Box
              py={1}
              px={3}
              flexGrow={1}
              mr={4}
              rounded={"md"}
              backgroundColor="white"
              minW="220"
              w="auto"
            >
              <Box>
                <Text bold textAlign={"center"} fontSize="xs" color="muted.600">
                  Personal Info
                </Text>
              </Box>
              <Stack direction="column" mb="2" mt="1" space={1}>
                <Box flexDirection="row">
                  <Text bold> Name: </Text>
                  <Text>
                    {data?.results?.user?.firstName}{" "}
                    {data?.results?.user?.middleName}{" "}
                    {data?.results?.user?.lastName}{" "}
                  </Text>
                </Box>
                <Box flexDirection="row">
                  <Text bold> Address: </Text>
                  <Text>{data?.results?.user?.address}</Text>
                </Box>
                <Box flexDirection="row">
                  <Text bold> Phone Number: </Text>
                  <Text>{data?.results?.user?.phoneNumber} </Text>
                </Box>
              </Stack>
            </Box>
            <Box
              mr={8}
              py={1}
              px={3}
              flexGrow={1}
              rounded={"md"}
              backgroundColor="white"
              w="auto"
              minW="220"
            >
              <Box>
                <Text bold textAlign={"center"} fontSize="xs" color="muted.600">
                  Bank Information
                </Text>
              </Box>
              <Stack direction="column" mb="2.5" mt="1.5" space={1}>
                <Box flexDirection="row">
                  <Text bold> Bank Name: </Text>
                  <Text>{data?.results?.user?.bankName}</Text>
                </Box>
                <Box flexDirection="row">
                  <Text bold> Account #: </Text>
                  <Text>{data?.results?.user?.accountNumber}</Text>
                </Box>
                <Box flexDirection="row">
                  <Text bold> Pin Code: </Text>
                  <Text>{data?.results?.user?.pinCode}</Text>
                </Box>
              </Stack>
            </Box>
          </ScrollView>
        </Box>
      </Box>

      <Box
        px={5}
        flexDir={"row"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Text>Selected Date:</Text>
          <Text bold fontSize="sm">
            {dayjs(selectedDate).format("MM/DD/YYYY")}
          </Text>
        </Box>

        <Box mt={2} flexDir={"row"}>
          <TouchableOpacity onPress={handleOpenDate}>
            <Box alignItems="center">
              <AntDesign name="calendar" size={24} color="black" />
            </Box>
            <Text> Select Date </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSelectedDate(new Date());
            }}
          >
            <Box alignItems="center">
              <MaterialIcons name="clear" size={24} color="black" />
            </Box>
            <Text> Reset </Text>
          </TouchableOpacity>
        </Box>
      </Box>

      {userCredits.length <= 0 && (
        <Box mt={2}>
          <Nodata />
        </Box>
      )}

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
          keyExtractor={(data: any) => data?._id?.toString()}
          data={userCredits}
          renderItem={({ item, index }) => {
            const isBayad = item?.status === "bayad" ? true : false;
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
                      {item?.amount.toLocaleString("en-US")}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            );
          }}
          renderHiddenItem={(rowData, rowMap) => {
            return <SwiperUser rowData={rowData} rowMap={rowMap} />;
          }}
          leftOpenValue={-1}
          rightOpenValue={-175}
          onRowOpen={(rowKey, rowMap) => {
            setTimeout(() => {
              if (rowKey) {
                rowMap[rowKey]?.closeRow();
              }
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
