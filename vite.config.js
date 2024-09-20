import path from 'path';

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	const proxy_url =
		process.env.VITE_DEV_REMOTE === 'remote'
			? process.env.VITE_BACKEND_SERVER
			: 'http://localhost:8888/';

	const config = {
		plugins: [react()],
		resolve: {
			base: '/',
			alias: {
				'@': path.resolve(__dirname, 'src'),
				'@api': path.resolve(__dirname, 'src/api'),
				'@components': path.resolve(__dirname, 'src/components'),
				'@assets': path.resolve(__dirname, 'src/assets'),
				'@styles': path.resolve(__dirname, 'src/styles'),
				'@utils': path.resolve(__dirname, 'src/utils'),
				'@services': path.resolve(__dirname, 'src/services'),
				'@hooks': path.resolve(__dirname, 'src/hooks'),
				'@context': path.resolve(__dirname, 'src/context'),
				'@pages': path.resolve(__dirname, 'src/pages'),
				'@layouts': path.resolve(__dirname, 'src/layouts'),
				'@constants': path.resolve(__dirname, 'src/constants'),
				'@types': path.resolve(__dirname, 'src/types'),
				'@config': path.resolve(__dirname, 'src/config'),
				'@modules': path.resolve(__dirname, 'src/modules'),
				'@forms': path.resolve(__dirname, 'src/forms'),
				'@request': path.resolve(__dirname, 'src/request'),
				'@apps': path.resolve(__dirname, 'src/apps'),
				'@routes': path.resolve(__dirname, 'src/routes'),
			},
		},
		server: {
			port: 3000,
			// headers: {
			//   'Content-Type': 'application/javascript'
			// },
			proxy: {
				'/api': {
					target: proxy_url,
					changeOrigin: true,
					secure: false,
				},
			},
		},
	};
	return defineConfig(config);
};
