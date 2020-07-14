import React from 'react';

const HelloWorld = () => {
  return (
    <>
      <h1> ¡Hola mundo!</h1>
      <p>Bienvenido al curso de Next.js 2018</p>
      <img src='/static/platzi-logo.png' alt='Platzi'/>
      <style jsx>{`
        h1 {
          color: red;
        }
        :global(p) {
          color: green;
        }
        img {
          max-width: 20%;
          display: block;
          margin: 0 auto;
        }
      `}</style>
      <style jsxglobal>{`
        body {
          background: white;
        }
      `}</style>
    </>
  )
}

export default HelloWorld;