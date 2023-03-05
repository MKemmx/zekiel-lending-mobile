import React from "react";
// React Native
import { RefreshControl } from "react-native";

import {
  VStack,
  Box,
  Text,
  Avatar,
  HStack,
  Spacer,
  FlatList,
  Input,
  Icon,
  Spinner,
} from "native-base";

// DayJS
import dayjs from "dayjs";

// Icons
import { Ionicons } from "@expo/vector-icons";

// React Query
import { useInfiniteQuery } from "react-query";
import { useDebounce } from "use-debounce";

// Components
import ListLoader from "../../../components/ListLoader";
import NoData from "../../../components/NoData";

// Services
import { readCreditLedger } from "../../../services/creditLedger";

// Get QueryClient from the context
const CreditItem = () => {
  const [searchText, setSearchText] = React.useState("");
  const [debouncedFilter] = useDebounce(searchText, 500);

  const {
    data,
    isFetching,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["credits", debouncedFilter],
    queryFn: ({ pageParam = 1 }) => {
      return readCreditLedger(pageParam, debouncedFilter);
    },
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
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

  const creditLedgerData = data?.pages?.flatMap((data) => data.creditLedger);

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

      {isLoading ? (
        <ListLoader loadingLength={13} />
      ) : (
        <React.Fragment>
          {creditLedgerData!.length <= 0 ? (
            <NoData searchText={searchText} />
          ) : (
            <React.Fragment>
              <Box
                style={{
                  height: "auto",
                }}
              >
                <FlatList
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
                  data={creditLedgerData}
                  renderItem={({ item, index }) => {
                    const isBayad = item.status === "bayad" ? true : false;

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
                          <Avatar
                            size="50px"
                            source={{
                              uri: "http://demo.solwininfotech.com/wordpress/probit/wp-content/uploads/2015/12/Rick-Kelly.jpg",
                            }}
                          />
                          <VStack alignSelf="center">
                            <Text fontSize="sm" color="coolGray.800" bold>
                              {`${item?.user?.firstName} ${item.user?.lastName}`}
                            </Text>
                            <Text fontSize="2xs" color="coolGray.600">
                              {dayjs(item?.createdAt).format("MM/DD/YYYY")}
                            </Text>
                          </VStack>
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
                  onEndReached={() => {
                    if (hasNextPage && !isFetching) {
                      fetchNextPage();
                    }
                  }}
                  // onEndReachedThreshold={1}
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
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </>
  );
};

export default CreditItem;
