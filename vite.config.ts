import { resolve } from 'path';

function pathResolve(dir) {
  return resolve(__dirname, '.', dir);
}

export default ({ command }) => {
  return {
    resolve: {
      alias: [
        {
          find: /^~/,
          replacement: pathResolve('node_modules') + '/',
        },
        {
          find: /@\//,
          replacement: pathResolve('src') + '/',
        },
      ],
    },
    optimizeDeps: {
      include: ['@ant-design/colors', '@ant-design/icons'],
    },
    plugins: [],
    server: {
      port: 4000,
      proxy: {
        '/dedective': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dedective/, ''),
        },
      },
    },
  };
};
