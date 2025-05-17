import type StarlightPluginGenerator from '../index.js'
import type { Configuration } from '../index.js'

import { validateEmoji, validateLayer, validateName, validateNonEmptyString } from './validator.js'

export function getPluginOrThemeStr(generator: StarlightPluginGenerator) {
  return generator.configuration.theme ? 'theme' : 'plugin'
}

export async function promptForName(generator: StarlightPluginGenerator) {
  const name = generator.options.name

  if (name && validateName(name) === true) {
    generator.configuration.name = name
    return
  }

  const answers = await generator.prompt<{ name: string }>({
    type: 'input',
    name: 'name',
    message: `What is the name of your Starlight ${getPluginOrThemeStr(generator)}?`,
    default: `starlight-${getPluginOrThemeStr(generator)}-name`,
    validate: validateName,
  })

  generator.configuration.name = answers.name
}

export async function promptForTheme(generator: StarlightPluginGenerator) {
  const theme = generator.options.theme

  if (theme !== undefined) {
    generator.configuration.theme = theme
    return
  }

  const answers = await generator.prompt<{ theme: boolean }>({
    type: 'list',
    name: 'theme',
    message: 'Is your plugin a theme?',
    choices: [
      { name: 'Yes', value: true },
      { name: 'No', value: false },
    ],
    default: false,
  })

  generator.configuration.theme = answers.theme
}

export async function promptForText(
  generator: StarlightPluginGenerator,
  key: TextConfigurationKeys,
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
    validate: validateNonEmptyString,
  })

  generator.configuration[key] = answers[key]
}

export async function promptForEmoji(generator: StarlightPluginGenerator) {
  const emoji = generator.options.emoji

  if (emoji && validateEmoji(emoji) === true) {
    generator.configuration.emoji = emoji
    return
  }

  const answers = await generator.prompt<{ emoji: string }>({
    type: 'input',
    name: 'emoji',
    message: `What single emoji represents your Starlight ${getPluginOrThemeStr(generator)}?`,
    default: generator.configuration.theme ? '🎨' : '🔋',
    suffix: ' (used in the documentation)',
    validate: validateEmoji,
  })

  generator.configuration.emoji = answers.emoji
}

export async function promptForLayer(generator: StarlightPluginGenerator) {
  const layer = generator.options.layer

  if (layer && validateLayer(layer) === true) {
    generator.configuration.layer = layer
    return
  }

  const answers = await generator.prompt<{ layer: string }>({
    type: 'input',
    name: 'layer',
    message: 'What is the name of your theme CSS cascade layer?',
    default: `my-theme`,
    validate: validateLayer,
  })

  generator.configuration.layer = answers.layer
}

type TextConfigurationKeys = NonNullable<
  {
    [K in keyof Configuration]: Configuration[K] extends string | undefined ? K : never
  }[keyof Configuration]
>
