import Decimal from 'decimal.js-light'
import { convertToDecimal } from './convertToDecimal'

describe('convertToDecimal', () => {
  it('should return a Decimal object without decimal places when given an amount ending in two zeroes', () => {
    const result = convertToDecimal('100')
    expect(result).toBeInstanceOf(Decimal)
    expect(result.toString()).toBe('1')
  })

  it('should return 0 when the input is 0', () => {
    const result = convertToDecimal('0')
    expect(result).toBeInstanceOf(Decimal)
    expect(result.toString()).toBe('0')
  })

  it("should return a Decimal object with value 0.01 when given an amount string of '1'", () => {
    const result = convertToDecimal('1')
    expect(result).toBeInstanceOf(Decimal)
    expect(result.toString()).toBe('0.01')
  })

  it("should return a Decimal object with value 0.01 when given an amount string of '001'", () => {
    const result = convertToDecimal('001')
    expect(result).toBeInstanceOf(Decimal)
    expect(result.toString()).toBe('0.01')
  })
})
