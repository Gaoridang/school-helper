export const getImageUrlWithUpdateTime = (url: string | null, time: string | null) => {
  if (!url || !time) {
    return "";
  }
  return `${url}?t=${new Date(time).getTime()}`;
};
