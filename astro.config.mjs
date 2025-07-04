import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()]
});

import react from '@astrojs/react';

export default {
  integrations: [react()],
};
