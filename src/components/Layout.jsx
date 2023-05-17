import React from 'react';
import Head from 'next/head';
import { MobileNav } from './MobileNav';

import { useContext } from 'react'
import { StylesContext } from '@/contexts/StylesContext';

export default function Layout ({ children }) {

  const { layout } = useContext(StylesContext);

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.svg" />
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