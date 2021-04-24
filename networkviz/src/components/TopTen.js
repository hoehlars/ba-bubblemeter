import { useState } from 'react'

function TopTen({ topten }) {
  const [topTen] = useState(
    topten || [
      { name: 'Adam', in_degree: 870 },
      { name: 'Eva', in_degree: 850 },
      { name: 'Schlange', in_degree: 666 },
    ]
  )

  const topTenList = (
    <table className='w-full'>
      <thead>
        <tr>
          <th className='border py-1 text-left pl-2 text-pink-600 font-normal'>
            Rang
          </th>
          <th className='border py-1 text-left pl-2 text-pink-600 font-normal'>
            Name
          </th>
          <th className='border py-1 text-left pl-2 text-pink-600 font-normal'>
            Score
          </th>
        </tr>
      </thead>
      <tbody className='border  py-1 text-left pl-2'>
        {topTen.map((scorer, i) => {
          return (
            <tr className='border  py-1 text-left pl-2' key={scorer[0]}>
              <td className='border  py-1 text-left pl-2'>{i + 1}</td>
              <td className='border  py-1 text-left pl-2'>{scorer[0]}</td>
              <td className='border  py-1 text-left pl-2'>{scorer[3]}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )

  return topTenList
}

export default TopTen
