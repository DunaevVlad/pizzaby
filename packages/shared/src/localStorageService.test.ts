import { setItem, getItem, removeItem } from './storage/localStorageService'

describe('localStorageService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('setItem stores value in localStorage', () => {
    setItem('key', 'value')
    expect(localStorage.getItem('key')).toBe('"value"')
  })

  test('getItem retrieves and parses value from localStorage', () => {
    localStorage.setItem('key', '"value"')
    const result = getItem('key', null)
    expect(result).toBe('value')
  })

  test('getItem returns default value for non-existent key', () => {
    const result = getItem('nonexistent', 'default')
    expect(result).toBe('default')
  })

  test('removeItem removes value from localStorage', () => {
    localStorage.setItem('key', 'value')
    removeItem('key')
    expect(localStorage.getItem('key')).toBeNull()
  })
})