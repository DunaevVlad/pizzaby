import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname),
  resolve: {
    alias: {
      shared: resolve(__dirname, '../../packages/shared/src'),
      'ui-kit': resolve(__dirname, '../../packages/ui-kit/src'),
    },
  },
})