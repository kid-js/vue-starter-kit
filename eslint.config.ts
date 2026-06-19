import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import parserHtml from '@html-eslint/parser'

import pluginStylistic from '@stylistic/eslint-plugin'
import pluginHtml from '@html-eslint/eslint-plugin'
import pluginUnicorn from 'eslint-plugin-unicorn'
import pluginImport from 'eslint-plugin-import'
import pluginJson from 'eslint-plugin-jsonc'
import pluginVue from 'eslint-plugin-vue'

const eslintConfig = defineConfigWithVueTs(
  {
    ignores: [
      '**/*.md',
      '**/dist/**',
      '**/tsconfig.*',
      '**/coverage/**',
      '**/node_modules/**',
      '**/dist-ssr/**',
      '**/.vscode/**',
      '**/docs/**',
      '**/*.d.ts',
    ],
  },

  pluginUnicorn.configs.recommended,
  pluginStylistic.configs.recommended,
  pluginImport.flatConfigs.recommended,
  pluginHtml.configs['flat/recommended'],
  // eslint-disable-next-line
  pluginJson.configs['recommended-with-json'],
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommendedTypeChecked,

  // global rules
  {
    rules: {
      'unicorn/filename-case': 'off',
    },
  },

  // common local rules
  {
    files: ['*.{js,ts}', 'src/**/*.{js,ts,vue}'],
    rules: {
      'import/named': 'off',
      'import/no-unresolved': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-useless-undefined': 'off',
      'import/newline-after-import': 'error',
      'unicorn/no-abusive-eslint-disable': 'off',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/relative-url-style': ['warn', 'always'],
      'import/consistent-type-specifier-style': 'error',
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/no-await-expression-member': 'off',
      'unicorn/consistent-destructuring': 'warn',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-console-spaces': 'off',
      'unicorn/no-null': 'off',
      'no-console': ['warn', {
        allow: ['warn', 'error'],
      }],
    },
  },

  // vue component rules
  {
    files: ['src/**/*.vue'],
    rules: {
      'vue/html-indent': 'error',
      'vue/block-order': ['error', {
        order: ['script', 'template', 'style'],
      }],
      'vue/multi-word-component-names': ['error', {
        ignores: ['App', 'Layout'],
      }],
      'vue/no-unused-properties': ['error', {
        groups: ['props', 'data', 'computed', 'methods'],
      }],
      'vue/component-name-in-template-casing': ['error', 'PascalCase', {
        ignores: ['router-view', 'router-link'],
        registeredComponentsOnly: false,
      }],
      'vue/define-macros-order': ['error', {
        order: ['defineProps', 'defineEmits', 'defineSlots', 'defineModel'],
        defineExposeLast: false,
      }],
      'vue/attributes-order': ['error', {
        order: [
          ['DEFINITION', 'CONDITIONALS', 'RENDER_MODIFIERS'],
          'LIST_RENDERING', 'GLOBAL',
          ['SLOT', 'TWO_WAY_BINDING', 'OTHER_DIRECTIVES', 'OTHER_ATTR', 'CONTENT'],
          'UNIQUE', 'EVENTS',
        ],
        ignoreVBindObject: false,
        sortLineLength: false,
        alphabetical: false,
      }],
      'vue/custom-event-name-casing': ['error', 'kebab-case'],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/prop-name-casing': ['error', 'camelCase'],
      'vue/no-unused-emit-declarations': 'error',
      'vue/prefer-use-template-ref': 'error',
      'vue/max-template-depth': ['warn', {
        maxDepth: 8,
      }],
      'vue/max-attributes-per-line': ['warn', {
        singleline: {
          max: 5,
        },
      }],
      'unicorn/filename-case': ['error', {
        case: 'pascalCase',
      }],
    },
  },

  // ts style guide
  {
    files: ['src/**/*.{ts,vue}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'no-nested-ternary': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      'no-restricted-syntax': ['warn', {
        message: 'Use literal unions instead of enums.',
        selector: 'TSEnumDeclaration',
      }],
      'complexity': ['warn', {
        max: 16,
      }],
    },
  },

  // stylistic rules
  {
    files: ['*.{js,ts}', 'src/**/*.{js,ts,vue}'],
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/brace-style': ['error', 'stroustrup'],
      '@stylistic/max-len': ['error', {
        ignoreUrls: true,
        tabWidth: 2,
        code: 108,
      }],
    },
  },

  // html rules
  {
    files: ['*.html', 'src/**/*.html'],
    languageOptions: {
      parser: parserHtml,
    },
    extends: [vueTsConfigs.disableTypeChecked],
    rules: {
      '@html-eslint/attrs-newline': ['error', {
        ifAttrsMoreThan: 5,
      }],
      '@html-eslint/indent': ['error', 2, {
        tagChildrenIndent: {
          html: 0,
        },
      }],
    },
  },

  // json rules
  {
    files: ['*.json', 'src/**/*.json'],
    extends: [vueTsConfigs.disableTypeChecked],
  },
)

export default eslintConfig
