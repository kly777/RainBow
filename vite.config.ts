import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import autoprefixer from "autoprefixer"
import cssnano from "cssnano";
import ElementPlus from 'unplugin-element-plus/vite';
import vuetify from 'vite-plugin-vuetify'
import {resolve} from "path"
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer';
export default defineConfig({
    plugins: [vue(),
    AutoImport({
        resolvers: [ElementPlusResolver()],
    }),
    Components({
        resolvers: [ElementPlusResolver()],
    }),
        vuetify({ autoImport: true }),
    ElementPlus({ useSource: true }),
    viteCompression(),
    visualizer(),
    ],
    css: {
        postcss: {
            plugins: [
                autoprefixer(),
                cssnano()
            ],
        },
    },
    server: {
        host: '0.0.0.0',
        origin: 'http://localhost:5173',
    },
    build: {
        rollupOptions: {
            output: {

                manualChunks: {
                    codemirror: ['codemirror'],
                },

            },
            onwarn(warning, warn) {
                // 自定义警告处理逻辑
                if (warning.code === 'UNUSED_EXTERNAL_IMPORT') {
                    return;
                }
                warn(warning);
            },
        },
        minify: "terser",
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        }
    },
    resolve: {
        // 设置文件./src路径为 @
        alias: [
            {
                find: '@',
                replacement: resolve(__dirname, './src')
            }
        ]
    }
})




