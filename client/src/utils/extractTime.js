export function extractDateTime(dateString) {
	const date = new Date(dateString);
  
	// Extract time
	let hours = date.getHours();
	const minutes = padZero(date.getMinutes());
	const amOrPm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12 || 12; 
	hours = padZero(hours);
	const time = `${hours}:${minutes} ${amOrPm}`;
  
	// Extract date
	const day = padZero(date.getDate());
	const month = padZero(date.getMonth() + 1); // Months are zero-based
	const year = date.getFullYear();
	const formattedDate = `${day}/${month}/${year}`;
  
	// Return an object with time and date
	return {
	  time,
	  date: formattedDate
	};
  }
  
  // Helper function to pad single-digit numbers with a leading zero
  function padZero(number) {
	return number.toString().padStart(2, "0");
  }
  