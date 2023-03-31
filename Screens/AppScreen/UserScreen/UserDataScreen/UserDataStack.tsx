import React from "react";
// React navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Icons
import { AntDesign } from "@expo/vector-icons";

// User Stack Component
import UserData from "./UserData";
import AddUtang from "./AddUtangScreen/AddUtang";
import AddBayad from "./AddBayadScreen/AddBayad";
import EditUser from "./EditUser/EditUser";

// Intialize Stack
const UserDataStack = createNativeStackNavigator();

const UserStack = () => {
  return (
    <UserDataStack.Navigator>
      <UserDataStack.Screen
        name="User Data"
        component={UserData}
        options={({ navigation, route }) => ({
          headerRight: () => (
            <AntDesign
              onPress={() => {
                navigation.navigate("Edit User", route.params);
              }}
              name="edit"
              size={24}
              color="black"
            />
          ),
        })}
      />
      <UserDataStack.Screen name="Add Utang" component={AddUtang} />
      <UserDataStack.Screen name="Add Bayad" component={AddBayad} />
      <UserDataStack.Screen name="Edit User" component={EditUser} />
    </UserDataStack.Navigator>
  );
};

export default UserStack;
