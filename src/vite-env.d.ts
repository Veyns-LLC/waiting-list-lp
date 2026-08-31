/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Loops.so newsletter form id — safe to expose, it is a public endpoint. */
  readonly VITE_LOOPS_FORM_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.png" {
  const src: string;
  export default src;
}
declare module "*.svg" {
  const src: string;
  export default src;
}
