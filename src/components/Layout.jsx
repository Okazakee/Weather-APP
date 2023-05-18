import { useContext } from 'react'
import Head from 'next/head';

import { MobileNav } from './MobileNav';

import { StylesContext } from '@/contexts/StylesContext';

export default function Layout ({ children }) {

  // Import Layout styles from context
  const { layout } = useContext(StylesContext);

  return (
    <div>
      <Head>
        {/* <link rel="icon" href="/favicon.svg" /> */}
      </Head>
      <main className={layout.root}>
        {children}
        <div className={layout.navbar}>
          <MobileNav />
        </div>
      </main>
    </div>
  );
}