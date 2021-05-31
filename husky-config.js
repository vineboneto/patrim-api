const { execSync } = require('child_process')

console.log('Setting Husky...')
const scripts = [
  'npx rimraf .config',
  'npx husky install .config/husky',
  'npx husky add .config/husky/pre-push "yarn test:ci"',
  'npx husky add .config/husky/pre-commit "yarn lint-staged"',
  'npx husky add .config/husky/commit-msg ".git/hooks/commit-msg $1"'
]

for (const script of scripts) {
  try {
    console.log(script + '👀')
    execSync(script)
    console.log('✔')
  } catch (error) {
    console.error()
  }
}
