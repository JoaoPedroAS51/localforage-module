import { createInstance } from "localforage";
import { defineNuxtPlugin, useRuntimeConfig } from "#app";
export default defineNuxtPlugin((nuxtApp) => {
  const { public: { localForage: options } } = useRuntimeConfig();
  const localForageInstance = createInstance(options);
  if (options.instances) {
    for (const instance of options.instances) {
      const name = instance.storeName || instance.name;
      if (!name) {
        continue;
      }
      localForageInstance[name] = createInstance(instance);
    }
  }
  nuxtApp.provide("localForage", localForageInstance);
});
