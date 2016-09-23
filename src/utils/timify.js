// Ref: https://github.com/yangshun/nusmods-v3/tree/master/src/js

// Converts a 24-hour format time string to an index:
// 0000 -> 0, 0030 -> 1, 0100 -> 2, ...
export function convertTimeToIndex(time) {
  let newTime = time;
  if (time === '2359') {
    newTime = '2400';
  }
  return (parseInt(newTime.substring(0, 2), 10) * 2) + (newTime.substring(2) === '00' ? 0 : 1);
}

// Reverse of convertTimeToIndex
// 0 -> 0000, 1 -> 0030, 2 -> 0100, ...
export function convertIndexToTime(index) {
  if (index === 48) {
    return '2359';
  }
  const hour = parseInt(index / 2, 10);
  const minute = (index % 2) === 0 ? '00' : '30';
  return (hour < 10 ? `0${hour.toString()}` : hour.toString()) + minute;
}
