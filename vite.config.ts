import swc from 'unplugin-swc'
import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    swc.vite({
      module: { type: 'es6' }
    })
  ],
  test: {
    globals: true
  }
})
