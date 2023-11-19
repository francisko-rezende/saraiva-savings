import { convertToAmount } from './convertToAmount'

describe('convertToAmount', () => {
  it('should return a string with two decimal places when given a valid number string', () => {
    expect(convertToAmount('100')).toBe('1.00')
    expect(convertToAmount('500')).toBe('5.00')
    expect(convertToAmount('1234')).toBe('12.34')
  })

  it("should return '0.00' when given '0'", () => {
    expect(convertToAmount('0')).toBe('0.00')
  })

  it("should return '0.01' when given '1'", () => {
    expect(convertToAmount('1')).toBe('0.01')
  })

  it('should throw an error when given an empty string', () => {
    expect(() => convertToAmount('')).toThrow()
  })

  it('should throw an error when given a non-numeric string', () => {
    expect(() => convertToAmount('abc')).toThrow()
  })
})
