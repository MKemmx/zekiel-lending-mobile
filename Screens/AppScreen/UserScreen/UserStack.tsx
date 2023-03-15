import React from "react";
// React navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// User Stack Component
import User from "./User/User";
import AddUser from "./AddUser/AddUser";

// Stacks
import UserDataStack from "./UserDataScreen/UserDataStack";

// Intialize Stack
const Stack = createNativeStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="Add User" component={AddUser} />
      <Stack.Screen
        name="User Data Stack"
        options={{
          headerShown: false,
        }}
        component={UserDataStack}
      />
    </Stack.Navigator>
  );
};

export default UserStack;
