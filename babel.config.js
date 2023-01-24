module.exports = (api) => {
  api.cache(true);
  return {
    presets: [
      '@babel/preset-typescript',
      '@babel/preset-react',
      [
        '@babel/preset-env',
        {
          targets: {
            node: '10',
          },
        },
      ],
    ],
    plugins: [
      ['styled-jsx/babel', {optimizeForSpeed: true}],
      [
        'module-resolver',
        {
          root: ['./src', './tests'],
          extensions: ['.ts', '.tsx'],
        },
      ],
      '@babel/plugin-transform-runtime',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
    ],
  };
};
