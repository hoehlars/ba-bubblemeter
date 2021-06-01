import { useState } from 'react'
import { featuredCollections } from '../featuredcollections.json'
import Accordeon from './Accordeon'

export default function FeaturedCollections() {
  const [featured] = useState({
    featuredMedia: featuredCollections[0],
    featuredPoliticians: featuredCollections[1],
    featuredCelebrities: featuredCollections[2],
    featuredZHAW: featuredCollections[3],
  })
  return (
    <section>
      <ul>
        <li>
          <Accordeon feature={featured.featuredMedia} />
        </li>
        <li>
          <Accordeon feature={featured.featuredPoliticians} />
        </li>
        <li>
          <Accordeon feature={featured.featuredCelebrities} />
        </li>
        <li>
          <Accordeon feature={featured.featuredZHAW} />
        </li>
      </ul>
    </section>
  )
}
