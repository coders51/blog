import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import rehypePrettyCode from "rehype-pretty-code";

const options = {
  keepBackground: false
};

const LOCALHOST_URL = "http://localhost:4321";
const LIVE_URL = "https://abjunior92.github.io";
const SCRIPT = process.env.npm_lifecycle_script || "";
const isBuild = SCRIPT.includes("astro build");
let BASE_URL = LOCALHOST_URL;

if (isBuild) {
  BASE_URL = LIVE_URL;
}

// https://astro.build/config
export default defineConfig({
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [[rehypePrettyCode, options]]
  },
  site: BASE_URL,
  integrations: [mdx(), sitemap(), tailwind(), react()],
  output: "static",
  server: {
    host: true
  }
});
