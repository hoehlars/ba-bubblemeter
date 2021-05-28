import { useEffect, useState } from 'react'

function TopTen({ topten = [] }) {
  const topTenList = (
    <table className='w-full mb-2'>
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
        {topten.map((scorer, i) => {
          return (
            <tr className='border  py-1 text-left pl-2' key={scorer[0]}>
              <td className='border  py-1 text-left pl-2'>{i + 1}</td>
              <td className='border  py-1 text-left pl-2'>{scorer[0]}</td>
              <td className='border  py-1 text-left pl-2'>
                {scorer[3] || scorer[1]}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )

  return topTenList
}

export default TopTen
