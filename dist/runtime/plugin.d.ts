import { LocalForageInstance } from './types';
declare const _default: any;
export default _default;
interface PluginInjection {
    $localForage: LocalForageInstance;
}
declare module '#app' {
    interface NuxtApp extends PluginInjection {
    }
}
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties extends PluginInjection {
    }
}
declare module 'vue/types/vue' {
    interface Vue extends PluginInjection {
    }
}
