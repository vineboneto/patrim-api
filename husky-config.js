const { execSync } = require('child_process')

console.log('Setting Husky...')
const scripts = [
  'npx rimraf .config',
  'npx husky install .config/husky',
  'npx husky add .config/husky/pre-push "yarn test:ci"',
  'npx husky add .config/husky/pre-commit "yarn lint-staged && yarn test:staged"',
  'npx husky add .config/husky/commit-msg ".git/hooks/commit-msg $1"'
]

for (script of scripts) {
  try {
    execSync(script)
    if (script === scripts[scripts.length - 1] ) console.log('Husky success configured ✔')
  } catch (error) {
    console.error
  }
}
