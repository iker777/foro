export const howLongItWas = (createdAt) => {
  // let createdAt = "2023-01-29T13:05:52.000Z";
  createdAt = new Date(createdAt).getTime()
  const now = new Date().getTime()
  const timeHasPassed = Math.floor((now - createdAt) / (1000 * 3600));
  return timeHasPassed
}
