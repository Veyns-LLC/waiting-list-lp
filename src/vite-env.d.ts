/// <reference types="vite/client" />

// Loops credentials are deliberately NOT exposed here — they are read
// server-side by api/subscribe.ts, never inlined into the client bundle.

declare module "*.png" {
  const src: string;
  export default src;
}
declare module "*.svg" {
  const src: string;
  export default src;
}
