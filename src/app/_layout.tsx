import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";
import AuthProvider from "../provider/auth-provider";
import { QueryProvider } from "../provider/query-provider";

const RootLayout = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <QueryProvider>
          <Stack>
            <Stack.Screen
              name="(shop)"
              options={{ headerShown: false, title: "Shop" }}
            />
            <Stack.Screen
              name="categories"
              options={{ headerShown: false, title: "Categories" }}
            />
            <Stack.Screen
              name="product"
              options={{ headerShown: false, title: "Product" }}
            />
            <Stack.Screen
              name="cart"
              options={{ presentation: "modal", title: "Shopping Cart" }} //  for modal screen
            />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
          </Stack>
        </QueryProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default RootLayout;
