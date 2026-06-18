/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_GATEWAY_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
