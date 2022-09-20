import { useNuxtApp, useRuntimeConfig } from "#app";
export function useLocalForage(instance) {
  const { $localForage } = useNuxtApp();
  const { public: { localForage: options } } = useRuntimeConfig();
  if (instance) {
    if (!options.instances?.find(({ storeName, name }) => storeName === instance || name === instance)) {
      throw new Error(`Instance "${instance}" not found in LocalForage options.`);
    }
  }
  if (process.server) {
    return $localForage;
  }
  return instance ? $localForage[instance] : $localForage;
}
