import React from 'react';
import Head from 'next/head';
import {MobileNav} from './MobileNav';

export default function Layout ({ children }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main className="bg-[#f1f1f1] min-h-screen">
        {children}
        <div className="sm:hidden">
          <MobileNav />
        </div>
      </main>
    </div>
  );
}