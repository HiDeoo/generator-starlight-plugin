import type StarlightPluginGenerator from '../index.js'
import type { Configuration } from '../index.js'

import { validateName } from './validator.js'

export async function promptForName(generator: StarlightPluginGenerator) {
  const name = generator.options.name

  if (name && validateName(name) === true) {
    generator.configuration.name = name
    return
  }

  const answers = await generator.prompt<{ name: string }>({
    type: 'input',
    name: 'name',
    message: 'What is the name of your Starlight plugin?',
    default: `starlight-plugin-name`,
    validate: validateName,
  })

  generator.configuration.name = answers.name
}

export async function promptForText(
  generator: StarlightPluginGenerator,
  key: keyof Configuration,
  message: string,
  defaultValue: string,
) {
  const text = generator.options[key]

  if (text) {
    generator.configuration[key] = text
    return
  }

  const answers = await generator.prompt<NonNullable<{ [key in keyof Configuration]-?: string }>>({
    type: 'input',
    name: key,
    message,
    default: defaultValue,
  })

  generator.configuration[key] = answers[key]
}
