const nameValidationRegex = /^(?:@[\da-z~-][\d._a-z~-]*\/)?[\da-z~-][\d._a-z~-]*$/
const emojiValidationRegex = /^\p{Emoji_Presentation}\p{Emoji_Modifier}*$/u

export function validateName(name: string) {
  return nameValidationRegex.test(name) ? true : 'Invalid plugin name'
}

export function validateNonEmptyString(value: string) {
  return value.trim().length > 0 ? true : 'Value cannot be empty'
}

export function validateEmoji(emoji: string) {
  return emojiValidationRegex.test(emoji) ? true : 'Invalid emoji'
}
