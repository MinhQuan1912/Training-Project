export function useFormatNumber() {
  const formatNum = (val: number): string => {
    if (val > 1000000) {
      return (val / 1000000).toFixed(0) + "m";
    }
    if (val > 10000) {
      return (val / 1000).toFixed(0) + "k";
    }
    return val.toString();
  };
  return { formatNum };
}
