import SmarterMap from './SmarterMap'

function Schwerpunkt({ politicians }) {
  function calculateCoordinates(politicians, k) {
    let sumX = 0,
      sumY = 0,
      sumScore = 0

    // sort and slice Politicians Array
    const percent = Math.round((politicians.length / 100) * k)
    const politiciansSortedByScore = politicians.sort((a, b) => b[15] - a[15])
    const topPoliticians = politiciansSortedByScore.slice([0], [percent])

    for (let politician of topPoliticians) {
      sumX += parseFloat(politician[13]) * parseFloat(politician[15])
      sumY += parseFloat(politician[14]) * parseFloat(politician[15])
      sumScore += parseFloat(politician[15])
    }

    const coordinates = { x: sumX / sumScore, y: sumY / sumScore }
    return coordinates
  }

  const myCoords = calculateCoordinates(politicians, 5)

  return <SmarterMap myCoords={myCoords} />
}

export default Schwerpunkt
