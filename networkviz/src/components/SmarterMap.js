import { useEffect, useState } from 'react'

// HACK: kommastellen sind verrutscht, deswegen hier gefixt:
function fixDecimal(value) {
  return value >= 400000000000000 ? value / 10 ** 13 : value / 10 ** 12
}

function SmarterMap({ politicians }) {
  const [myCircle, setMyCircle] = useState([160, 160])

  const [politikerUpdate, setPolitikerUpdate] = useState(politicians)

  const FIRSTNAME_IDX = 1
  const LASTNAME_IDX = 2
  const SMARTMAP_ID_IDX = 0
  const PARTYCOLOR_IDX = 10
  const X_ID = 13
  const Y_ID = 14
  const PARTY_ABBREVIATION_ID = 9

  function calculateMyCircle() {
    const xSum = politikerUpdate.reduce((xTotal, currentX) => {
        return xTotal + currentX[X_ID]
     })
     const ySum = politikerUpdate.reduce((yTotal, currentY) => {
       return yTotal + currentY[Y_ID]
     })

     const myCoordinates = [xSum, ySum]
     console.log(myCoordinates)
     return [myCoordinates]
   }

  useEffect(() => {
    setPolitikerUpdate(politicians)
    const myCoordinates= calculateMyCircle()
    setMyCircle(myCoordinates)
  }, [politicians])

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
              animation: dropIn .5s ease forwards;
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
          {politikerUpdate.map((politician, i) => (
            <circle
              key={politician[SMARTMAP_ID_IDX]}
              cx={politician[X_ID] || 160}
              cy={politician[Y_ID] || 160}
              r='3'
              strokeWidth='1'
              stroke='#6B7280'
              fill={`#${politician[PARTYCOLOR_IDX]}`}
              style={{ animationDelay: `${100 * (i + 1)}ms` }}
            >
              <title>{`${politician[FIRSTNAME_IDX]} ${politician[LASTNAME_IDX]} | ${politician[PARTY_ABBREVIATION_ID]}`}</title>
            </circle>
          ))}
        </g>
        { <circle
          id='myCircle'
          cx={myCircle[0]}
          cy={myCircle[1]}
          r='5'
          strokeWidth='1'
          stroke='#DB2777'
          fill='#EC4899'
        /> }
      </svg>
    </div>
  )
}

export default SmarterMap
