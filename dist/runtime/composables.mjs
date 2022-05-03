import { useNuxtApp, useRuntimeConfig } from "#app";
export function useLocalForage(instance) {
  const { $localForage } = useNuxtApp();
  const { public: { localForage: localForageOptions } } = useRuntimeConfig();
  if (instance) {
    if (!localForageOptions.instances?.find(({ name }) => name === instance)) {
      throw new Error(`Instance "${instance}" not found in LocalForage options.`);
    }
  }
  if (process.server) {
    return $localForage;
  }
  return instance ? $localForage[instance] : $localForage;
}
