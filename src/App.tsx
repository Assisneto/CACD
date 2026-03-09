import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import TinderCard from "./screens/tinderCard";
import Home from "./screens/Home";
import Achievements from "./screens/Achievements";
import Profile from "./screens/Profile";

type RootStackParamList = {
  Home: undefined;
  TinderCard: { disciplineId: string };
};

type RootTabParamList = {
  HomeStack: undefined;
  Achievements: undefined;
  Profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const tabIconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  HomeStack: "book",
  Achievements: "trophy",
  Profile: "person",
};

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TinderCard"
        component={TinderCard}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color }) => {
            const iconName = tabIconMap[route.name] ?? "book";
            return <Ionicons name={iconName} size={28} color={color} />;
          },
          tabBarLabel: () => null,
          tabBarActiveTintColor: "#003366",
          tabBarInactiveTintColor: "#999",
          tabBarStyle: {
            height: 64,
            paddingVertical: 10,
            borderTopWidth: 1,
            borderTopColor: "#ccc",
            backgroundColor: "#fff",
          },
        })}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            title: "Livros",
          }}
        />
        <Tab.Screen
          name="Achievements"
          component={Achievements}
          options={{
            title: "Troféu",
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            title: "Perfil",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
