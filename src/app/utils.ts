export const random = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
export const range = (min: number, max: number): number[] => {
    return Array.from({ length: max - min + 1 }, (_, i) => min + i);
    }

export const sum = (arr: number[]): number => arr.reduce((acc,curr) => acc + curr, 0);