
"use client";

import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {

  const inputText = ""

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

    const response = fetch("/api", requestOptions)

    const data = (await response).json();
    console.log("Data: ", data)


  } catch (error) {
    
  }
}

  sendRequest();


  return (
    <main className={styles.main}>
      <p>HIII</p>
    </main>
  )
}
