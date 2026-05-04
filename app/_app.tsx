import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerBackgroundFetchAsync } from "./notifications/notificationTasks";
import { api } from "../src/services/api";
import { Stack, useRouter } from "expo-router";

export default function AppWrapper() {
  const router = useRouter();

  useEffect(() => {
    let responseListener: Notifications.Subscription | null = null;

    (async () => {
      // ask for permission
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      // ensure the notification handler returns the full shape expected by types
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldShowBanner: true,
          shouldShowList: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });

      // register background fetch task if permission granted
      if (finalStatus === "granted") {
        await registerBackgroundFetchAsync();
      }

      // initialise LAST_POST_ID so first run doesn't immediately notify
      try {
        const last = await AsyncStorage.getItem("LAST_POST_ID");
        if (!last) {
          const data = await api.getPosts(1, 1);
          if (Array.isArray(data) && data[0]?.id) {
            await AsyncStorage.setItem("LAST_POST_ID", String(data[0].id));
          }
        }
      } catch (e) {
        console.warn("Failed to init LAST_POST_ID", e);
      }

      // handle notification taps: navigate to article if postId present
      responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
        const postId = response.notification.request.content.data?.postId;
        if (postId) {
          router.push(`/article/${postId}`);
        } else {
          router.push("/");
        }
      });
    })();

    return () => {
      if (responseListener) responseListener.remove();
    };
  }, [router]);

  return <Stack />;
}