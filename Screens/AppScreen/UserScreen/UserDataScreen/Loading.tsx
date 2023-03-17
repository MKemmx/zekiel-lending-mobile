import React from "react";
import { Skeleton, VStack, Center, View, Box } from "native-base";

const Loading = () => {
  return (
    <View>
      <Skeleton h="2/5" mb={2} />
      {/* <Skeleton.Text px="4" /> */}
      <Box mt={2}>
        <Skeleton h="16" px="4" my="1.5" rounded="md" />
        <Skeleton h="16" px="4" my="1.5" rounded="md" />
        <Skeleton h="16" px="4" my="1.5" rounded="md" />
        <Skeleton h="16" px="4" my="1.5" rounded="md" />
      </Box>

      <Box display={"flex"} mt={2} flexDirection="row">
        <Skeleton h="16" px="2" w={"50%"} rounded="full" />
        <Skeleton h="16" px="2" w={"50%"} rounded="full" />
      </Box>
    </View>
  );
};

export default Loading;
