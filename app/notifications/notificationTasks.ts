import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../src/services/api"; // adjust path if needed

const TASK_NAME = "CHECK_NEW_POSTS_TASK";
const LAST_POST_KEY = "LAST_POST_ID";

async function fetchLatestPostId(): Promise<number | null> {
  try {
    const data = await api.getPosts(1, 1);
    if (Array.isArray(data) && data[0]?.id) return data[0].id;
  } catch (e) {}
  return null;
}

TaskManager.defineTask(TASK_NAME, async () => {
  try {
    const latestId = await fetchLatestPostId();
    if (!latestId) return BackgroundFetch.BackgroundFetchResult.NoData;

    const last = await AsyncStorage.getItem(LAST_POST_KEY);
    const lastId = last ? Number(last) : null;

    if (!lastId || latestId > lastId) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Új cikk a Szeged365-en",
          body: "Megjelent egy új poszt — nézd meg!",
          data: { postId: latestId },
        },
        trigger: null,
      });
      await AsyncStorage.setItem(LAST_POST_KEY, String(latestId));
      return BackgroundFetch.BackgroundFetchResult.NewData;
    }

    return BackgroundFetch.BackgroundFetchResult.NoData;
  } catch {
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

export async function registerBackgroundFetchAsync() {
  try {
    await BackgroundFetch.registerTaskAsync(TASK_NAME, {
      minimumInterval: 15 * 60,
      stopOnTerminate: false,
      startOnBoot: true,
    });
    return true;
  } catch {
    return false;
  }
}

export async function unregisterBackgroundFetchAsync() {
  try {
    await BackgroundFetch.unregisterTaskAsync(TASK_NAME);
  } catch {}
}