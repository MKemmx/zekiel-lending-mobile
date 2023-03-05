import React from "react";
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
  View,
  Container,
  Fab,
} from "native-base";
import { RefreshControl, TouchableOpacity } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

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
      <Box h="auto" backgroundColor="#1D3B80">
        <Container
          backgroundColor="#1D3B80"
          h="40"
          py={6}
          w="100%"
          alignItems="center"
          mx="auto"
        >
          <Box>
            <Text bold fontSize="md" textAlign="center" color="#FFF">
              User Ledger Data
            </Text>
          </Box>

          <Box mt="12">
            <Avatar
              style={{
                borderColor: "white",
                borderWidth: 6,
              }}
              size="2xl"
              source={{
                uri: "http://demo.solwininfotech.com/wordpress/probit/wp-content/uploads/2015/12/Rick-Kelly.jpg",
              }}
            />
          </Box>
        </Container>
      </Box>

      <Box px="5" py="2" mt="24" mb="56">
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
      />
      <Fab
        // style={{ backgroundColor: "#1D3B80" }}
        w="40%"
        placement="bottom-right"
        renderInPortal={false}
        shadow={1}
        size="md"
        label="Bayad"
      />
    </Box>
  );
};

export default UserData;
