import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Home from "./components/Home";
import Info from "./components/Info";
import Main from "./components/Main";

const Tab = createBottomTabNavigator();

const TabNavigation: React.FC = () => (
  <NavigationContainer>
    <Tab.Navigator
      // screenOptions={{
      //     tabBarStyle: styles.tabBar,
      //     tabBarInactiveBackgroundColor: 'tomato',
      //     tabBarLabelStyle: styles.tabLabel,
      //   }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Info") {
            iconName = focused ? "bluetooth" : "bluetooth-outline";
          } else if (route.name === "Main") {
            iconName = focused ? "finger-print" : "finger-print-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        // showLabel: false, // скрыть текст названий вкладок
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Info" component={Info} />
      <Tab.Screen name="Main" component={Main} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default TabNavigation;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "coral",
  },
  tabLabel: {
    color: "pink",
    fontSize: 25,
    paddingBottom: 10,
  },
});
