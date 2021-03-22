export default function (min = 1000, max = 10000) {
  const randomTime = Math.floor(Math.random() * (max - min) + min)

  return new Promise(function (resolve) {
    setTimeout(resolve, randomTime)
  })
}
