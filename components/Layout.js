import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

const Layout = ({children, title}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <header><Link href='/'><a>Podcasts</a></Link></header>
      {children}
      <style jsx>{`
        header {
          color: #fff;
          background: #8756ca;
          padding: 15px;
          text-align: center;
        }
        header a{
          color:#fff;
          text-decoration: none;
        }
      `}</style>
      <style jsxglobal='true'>{`
        body {
          margin: 0;
          font-family: system-ui;
          background: white;
        }
      `}</style>
    </>
  )
}

export default Layout;
