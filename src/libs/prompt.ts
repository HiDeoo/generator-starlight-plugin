import { validateName } from './validator.js'

export function getNamePrompt() {
  return {
    type: 'input',
    name: 'name',
    message: 'What is the name of your Starlight plugin?',
    default: `starlight-plugin-name`,
    validate: validateName,
  } as const
}
