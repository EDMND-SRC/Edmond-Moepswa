export function isObject(item: unknown): item is Record<string, unknown> {
  return item !== null && typeof item === 'object' && !Array.isArray(item)
}

export default function deepMerge<
  T extends Record<string, unknown>,
  R extends Record<string, unknown>,
>(target: T, source: R): T & R {
  const output: Record<string, unknown> = { ...target }
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      const sourceValue = source[key as keyof R]
      if (isObject(sourceValue)) {
        if (!(key in target)) {
          Object.assign(output, { [key]: sourceValue })
        } else {
          output[key] = deepMerge(target[key] as Record<string, unknown>, sourceValue)
        }
      } else {
        Object.assign(output, { [key]: sourceValue })
      }
    })
  }

  return output as T & R
}
