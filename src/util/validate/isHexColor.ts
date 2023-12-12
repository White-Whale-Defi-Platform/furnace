// Todo: Comment
const HEX_COLOR_REGEX = /^#[0-9A-Fa-f]{6}$/

// Todo: Comment
export const isHexColor = (color: string): boolean => HEX_COLOR_REGEX.test(color)
