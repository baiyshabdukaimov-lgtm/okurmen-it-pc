export const PHONE_PREFIX = '+996 '

export function formatPhone(value) {
  let digits = String(value).replace(/\D/g, '')
  if (digits.startsWith('996')) digits = digits.slice(3)
  digits = digits.slice(0, 9)
  const groups = digits.match(/.{1,3}/g) || []
  return PHONE_PREFIX + groups.join(' ')
}

export function isCompletePhone(value) {
  return /^\+996 \d{3} \d{3} \d{3}$/.test(value)
}
