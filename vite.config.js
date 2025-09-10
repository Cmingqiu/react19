import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
console.log(';;', process.env);
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [react()],
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : []
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash:6].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          antd: ['antd' /*  '@ant-design/icons' */]
          // utils: ['@utils/index.js'],
          // api: ['@api/index.js'],
          // router: ['@router/index.jsx'],
          // store: ['@store/index.jsx'],
          // hooks: ['@hooks/index.jsx']
        }
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
});

/* 

cdn外链  vite-plugin-cdn-import
esbuild去除调试代码 console debugger
使用vite-plugin-imgmin压缩图片
gzip压缩 vite-plugin-compression 
代码分割 
提取字体文件中用到的字体 vite-plugin-font
*/
