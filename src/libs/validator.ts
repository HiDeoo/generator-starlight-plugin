const nameValidationRegex = /^(?:@[\da-z~-][\d._a-z~-]*\/)?[\da-z~-][\d._a-z~-]*$/

export function validateName(name: string) {
  return nameValidationRegex.test(name) ? true : 'Invalid plugin na me'
}
