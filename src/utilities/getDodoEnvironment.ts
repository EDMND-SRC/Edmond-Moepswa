export type DodoEnvironment = 'test_mode' | 'live_mode'

export const getDodoEnvironment = (
  value = process.env.DODO_PAYMENTS_ENVIRONMENT,
): DodoEnvironment => {
  if (!value) {
    return 'test_mode'
  }

  const normalizedValue = value.trim().toLowerCase()

  if (normalizedValue === 'live' || normalizedValue === 'live_mode') {
    return 'live_mode'
  }

  return 'test_mode'
}
