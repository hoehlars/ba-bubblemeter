import { useEffect, useState } from 'react'

// test data
// const generateDataset = () =>
//   Array(10)
//     .fill(0)
//     .map(() => [Math.random() * 170 + 30, Math.random() * 170 + 30])

// HACK: kommastellen sind verrutscht, deswegen hier gefixt:
function fixDecimal(value) {
  return value >= 400000000000000 ? value / 10 ** 13 : value / 10 ** 12
}

function SmarterMap({ politicians }) {
  // get all politicians with smartmap coordinates

  const getCoordinates = (politicians) => {
    return politicians.filter((politician) => politician[5][0])
  }

  const politiker = getCoordinates(politicians)
  const [dataset, setDataset] = useState(politiker)
  const [myCircle, setMyCircle] = useState([0, 0])

  


  useEffect(() => {
    const politikerUpdate = getCoordinates(dataset)
    setDataset(politikerUpdate)

    const xValues = dataset.map((entry) => {
      const x = entry[5][0]
      const fixedX = fixDecimal(x)
      return fixedX
    })
    const yValues = dataset.map((yValue) => {
      const y = yValue[5][1]
      const fixedY = fixDecimal(y)
      return fixedY
    })

    const reducer = (accumulator, currentValue) => accumulator + currentValue

    console.log(xValues.reduce(reducer))
    setMyCircle([
      xValues.reduce(reducer) / politiker.length,
      yValues.reduce(reducer) / politiker.length,
    ])

    return () => {}
  }, [politicians, politiker.length])

  return (
    <div className='border-2 border-black max-w-2xl'>
      <svg viewBox='0 0 320 320'>
        <style>
          {`
            #axesLabels {
              font: 5px monospace;
            }

            #otherOnes circle {
              opacity: 0;
              animation: dropIn 2s ease forwards;
            } 
            #myCircle {
              opacity:0;
              animation:dropInLate 2s ease forwards;
            }

            @keyframes dropIn {
              20% { 
                opacity: 0;
                transform: translateY(-5%)
              }
              30%, 100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes dropInLate {
              80% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }
          `}
        </style>
        <g id='legend'>
          <g id='axes'>
            <line stroke='lightgray' x1='160' x2='160' y2='320' />
            <line stroke='lightgray' x1='0' x2='320' y1='160' y2='160' />
          </g>
          <g id='axesLabels'>
            <text x='50%' y='10' textAnchor='middle'>
              liberal
            </text>
            <text x='50%' y='310' textAnchor='middle'>
              konservativ
            </text>
            <text x='10' y='50%' textAnchor='start' dominantBaseline='middle'>
              links
            </text>
            <text x='310' y='50%' textAnchor='end' dominantBaseline='middle'>
              rechts
            </text>
          </g>
        </g>

        <g id='otherOnes'>
          {dataset.map((entry, i) => (
            <circle
              key={entry[0]}
              cx={fixDecimal(entry[5][0])}
              cy={fixDecimal(entry[5][1])}
              r='3'
              strokeWidth='1'
              stroke='#6B7280'
              fill='#D1D5DB'
              style={{ animationDelay: `${100 * (i + 1)}ms` }}
            >
              <title>{entry[0]}</title>
            </circle>
          ))}
        </g>
        <circle
          id='myCircle'
          cx={myCircle[0]}
          cy={myCircle[1]}
          r='5'
          strokeWidth='1'
          stroke='#DB2777'
          fill='#EC4899'
        />
      </svg>
    </div>
  )
}

export default SmarterMap
