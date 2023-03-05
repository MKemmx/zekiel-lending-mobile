import React from "react";
// React navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// User Stack Component
import Credit from "./Credit";

// Intialize Stack
const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Credit Ledger" component={Credit} />
    </Stack.Navigator>
  );
};

export default UserStack;
