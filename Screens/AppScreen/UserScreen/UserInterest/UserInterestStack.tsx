import React from "react";

// Components
import InterestData from "./InterestData";
// React navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const UserInterestStack = createNativeStackNavigator();

const UserInterest = () => {
  return (
    <UserInterestStack.Navigator>
      <UserInterestStack.Screen name="Interest Data" component={InterestData} />
    </UserInterestStack.Navigator>
  );
};

export default UserInterest;
