import React from "react";
// React navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// User Stack Component
import User from "./User";
import AddUser from "./AddUser/AddUser";
import UserData from "./UserData/UserData";

// Intialize Stack
const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="Add User" component={AddUser} />
      <Stack.Screen
        name="User Data"
        options={{
          title: "",
        }}
        component={UserData}
      />
    </Stack.Navigator>
  );
};

export default UserStack;
