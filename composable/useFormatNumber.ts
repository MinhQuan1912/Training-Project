export function useFormatNumber() {
  const formatNum = (val: number): string => {
    if (val > 1000000) {
      return Math.floor(val / 1000000) + "m";
    }
    if (val > 10000) {
      return Math.floor(val / 1000) + "k";
    }
    return val.toString();
  };
  return { formatNum };
}
