
import { ModuleOptions } from './module'

declare module '@nuxt/schema' {
  interface NuxtConfig { ['localForage']?: Partial<ModuleOptions> }
  interface NuxtOptions { ['localForage']?: ModuleOptions }
}


export { default } from './module'
