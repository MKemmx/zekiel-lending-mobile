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
import { RefreshControl, TouchableOpacity } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

// Icons
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

// React Query
import { useInfiniteQuery } from "react-query";
import { useDebounce } from "use-debounce";

// Components
import ListLoader from "../../../components/ListLoader";

// Services
import { readUser } from "../../../services/user";

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
      console.log(debouncedFilter);
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
        py="2"
        px="2"
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
            data={data?.pages?.flatMap((data) => data.users)}
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
                      alignSelf="center"
                      size="50px"
                      source={{
                        uri: "http://demo.solwininfotech.com/wordpress/probit/wp-content/uploads/2015/12/Rick-Kelly.jpg",
                      }}
                    />
                    <VStack alignSelf="center">
                      <Text color="coolGray.800" bold>
                        {`${item?.firstName} ${item?.middleName} ${item?.lastName} `}
                      </Text>
                      <Box flexDirection={"row"} alignItems="center">
                        <FontAwesome5 name="phone" size={12} color="#4b5563" />
                        <Text ml={1.5} bold fontSize="xs" color="coolGray.600">
                          {item?.phoneNumber}
                        </Text>
                      </Box>
                      <Box flexDirection={"row"} alignItems="center">
                        <FontAwesome5
                          name="address-card"
                          size={12}
                          color="#4b5563"
                        />
                        <Text ml={1.5} bold fontSize="xs" color="coolGray.600">
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
                <Box p={2} overflow={"hidden"} px={0} mb={5}>
                  <HStack space={[0, 0]} justifyContent="space-between">
                    <Spacer />
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("User Data", { userId });
                      }}
                    >
                      <View
                        px={6}
                        style={{
                          backgroundColor: "gray",
                          height: "100%",
                          justifyContent: "center",
                        }}
                      >
                        <Text color="white" fontSize="xs">
                          View
                        </Text>
                      </View>
                    </TouchableOpacity>
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
    </>
  );
};

export default UserItem;
