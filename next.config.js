/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

const { svgrWebpackRule } = require('./webpack/svgWebpack');
const { audioWebpackRule } = require('./webpack/audioWebpack');
const { shaderWebpackRule } = require('./webpack/shaderWebpack');

const nextConfig = {
  experimental: {},
  images: {},
  reactStrictMode: true,
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
  webpack(config, { isServer }) {
    // Enables importing SVGs as React components.
    // See: https://react-svgr.com/docs/next/
    config.module.rules.push(svgrWebpackRule);
    config.module.rules.push(audioWebpackRule({ config, isServer }));
    config.module.rules.push(shaderWebpackRule);

    return config;
  },
};

// manage i18n
if (process.env.EXPORT !== 'true') {
  nextConfig.i18n = {
    locales: ['en', 'jp'],
    defaultLocale: 'en',
  };
}

const KEYS_TO_OMIT = [
  'webpackDevMiddleware',
  'configOrigin',
  'target',
  'analyticsId',
  'webpack5',
  'amp',
  'assetPrefix',
];

module.exports = (_phase, { defaultConfig }) => {
  const plugins = [[withPWA], [withBundleAnalyzer, {}]];

  const wConfig = plugins.reduce(
    (acc, [plugin, config]) => plugin({ ...acc, ...config }),
    {
      ...defaultConfig,
      ...nextConfig,
    },
  );

  const finalConfig = {};

  Object.keys(wConfig).forEach((key) => {
    if (!KEYS_TO_OMIT.includes(key)) {
      finalConfig[key] = wConfig[key];
    }
  });

  return finalConfig;
};
