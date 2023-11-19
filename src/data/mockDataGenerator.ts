const currentDate = new Date() // Current date and time
const oneDay = 24 * 60 * 60 * 1000 // One day in milliseconds

// Function to generate a new data entry
const generateEntry = (
  amount: string,
  transactionType: string,
  account: string,
  industry: string,
  state: string,
  date: number,
) => ({
  date,
  amount: amount.toString(),
  transaction_type: transactionType,
  currency: 'brl',
  account,
  industry,
  state,
})

// Create a new set of data points
const newEntries = []

// Today entries
const morningEntry = generateEntry(
  '3005',
  'deposit',
  'New Company A',
  'Technology',
  'CA',
  currentDate.setHours(9, 0, 0, 0),
)
const eveningEntry = generateEntry(
  '2020',
  'withdraw',
  'New Company B',
  'Retail',
  'NY',
  currentDate.setHours(18, 0, 0, 0),
)
newEntries.push(morningEntry, eveningEntry)

// Previous days entries (two entries for each of the two previous days)
for (let i = 1; i <= 2; i++) {
  const previousDate = new Date(currentDate.getTime() - i * oneDay)
  const morningEntry = generateEntry(
    '-4050',
    'deposit',
    `New Company C${i}`,
    'Manufacturing',
    'TX',
    previousDate.setHours(9, 0, 0, 0),
  )
  const eveningEntry = generateEntry(
    '1510',
    'withdraw',
    `New Company D${i}`,
    'Finance',
    'IL',
    previousDate.setHours(18, 0, 0, 0),
  )
  newEntries.push(morningEntry, eveningEntry)
}

// Upcoming days entries (two entries for each of the two upcoming days)
for (let i = 1; i <= 2; i++) {
  const upcomingDate = new Date(currentDate.getTime() + i * oneDay)
  const morningEntry = generateEntry(
    '2500',
    'deposit',
    `New Company E${i}`,
    'Healthcare',
    'FL',
    upcomingDate.setHours(9, 0, 0, 0),
  )
  const eveningEntry = generateEntry(
    '1801',
    'withdraw',
    `New Company F${i}`,
    'Automotive',
    'MI',
    upcomingDate.setHours(18, 0, 0, 0),
  )
  newEntries.push(morningEntry, eveningEntry)
}

// Combine existing data with the new entries
export const newMockData = [...newEntries]

// Log the new data
// console.log(newMockData)
