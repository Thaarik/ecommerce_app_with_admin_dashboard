import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { supabase } from "../lib/supabase";

// This hook will subscribe to the custom-update-channel channel and listen for updates to the order table in Supabase.
// When an update is received, it will invalidate the orders query so that the new data is fetched.
// To get this done, first you need to the required table where you need subscription, click edit table and and click "Enable real time" and then click "Save" button.`
// then go to API docs, scroll down, and get the code for Subscription update and use it here.

export const useOrderUpdateSubscription = () => {
  const queryClient = useQueryClient(); // invalidate the quires for cache update

  useEffect(() => {
    const subscriptionResponse = supabase
      .channel("custom-update-channel")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "order" },
        (payload) => {
          console.log("Change received!", payload);
          queryClient.invalidateQueries({
            queryKey: ["orders"],
          });
        }
      )
      .subscribe();

    return () => {
      subscriptionResponse.unsubscribe(); // unsubscribe the subscription to avoid memory leaks
    };
  }, []);
};
