export default function Intro({ score, user }) {
  const sizeValue = (size) => {
    if (size < 30000) {
      return 'eher klein'
    } else if (size < 70000) {
      return 'durchschnittlich gross'
    } else {
      return 'eher gross'
    }
  }
  const scoreValue = (score) => {
    if (score < 0.3) {
      return 'eher unpolitisch'
    } else if (score < 0.4) {
      return 'durchschnittlich politisch'
    } else {
      return 'eher politisch'
    }
  }
  return (
    <article>
      <p className='prose max-w-prose'>
        Das Twitter Netzwerk von {user?.twitterName} erstreckt sich über{' '}
        {score.size_of_whole_network} Knoten. Damit ist es im Vergleich zu den
        anderen von uns analysierten Netzwerken{' '}
        <span className='text-pink-600 font-medium'>
          {sizeValue(score.size_of_whole_network)}
        </span>
        .
        <br />
        Von den {score.amount_of_politicians_in_db} in unserem Netzwerk
        erfassten politisch aktivsten CH-Twitter Nutzer*innen finden sich{' '}
        {score.amount_of_politicians_in_network} in {user.twitterName}s
        Netzwerk. Damit ist es im Vergleich zu den anderen von uns analysierten
        Netzwerken{' '}
        <span className='text-pink-600 font-medium'>
          {scoreValue(score.polit_score)}
        </span>
        .
      </p>
    </article>
  )
}
