import localforage from "localforage";
import { defineNuxtPlugin, useRuntimeConfig } from "#app";
export default defineNuxtPlugin((nuxtApp) => {
  const { public: { localForage: options } } = useRuntimeConfig();
  const localForageInstance = localforage.createInstance(options);
  for (const instance of options.instances) {
    const name = instance.storeName || instance.name;
    if (!name) {
      continue;
    }
    localForageInstance[name] = localforage.createInstance(instance);
  }
  nuxtApp.provide("localForage", localForageInstance);
});
