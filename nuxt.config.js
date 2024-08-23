import fs from 'fs';
import path from 'path';

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'halo-theme-create',
    htmlAttrs: {
      lang: 'en',
      'xmlns:th': 'https://www.thymeleaf.org'
    },
    meta: [
      { charset: 'utf-8' },
      { httpEquiv: "X-UA-Compatible", content: "IE=edge" },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  elementUI: {
    locale: 'zh-CN', // 默认语言
    size: 'medium' // 默认尺寸
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: '/assets/', // 打包后资源路径
    extractCSS: {
      // 将 CSS 文件提取到单独的文件
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css'
    },
    transpile: [/^element-ui/]
  },

  generate: {
    dir: 'templates',
    fallback: false,
    nojekyll: false, // 禁止生成 .nojekyll 文件

    // 动态生成需要的路由
    async routes() {
      const pagesDir = path.join(__dirname, 'pages');
      const files = fs.readdirSync(pagesDir);

      // 获取 .vue 文件对应的路由，但排除 index.vue
      return files
        .filter(file => file.endsWith('.vue') && file !== 'index.vue')
        .map(file => `/${file.replace('.vue', '')}`);
    }
  },

  // 声明一个生成后处理的钩子
  hooks: {
    'generate:page': (page) => {
      page.html = page.html
        .replace(/<script src="([^"]+)"(.*?)>/g, '<script th:src="@{$1}"$2>')   // JavaScript
        .replace(/<link rel="stylesheet" href="([^"]+)"(.*?)>/g, '<link th:href="@{$1}"$2>'); // CSS
    },
    'generate:done': async (generator) => {
      const outputDir = path.join(generator.options.generate.dir);
      const routes = await generator.options.generate.routes(); // 获取所有生成的路由

      // 遍历所有路由
      for (const route of routes) {
        const filePath = path.join(outputDir, `${route === '/' ? 'index.html' : `/${route}/index.html`}`);
        const newFileName = route === '/' ? 'index.html' : `${route.substring(1)}.html`; // 重命名逻辑

        // 移动文件到根目录
        fs.renameSync(filePath, path.join(outputDir, newFileName));
        // 删除生成的文件夹
        fs.rmSync(outputDir + `/${route}`, { recursive: true });
      }

      console.log('All files moved to root directory successfully.');
    }
  }
}
