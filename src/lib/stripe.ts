// 1. Setup the payment sheet
//2. Open stripe checkout form
import { CollectionMode } from "@stripe/stripe-react-native/lib/typescript/src/types/PaymentSheet";
import { supabase } from "./supabase";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";

const fetchStripeKeys = async (totalAmount: number) => {
  const { data, error } = await supabase.functions.invoke("stripe-checkout", {
    body: {
      totalAmount,
    },
  });
  if (error) throw new Error(error.message);
  return data;
};

export const setupStripePaymentSheet = async (totalAmount: number) => {
  //Fetch paymentIntent and publishable key from the server
  const { paymentIntent, publicKey, ephemeralKey, customer } =
    await fetchStripeKeys(totalAmount);
  if (!paymentIntent || !publicKey)
    throw new Error("Failed to fetch stripe keys");
  await initPaymentSheet({
    merchantDisplayName: "EC Shop",
    paymentIntentClientSecret: paymentIntent,
    customerId: customer,
    customerEphemeralKeySecret: ephemeralKey,
    billingDetailsCollectionConfiguration: {
      name: "always" as CollectionMode,
      phone: "always" as CollectionMode,
    },
  });
};

export const openStripeCheckout = async () => {
  const { error } = await presentPaymentSheet();
  if (error) {
    throw new Error(error.message);
  }
  return true;
};
