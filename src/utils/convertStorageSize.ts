const convertStorageSize = (size: number): string => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];

  let unitIndex = 0;
  while (size >= 1024) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
};

export default convertStorageSize;
