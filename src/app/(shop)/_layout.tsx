import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import { Redirect, Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "../../provider/auth-provider";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={24} {...props} style={{ color: "green" }} />;
}

const TabsLayout = () => {
  const { session, mounting } = useAuth();
  if (mounting) return <ActivityIndicator />; // show loading when user session is being fetched form supabase
  if (!session) return <Redirect href="/auth" />; // redirect to auth page if the session is unavailabale or expired
  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      {/** to get rid of the space in the bottom of the tab we use edge={["top"]} */}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: { fontSize: 16 },
          tabBarStyle: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 10,
          },
          headerShown: false,
        }}
      >
        {/* renders from the index.js inside the (shop) folder */}
        <Tabs.Screen
          name="index"
          options={{
            title: "shop",
            tabBarIcon(props) {
              return <TabBarIcon {...props} name="shopping-cart" />;
            },
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: "orders",
            tabBarIcon(props) {
              return <TabBarIcon {...props} name="book" />;
            },
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
