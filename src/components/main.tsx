import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

function makeFetchCall () {
  fetch(process.env.PLASMO_PUBLIC_SERVER_PATH + '/api/call').then(res =>
    console.log(res)
  )
}

export function Main ({ name = 'Extension' }) {
  const [data, setData] = useState('')

  // useEffect(() => {
  //   makeFetchCall()
  // }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 16
      }}
    >
      ship
      {process.env.NEXT_PUBLIC_SHIP_NAME}
      {process.env.PLASMO_PUBLIC_SHIP_NAME}
      <Link href='/client'> Client Page</Link>
      <Link href='/'> Dashboard Page</Link>
      <h1>
        Welcome to your <a href='https://www.plasmo.com'>Plasmo</a> {name}!
      </h1>
      <input onChange={e => setData(e.target.value)} value={data} />
      <a href='https://docs.plasmo.com'>READ THE DOCS!</a>
    </div>
  )
}
