// Import package
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";
import { Ionicons } from "@expo/vector-icons";

// Import screens
import Home from "./src/screens/Home";
import DailyActivities from "./src/screens/DailyActivities";
import Meeting from "./src/screens/Meeting";
import Exercise from "./src/screens/Exercise";
import Exam from "./src/screens/Exam";
import Pending from "./src/screens/Pending";
import Done from "./src/screens/Done";
import Calculator from "./src/screens/Calculator";

// Create stack navigation
const Stack = createStackNavigator();

// Create bottom tab navigation
const Tab = createBottomTabNavigator();

function MyTab() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        headerMode: "screen",
        tabBarIcon: ({ focused, color, size }) => {
          let IconName;
          if (route.name === "To Do List") {
            IconName = focused ? "list-circle" : "list-circle-outline";
          } else if (route.name === "Calculator") {
            IconName = focused ? "calculator" : "calculator-outline";
          }
          return <Ionicons name={IconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.info["500"],
        tabBarInactiveTintColor: "grey",
        tabBarInactiveBackgroundColor: "#F2F2F2",
        tabBarActiveBackgroundColor: "#F2F2F2",
      })}
    >
      <Tab.Screen name="To Do List" component={Home} />
      <Tab.Screen name="Calculator" component={Calculator} />
    </Tab.Navigator>
  );
}

export default function Container() {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="To Do List" component={MyTab} options={{ headerShown: false }} />
        <Stack.Screen name="Calculator" component={MyTab} />
        <Stack.Screen name="Daily Activities" component={DailyActivities} />
        <Stack.Screen name="Meeting" component={Meeting} />
        <Stack.Screen name="Exercise" component={Exercise} />
        <Stack.Screen name="Exam" component={Exam} />
        <Stack.Screen name="Pending" component={Pending} />
        <Stack.Screen name="Done" component={Done} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
