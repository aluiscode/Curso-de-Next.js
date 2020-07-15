import React from 'react';
import Error from 'next/error';
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';

const HelloWorld = ({channels, statusCode}) => {
  if(statusCode !==200 ){
    return (<Error statusCode={statusCode}/>);
  }

  return (
    <Layout title='Podcast'>
      <ChannelGrid channels={channels}/>
    </Layout>
  )
}

HelloWorld.getInitialProps = async ({res}) => {
  try {
    const res = await fetch('https://api.audioboom.com/channels/recommended');
    const {body: channels} = await res.json()
    return { channels, statusCode:200 }
  } catch (error) {
    res.statusCode = 503;
    return {channels:[], statusCode:503}
  }
}


export default HelloWorld;