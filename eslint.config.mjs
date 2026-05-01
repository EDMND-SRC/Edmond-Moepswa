import nextConfig from 'eslint-config-next'

const eslintConfig = [
  // Next.js flat config (core-web-vitals + TypeScript included)
  ...nextConfig,

  // Custom rule overrides — placed in same config scope as the typescript-eslint
  // plugin that Next.js provides via eslint-config-next
  ...nextConfig.map((configEntry) => {
    // Find the config entry that has typescript-eslint plugin and rules
    if (configEntry.plugins?.['@typescript-eslint'] && configEntry.rules) {
      return {
        ...configEntry,
        rules: {
          ...configEntry.rules,
          '@typescript-eslint/ban-ts-comment': 'warn',
          '@typescript-eslint/no-empty-object-type': 'warn',
          '@typescript-eslint/no-explicit-any': 'warn',
          '@typescript-eslint/no-unused-vars': [
            'warn',
            {
              vars: 'all',
              args: 'after-used',
              ignoreRestSiblings: false,
              argsIgnorePattern: '^_',
              varsIgnorePattern: '^_',
              destructuredArrayIgnorePattern: '^_',
              caughtErrorsIgnorePattern: '^(_|ignore)',
            },
          ],
          'react-hooks/error-boundaries': 'off',
          'react-hooks/purity': 'off',
          'react-hooks/refs': 'off',
          'react-hooks/set-state-in-effect': 'off',
          'react-hooks/static-components': 'off',
          'react/jsx-no-comment-textnodes': 'off',
          'react/no-unescaped-entities': 'off',
        },
      }
    }
    return configEntry
  }),

  {
    rules: {
      'react-hooks/error-boundaries': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/static-components': 'off',
      'react/jsx-no-comment-textnodes': 'off',
      'react/no-unescaped-entities': 'off',
    },
  },
  {
    ignores: [
      '.next/',
      '.open-next/',
      'node_modules/',
      '.agent/',
      '_bmad/',
      '_bmad-output/',
      'coverage/',
      'test-outputs/',
      'docs/',
    ],
  },
]

export default eslintConfig
