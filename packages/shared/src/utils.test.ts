import { formatPrice, capitalize } from './utils'

describe('utils', () => {
  test('formatPrice formats price correctly', () => {
    expect(formatPrice(10.5)).toBe('10.5 ₽')
  })

  test('capitalize capitalizes string', () => {
    expect(capitalize('hello')).toBe('Hello')
  })
})