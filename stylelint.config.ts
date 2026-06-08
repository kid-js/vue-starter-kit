import type { Config } from 'stylelint'

const styleLintConfig: Config = {
  extends: [
    'stylelint-config-recommended-vue',
    'stylelint-config-recommended-scss',
    '@stylistic/stylelint-config',
  ],
  plugins: ['@stylistic/stylelint-plugin'],
  rules: {
    '@stylistic/indentation': 2,
    'selector-pseudo-element-no-unknown': [true, {
      ignorePseudoElements: ['v-deep'],
    }],
    'at-rule-no-unknown': [true, {
      ignoreAtRules: [
        'if',
        'for',
        'else',
        'mixin',
        'extend',
        'include',
        'at-root',
        'function',
        'content',
        'forward',
        'return',
        'debug',
        'each',
        'use',
      ],
    }],
  },
  customSyntax: 'postcss-scss',
  overrides: [
    {
      files: ['**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
  ignoreFiles: [
    '**/*.md',
    '**/dist/**',
    '**/*.min.css',
    '**/coverage/**',
    '**/node_modules/**',
    '**/dist-ssr/**',
    '**/.vscode/**',
    '**/public/**',
    '**/docs/**',
  ],
}

export default styleLintConfig
