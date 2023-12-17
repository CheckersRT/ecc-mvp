
"use client";

import Image from 'next/image'
import styles from './page.module.css'
import { useEffect, useState } from 'react';

export default function Home() {

  const [result, setResult] = useState("")

  const inputText = `6
  3
  9
  12
  Bbmaj7
  F
  Moderately slow
  mf
  24
  F
  dip
  Fmaj7
  Am7
  bet your bot - tom dol- lar
  Bbmaj7/F
  that
  dip
  to
  -
  TOMORROW
  Words by Martin Charnin
  Music by Charles Strouse
  Fmaj7
  SS
  Dm
  morrow.
  Gm7add4
  Bbmaj7/F
  dip
  Dm/C
  q
  there'll be
  F
  The sun-'ll come out.
  Bbmaj7
  sun!
  toto
  Chappell Morris Ltd and Warner/Chappell North America Ltd
  1978 Edwin H Morris & Co Inc and Charles Strouse Publishing administered by WB Music Corp
  All Rights Reserved.
  Gm7add4
  C
  Fmaj7`

async function sendRequest() {

  try {
    var requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({
        "text": inputText
      }),
      cache: "no-cache"
    }

    console.log("requestOptions ", requestOptions)

    const response = await fetch("/api", requestOptions)
    console.log(response)

    const data = await response.json();
    console.log("Data: ", data)

    const result = await data.output
    console.log("result: ", result)

    setResult(result)


  } catch (error) {
    console.log("Error in console", error)
  }
}

useEffect(() => {
  sendRequest()
})


  return (
    <main className={styles.main}>
      <p>{result}</p>
    </main>
  )
}
