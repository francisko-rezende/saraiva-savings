export const formatToUSDate = (date?: number | Date | undefined | string) => {
  const dateToFormat = typeof date === 'string' ? Number(date) : date

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(dateToFormat)
}
