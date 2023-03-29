import React from "react";
import { NativeBaseProvider, extendTheme } from "native-base";

// Navigations
import { SafeAreaView } from "react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Auth Screens
import Login from "./Screens/AuthScreen/Login/Login";
import Register from "./Screens/AuthScreen/RegisterScreen/Register";

// APP Screens
import HomeScreen from "./Screens/AppScreen/HomeScreen/Home";
import SettingsScreen from "./Screens/AppScreen/Settings";

// Stack Credit
import CreditStackScreen from "./Screens/AppScreen/CreditScreen/CreditStack";

// Stack User
import UserStackScreen from "./Screens/AppScreen/UserScreen/UserStack";

// Login States
import { useLoginStore } from "./store/loginStore";

// Icons
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";

// React Query
import { QueryClient, QueryClientProvider } from "react-query";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}

// Screen Stacks
const AuthStack = createNativeStackNavigator();
const FooterTab = createBottomTabNavigator();

const queryClient = new QueryClient();

export default function App() {
  const { isAuthenticated } = useLoginStore((state: any) => state);

  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <NavigationContainer>
          <SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: "always" }}>
            {isAuthenticated ? (
              <FooterTab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarActiveTintColor: "#1d3b80",
                  tabBarHideOnKeyboard: true,
                }}
              >
                <FooterTab.Screen
                  name="Home"
                  component={HomeScreen}
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <AntDesign name="home" size={size} color={color} />
                    ),
                  }}
                />

                <FooterTab.Screen
                  name="User Stack"
                  component={UserStackScreen}
                  options={{
                    tabBarLabel: "User",
                    tabBarIcon: ({ color, size }) => (
                      <FontAwesome name="users" size={size} color={color} />
                    ),
                  }}
                />

                <FooterTab.Screen
                  name="Credit Stack"
                  component={CreditStackScreen}
                  options={{
                    tabBarLabel: "Credit Ledger",
                    tabBarIcon: ({ color, size }) => (
                      <AntDesign name="creditcard" size={size} color={color} />
                    ),
                  }}
                />

                <FooterTab.Screen
                  name="Setting"
                  component={SettingsScreen}
                  options={{
                    tabBarLabel: "Setting",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name="md-settings-outline"
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                />
              </FooterTab.Navigator>
            ) : (
              <AuthStack.Navigator screenOptions={{ headerShown: false }}>
                <AuthStack.Screen name="Login" component={Login} />
                <AuthStack.Screen name="Register" component={Register} />
              </AuthStack.Navigator>
            )}
          </SafeAreaView>
        </NavigationContainer>
      </NativeBaseProvider>
    </QueryClientProvider>
  );
}
