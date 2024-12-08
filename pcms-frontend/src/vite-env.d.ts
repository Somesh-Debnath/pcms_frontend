/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_REGISTRATION_API_URL
    readonly VITE_APP_PLANS_API_URL
    // more env variables...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }