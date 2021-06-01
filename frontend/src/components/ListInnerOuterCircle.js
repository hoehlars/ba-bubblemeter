function ListInnerOuterCircle({ innerCircle, outerCircle }) {
    const DISTANCE_IDX = 17

    const sortByDistance = (politicians) => {
        politicians.sort((a, b) => a[DISTANCE_IDX]- b[DISTANCE_IDX])
        return politicians
    }

    const innerCircleSorted = sortByDistance(innerCircle)
    const outerCircleSorted = sortByDistance(outerCircle)



  const innerOuterCircleList = (
    <div>
        <h3 className="text-2xl mb-2">Inner Circle</h3>
        {innerCircleSorted.slice(0,5).map((politician, i) => (
            <p key={i}>{`${politician[1]} ${politician[2]}, Distance: ${politician[DISTANCE_IDX]}`}</p>
        ))}

        <h3 className="text-2xl mb-2">Outer Circle</h3>
        {outerCircleSorted.slice(0,5).map((politician, i) => (
            <p key={i}>{`${politician[1]} ${politician[2]}, Distance: ${politician[DISTANCE_IDX]}`}</p>
        ))}
    </div>
  )

  return innerOuterCircleList
}

export default ListInnerOuterCircle
