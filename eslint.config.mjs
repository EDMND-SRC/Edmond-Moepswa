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
        },
      }
    }
    return configEntry
  }),

  {
    ignores: ['.next/', 'node_modules/', '.agent/', '_bmad/', '_bmad-output/', 'docs/'],
  },
]

export default eslintConfig
