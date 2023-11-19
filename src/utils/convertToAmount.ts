export const convertToAmount = (numberString: string) => {
  if (numberString === '') {
    throw new Error('numberString must not be empty')
  }

  const number = parseInt(numberString)

  if (isNaN(number)) {
    throw new Error(
      'numberString must be parseable to numbers, parsing it must not result in NaN',
    )
  }

  return (number / 100).toFixed(2)
}
