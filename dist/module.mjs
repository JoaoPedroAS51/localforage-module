import { isNuxt2, defineNuxtModule, createResolver, addPlugin, addImports } from '@nuxt/kit';
import localforage from 'localforage';
import { defu } from 'defu';

const name = "@nuxtjs/localforage";
const version = "1.1.0";

function defineRuntimeConfig(nuxt, options) {
  const runtimeConfig = defu(getRuntimeConfig(nuxt), {
    name: options.name,
    storeName: options.storeName,
    driver: options.driver,
    size: options.size,
    version: options.version,
    description: options,
    instances: options.instances
  });
  Object.keys(runtimeConfig).forEach((key) => {
    if (runtimeConfig[key] === void 0) {
      delete runtimeConfig[key];
    }
  });
  setRuntimeConfig(nuxt, runtimeConfig);
  return runtimeConfig;
}
function getRuntimeConfig(nuxt) {
  if (isNuxt2()) {
    return nuxt.options.publicRuntimeConfig.localForage;
  } else {
    return nuxt.options.runtimeConfig.public.localForage;
  }
}
function setRuntimeConfig(nuxt, config) {
  if (isNuxt2()) {
    nuxt.options.publicRuntimeConfig.localForage = config;
  } else {
    nuxt.options.runtimeConfig.public.localForage = config;
  }
}

const INDEXEDDB = localforage.INDEXEDDB;
const LOCALSTORAGE = localforage.LOCALSTORAGE;
const WEBSQL = localforage.WEBSQL;
const module = defineNuxtModule({
  meta: {
    name,
    version,
    configKey: "localForage"
  },
  defaults: {
    name: "nuxtJS",
    storeName: "nuxtLocalForage"
  },
  setup(options, nuxt) {
    defineRuntimeConfig(nuxt, options);
    const { resolve } = createResolver(import.meta.url);
    const runtimeDir = resolve("./runtime");
    addPlugin({
      src: resolve(runtimeDir, "plugin"),
      mode: "client"
    });
    addImports({
      name: "useLocalForage",
      as: "useLocalForage",
      from: resolve(runtimeDir, "composables")
    });
  }
});

export { INDEXEDDB, LOCALSTORAGE, WEBSQL, module as default };
