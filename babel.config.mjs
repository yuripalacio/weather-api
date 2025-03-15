// babel.config.mjs
export default {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' }, loose: true, modules: false }],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './src'
        }
      }
    ],
    'babel-plugin-add-import-extension',
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-transform-class-properties', { loose: true }]
  ]
}
