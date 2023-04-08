import React from "react";
import {
  VStack,
  Box,
  Text,
  Avatar,
  HStack,
  Spacer,
  Input,
  Icon,
  Spinner,
  View,
} from "native-base";
import { RefreshControl, TouchableOpacity, ScrollView } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
// Icons
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useDebounce } from "use-debounce";
// Components
import ListLoader from "components/ListLoader";
import NoData from "components/NoData";
import PrintButton from "./PrintButton";
// React Query and Services
import { useInfiniteQuery } from "react-query";
import { readUser } from "services/user";

// Get QueryClient from the context
const UserItem = ({ navigation }: { navigation: any }) => {
  const [searchText, setSearchText] = React.useState("");
  const [debouncedFilter] = useDebounce(searchText, 1000);

  const {
    data,
    isFetching,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["users", debouncedFilter],
    queryFn: ({ pageParam = 1 }) => {
      return readUser(pageParam, debouncedFilter);
    },
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    keepPreviousData: false,
  });

  const handleChangeText = (text: string) => {
    setSearchText(text);
  };

  const handleRefresh = React.useCallback(() => {
    refetch();
  }, [refetch]);

  const keyExtractor = (item: any) => {
    return item._id.toString();
  };

  const userData = data?.pages?.flatMap((data) => data.users);

  return (
    <>
      <Input
        backgroundColor={"#FFF"}
        isDisabled={isLoading}
        value={searchText}
        onChangeText={handleChangeText}
        mb={3}
        size={"lg"}
        placeholder="Search"
        variant="filled"
        width="100%"
        borderRadius="10"
        p="2"
        InputLeftElement={
          <Icon
            ml="2"
            size="5"
            color="gray.700"
            as={<Ionicons name="ios-search" />}
          />
        }
      />

      {(isFetching || isLoading) && searchText !== "" && (
        <ListLoader loadingLength={13} />
      )}

      {isLoading ? (
        <ListLoader loadingLength={13} />
      ) : (
        <React.Fragment>
          {userData!.length <= 0 ? (
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={isFetching && isLoading}
                  onRefresh={handleRefresh}
                />
              }
            >
              <NoData searchText={searchText} />
            </ScrollView>
          ) : (
            <Box
              style={{
                height: "auto",
              }}
            >
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
                keyExtractor={keyExtractor}
                data={userData}
                renderItem={({ item, index }) => {
                  return (
                    <Box
                      key={index}
                      backgroundColor="white"
                      rounded={"lg"}
                      px={2}
                      py={4}
                      mb={4}
                    >
                      <HStack space={[3, 3]} justifyContent="space-between">
                        <Avatar
                          background="gray.500"
                          alignSelf="center"
                          size="50px"
                          source={{
                            uri: item?.image?.url,
                          }}
                        >
                          <Text fontSize="sm" color="coolGray.100" bold>
                            {`${item?.firstName[0]} ${item?.lastName[0]}`}
                          </Text>
                        </Avatar>
                        <VStack alignSelf="center">
                          <Text color="coolGray.800" bold>
                            {`${item?.firstName} ${item?.middleName} ${item?.lastName} `}
                          </Text>
                          <Box flexDirection={"row"} alignItems="center">
                            <FontAwesome5
                              name="phone"
                              size={12}
                              color="#4b5563"
                            />
                            <Text
                              ml={1.5}
                              bold
                              fontSize="xs"
                              color="coolGray.600"
                            >
                              {item?.phoneNumber}
                            </Text>
                          </Box>
                          <Box flexDirection={"row"} alignItems="center">
                            <FontAwesome5
                              name="address-card"
                              size={12}
                              color="#4b5563"
                            />
                            <Text
                              ml={1.5}
                              bold
                              fontSize="xs"
                              color="coolGray.600"
                            >
                              {item?.address}
                            </Text>
                          </Box>
                        </VStack>
                        <Spacer />
                      </HStack>
                    </Box>
                  );
                }}
                renderHiddenItem={(rowData, rowMap) => {
                  const userId = rowData.item._id;
                  return (
                    <Box p={2} overflow={"hidden"} px={0}>
                      <HStack
                        space={[0, 0]}
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Spacer />
                        <PrintButton rowData={rowData} />

                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate("User Data Stack", {
                              screen: "User Data",
                              params: { userId },
                            });
                          }}
                        >
                          <View
                            mr={1}
                            px={3}
                            style={{
                              backgroundColor: "gray",
                              height: "80%",
                              justifyContent: "center",
                            }}
                          >
                            <Text color="white" fontSize="xs">
                              View
                            </Text>
                          </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate("User Interest Stack", {
                              screen: "Interest Data",
                              params: { userId },
                            });
                          }}
                        >
                          <View
                            px={3}
                            style={{
                              backgroundColor: "green",
                              height: "80%",
                              justifyContent: "center",
                            }}
                          >
                            <Text color="white" fontSize="xs">
                              Interest
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </HStack>
                    </Box>
                  );
                }}
                leftOpenValue={-1}
                rightOpenValue={-200}
                onRowOpen={(rowKey, rowMap) => {
                  setTimeout(() => {
                    if (rowMap[rowKey]) {
                      rowMap[rowKey]?.closeRow();
                    }
                  }, 5000);
                }}
                // onEndReachedThreshold={1}
                onEndReached={() => {
                  if (hasNextPage && !isFetching) {
                    fetchNextPage();
                  }
                }}
                ListFooterComponent={
                  <React.Fragment>
                    {isFetchingNextPage || isFetching ? (
                      <Box mb={4} pt={1}>
                        <Spinner size="large" color="#0000ff" />
                      </Box>
                    ) : null}
                  </React.Fragment>
                }
              />
            </Box>
          )}
        </React.Fragment>
      )}
    </>
  );
};

export default UserItem;
