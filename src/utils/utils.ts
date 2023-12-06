import { getDocs,limit, query, Query} from 'firebase/firestore';

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getMonthName(monthNumber: number) {
  // Ensure monthNumber is a valid month index (0 to 11)
  if (monthNumber < 1 || monthNumber > 12) {
    throw new Error('Invalid month number. Month number should be between 0 and 11.');
  }

  // Create a Date object with the desired month (0-indexed)
  const date = new Date(2000, monthNumber, 1);

  // Use toLocaleString to get the month name based on the user's locale
  const monthName = date.toLocaleString('en-US', { month: 'long' });

  return monthName.slice(0, 3);
}

// Helper function to get the last document from the previous page
export const getLastDocument = async (q: Query, page: number, pageSize: number) => {
  const startIndex = (page - 1) * pageSize;
  const queryWithLimit = query(q, limit(startIndex + 1)); // Limit to one more than the current page

  const snapshot = await getDocs(queryWithLimit);
  const lastDocument = snapshot.docs[snapshot.docs.length - 1];

  return lastDocument;
};