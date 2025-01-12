import { defineConfig, loadEnv } from "vite";

import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// export default defineConfig(({mode}) => {
//   const env = loadEnv(mode, process.cwd(), '')
//   return {
//   plugins: [react()],
//   server: {
//     port: process.env.VITE_PORT,
//   },
// }});
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    // vite config
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
    plugins: [react()],
    server: {
      port: parseInt(process.env.VITE_PORT || "5173"),
    },
  };
});
