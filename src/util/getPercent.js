export const getPercentStar = (data) => {
  const stars = data
    .map((review) => review.stars)
    .reduce((a, b) => a + b, 0);
  const percent = Math.ceil(stars / data.length);
  return percent;
}