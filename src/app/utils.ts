// Function to generate a random number between min and max (inclusive)
export const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Function to generate an array of numbers from min to max (inclusive)
export const range = (min: number, max: number): number[] => {
  return Array.from({ length: max - min + 1 }, (_, i) => min + i);
};

// Function to calculate the sum of an array of numbers
export const sum = (arr: number[]): number => arr.reduce((acc, curr) => acc + curr, 0);

// Function to find a random sum in an array of numbers that is less than or equal to max
export const randomSumIn = (arr: number[], max: number): number => {
  const sets: number[][] = [[]]; // Initialize sets as an array containing an empty array
  const sums: number[] = []; // Initialize sums as an empty array

  // Iterate over each item in the input array
  for (const item of arr) {
    const currentSetsLength = sets.length; // Get the current length of sets

    // Iterate over each set in sets
    for (let j = 0; j < currentSetsLength; j++) {
      const candidateSet = sets[j].concat(item); // Create a new set by adding the current item to the current set
      const candidateSum = sum(candidateSet); // Calculate the sum of the new set
      
      // If the sum is less than or equal to max, add the new set and sum to sets and sums respectively
      if (candidateSum <= max) {
        sets.push(candidateSet);
        sums.push(candidateSum);
      }
    }
  }

  // Handle the case when sums is empty
  if (sums.length === 0) return 0; // Return 0 or some default value if sums is empty
  
  // Return a random sum from sums
  return sums[random(0, sums.length - 1)];
};