const nameValidationRegex = /^(?:@[\da-z~-][\d._a-z~-]*\/)?[\da-z~-][\d._a-z~-]*$/

export function validateName(name: string) {
  return nameValidationRegex.test(name) ? true : 'Invalid plugin name'
}

export function validateNonEmptyString(value: string) {
  return value.trim().length > 0 ? true : 'Value cannot be empty'
}
