import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";
import AuthProvider from "../provider/auth-provider";
import { QueryProvider } from "../provider/query-provider";
import { StripeProvider } from "@stripe/stripe-react-native";
import NotificationProvider from "../provider/notification-provider";

const RootLayout = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <QueryProvider>
          <StripeProvider
            publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY}
          >
            <NotificationProvider>
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
            </NotificationProvider>
          </StripeProvider>
        </QueryProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

export default RootLayout;
