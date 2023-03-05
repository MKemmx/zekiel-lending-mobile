import React from "react";

// Nativebase
import { View } from "native-base";

// Screens
import CreditItem from "./CreditItem";

const Credit = () => {
  return (
    <View flex={1} px={5} pt={5} pb={16}>
      <CreditItem />
    </View>
  );
};

export default Credit;
