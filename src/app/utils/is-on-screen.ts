export const isBelowCenterOfTheScreen = (elem: HTMLElement) => {
  const rect = elem.getBoundingClientRect();
  const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  return !(rect.bottom < viewHeight / 2 || rect.top - viewHeight >= 0);
};
