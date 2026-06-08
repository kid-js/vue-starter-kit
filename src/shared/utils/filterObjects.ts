type TRemoveUndefined = <T extends object>(obj: T, options?: { deep?: boolean }) => Partial<T>

/**
 * Removes all properties with a value of `undefined` from a given object with no mutation.
 * If a non-plain object is passed (e.g., Array, Date, or null), it returns it as-is.
 *
 * @template T - The type of the source object.
 * @param {T} obj - The source object to clean.
 * @param {Object} options - Configuration options.
 * @param {boolean} options.deep - Recursion option, `false` by default.
 * @returns {Partial<T>} A new object without `undefined` fields.
 *
 * - If `options.deep` is false (default), only top-level `undefined` values are removed.
 * - If `options.deep` is true, nested objects are also processed to remove `undefined` values.
 *
 * @example
 * const data = { a: 1, b: undefined, c: { d: 55, e: undefined } }
 *
 * * // Shallow cleanup
 * removeUndefined(data)
 * // => { a: 1, c: { d: 55, e: undefined } }
 *
 * * // Deep cleanup
 * removeUndefined(data, { deep: true })
 * // => { a: 1, c: { d: 55 } }
 */
export const removeUndefined: TRemoveUndefined = (obj, { deep = false } = {}) => {
  const isPlainObject = (value: unknown): value is Record<string, unknown> => {
    return (
      value !== null
      && typeof value === 'object'
      && Object.getPrototypeOf(value) === Object.prototype
    )
  }

  if (!isPlainObject(obj)) {
    return obj
  }

  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      result[key] = deep && isPlainObject(value) ? removeUndefined(value, { deep }) : value
    }
  }

  return result as Partial<typeof obj>
}
