const nameValidationRegex = /^(?:@[\da-z~-][\d._a-z~-]*\/)?[\da-z~-][\d._a-z~-]*$/
const emojiValidationRegex = /^\p{Emoji_Presentation}\p{Emoji_Modifier}*$/u
const layerValidationRegex = /^[a-zA-Z][_a-zA-Z0-9-]*$/

export function validateName(name: string) {
  return nameValidationRegex.test(name) ? true : 'Invalid plugin name'
}

export function validateNonEmptyString(value: string) {
  return value.trim().length > 0 ? true : 'Value cannot be empty'
}

export function validateEmoji(emoji: string) {
  return emojiValidationRegex.test(emoji) ? true : 'Invalid emoji'
}

export function validateLayer(name: string) {
  return layerValidationRegex.test(name) ? true : 'Invalid theme CSS cascade layer name'
}
