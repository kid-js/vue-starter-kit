import { RuleConfigSeverity } from '@commitlint/types'
import type { UserConfig } from '@commitlint/types'

const commitLintConfig: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'fix', // bug fix
        'feat', // new feature
        'docs', // documentation
        'chore', // maintenance tasks
        'refactor', // code refactoring
        'style', // code style formatting
        'test', // adding or fixing tests
        'perf', // performance improvement
        'revert', // revert previous changes
        'build', // build process changes
        'ci', // ci/cd configuration
      ],
    ],
    'scope-empty': [RuleConfigSeverity.Warning, 'never'], // scope is recommended, but not required
    'subject-min-length': [RuleConfigSeverity.Error, 'always', 6], // minimal subject length
    'header-max-length': [RuleConfigSeverity.Error, 'always', 80], // maximal header length
  },
}

export default commitLintConfig
