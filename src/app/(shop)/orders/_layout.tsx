import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useOrderUpdateSubscription } from "../../../api/subscriptions";

const OrdersLayout = () => {
  useOrderUpdateSubscription(); // This hook will subscribe to the custom-update-channel channel and listen for updates to the order table in Supabase.
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default OrdersLayout;
