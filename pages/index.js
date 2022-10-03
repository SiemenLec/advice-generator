import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home({ data }) {
  const [advice, setAdvice] = useState(data);

  const getAdvice = async () => {
    const req = await fetch(`https://api.adviceslip.com/advice`);
    const newData = await req.json();

    return setAdvice(newData);
  };

  return (
    <div>
      <Head>
        <title>Frontend Mentor | Advice generator app</title>
        <meta name="description" content="Advice generator by Siemen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.container}>
          <h2 className={styles.adviceNum}>ADVICE #{advice.slip.id}</h2>
          <h1 className={styles.quote}>&quot;{advice.slip.advice}&quot;</h1>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.divider}
            src="./images/pattern-divider-mobile.svg"
            alt="divider"
          />
          <button onClick={getAdvice} className={styles.button}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="./images/icon-dice.svg" alt="dice" />
          </button>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`https://api.adviceslip.com/advice`);
  const data = await res.json();
  return {
    props: { data }, // will be passed to the page component as props
  };
}
