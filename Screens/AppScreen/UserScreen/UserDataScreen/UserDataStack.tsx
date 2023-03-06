import React from "react";
// React navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// User Stack Component
import UserData from "./UserData";
import AddUtang from "./AddUtang";
import AddBayad from "./AddBayad";

// Intialize Stack
const UserDataStack = createNativeStackNavigator();

const UserStack = () => {
  return (
    <UserDataStack.Navigator>
      <UserDataStack.Screen name="User Data" component={UserData} />
      <UserDataStack.Screen name="Add Utang" component={AddUtang} />
      <UserDataStack.Screen name="Add Bayad" component={AddBayad} />
    </UserDataStack.Navigator>
  );
};

export default UserStack;
