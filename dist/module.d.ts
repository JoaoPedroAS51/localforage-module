import * as _nuxt_schema from '@nuxt/schema';

interface LocalForageDbInstanceOptions {
    name?: string;
    storeName?: string;
}
interface LocalForageOptions extends LocalForageDbInstanceOptions {
    driver?: string | string[];
    size?: number;
    version?: number;
    description?: string;
}
interface LocalForageDbMethodsCore {
    getItem<T>(key: string, callback?: (err: any, value: T | null) => void): Promise<T | null>;
    setItem<T>(key: string, value: T, callback?: (err: any, value: T) => void): Promise<T>;
    removeItem(key: string, callback?: (err: any) => void): Promise<void>;
    clear(callback?: (err: any) => void): Promise<void>;
    length(callback?: (err: any, numberOfKeys: number) => void): Promise<number>;
    key(keyIndex: number, callback?: (err: any, key: string) => void): Promise<string>;
    keys(callback?: (err: any, keys: string[]) => void): Promise<string[]>;
    iterate<T, U>(iteratee: (value: T, key: string, iterationNumber: number) => U, callback?: (err: any, result: U) => void): Promise<U>;
}
interface LocalForageDropInstanceFn {
    (dbInstanceOptions?: LocalForageDbInstanceOptions, callback?: (err: any) => void): Promise<void>;
}
interface LocalForageDriverMethodsOptional {
    dropInstance?: LocalForageDropInstanceFn;
}
interface LocalForageDbMethodsOptional {
    dropInstance: LocalForageDropInstanceFn;
}
interface LocalForageDriverDbMethods extends LocalForageDbMethodsCore, LocalForageDriverMethodsOptional {
}
interface LocalForageDriverSupportFunc {
    (): Promise<boolean>;
}
interface LocalForageDriver extends LocalForageDriverDbMethods {
    _driver: string;
    _initStorage(options: LocalForageOptions): void;
    _support?: boolean | LocalForageDriverSupportFunc;
}
interface LocalForageSerializer {
    serialize<T>(value: T | ArrayBuffer | Blob, callback: (value: string, error: any) => void): void;
    deserialize<T>(value: string): T | ArrayBuffer | Blob;
    stringToBuffer(serializedString: string): ArrayBuffer;
    bufferToString(buffer: ArrayBuffer): string;
}
interface LocalForageDbMethods extends LocalForageDbMethodsCore, LocalForageDbMethodsOptional {
}
interface LocalForage extends LocalForageDbMethods {
    LOCALSTORAGE: string;
    WEBSQL: string;
    INDEXEDDB: string;
    /**
     * Set and persist localForage options. This must be called before any other calls to localForage are made, but can
     * be called after localForage is loaded. If you set any config values with this method they will persist after
     * driver changes, so you can call config() then setDriver()
     */
    config(options: LocalForageOptions): boolean;
    config(options: string): any;
    config(): LocalForageOptions;
    /**
     * Create a new instance of localForage to point to a different store.
     * All the configuration options used by config are supported.
     */
    createInstance(options: LocalForageOptions): LocalForage;
    driver(): string;
    /**
     * Force usage of a particular driver or drivers, if available.
     */
    setDriver(driver: string | string[], callback?: () => void, errorCallback?: (error: any) => void): Promise<void>;
    defineDriver(driver: LocalForageDriver, callback?: () => void, errorCallback?: (error: any) => void): Promise<void>;
    /**
     * Return a particular driver
     */
    getDriver(driver: string): Promise<LocalForageDriver>;
    getSerializer(callback?: (serializer: LocalForageSerializer) => void): Promise<LocalForageSerializer>;
    supports(driverName: string): boolean;
    ready(callback?: (error: any) => void): Promise<void>;
}
declare type LocalForageInstance = LocalForage & {
    [key: string]: LocalForage;
};

declare const INDEXEDDB: string;
declare const LOCALSTORAGE: string;
declare const WEBSQL: string;

interface ModuleOptions extends LocalForageOptions {
    name: string;
    storeName: string;
    instances: LocalForageOptions[];
}
declare module '@nuxt/schema' {
    interface PublicRuntimeConfig {
        localForage: ModuleOptions;
    }
}
declare const _default: _nuxt_schema.NuxtModule<ModuleOptions>;

export { INDEXEDDB, LOCALSTORAGE, LocalForage, LocalForageDbInstanceOptions, LocalForageDbMethods, LocalForageDbMethodsCore, LocalForageDbMethodsOptional, LocalForageDriver, LocalForageDriverDbMethods, LocalForageDriverMethodsOptional, LocalForageDriverSupportFunc, LocalForageDropInstanceFn, LocalForageInstance, LocalForageOptions, LocalForageSerializer, ModuleOptions, WEBSQL, _default as default };
