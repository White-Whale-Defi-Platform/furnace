// Todo: Comment
const VALID_TOKEN_INPUT_REGEX = /^(0|0\.\d{0,6}|[1-9]\d{0,16}(?:\.\d{0,6})?|)$/

// Todo: Comment
export const isValidTokenInput = (input: string): boolean => VALID_TOKEN_INPUT_REGEX.test(input)
