import React from 'react';
import Error from 'next/error';

const Channel = ( {channel, audioClips, series, statusCode} ) => {
  if(statusCode !==200 ){
    return (<Error statusCode={statusCode}/>);
  }

  return (
      <>
        <header>Podcasts</header>

        <h1>{channel.title}</h1>

        <h2>Series</h2>
        {audioClips.map((clip) => (
          <div key={clip.id}>
            {clip.title}
          </div>
        ))}

        <h2>Utimos Podcast</h2>
        {series.map((serie) => (
          <div key={serie.id}>
            {serie.title}
          </div>
        ))}

        <style jsx>{`
          header {
            color: #fff;
            background: #8756ca;
            padding: 15px;
            text-align: center;
          }
          .channels {
            display: grid;
            grid-gap: 15px;
            padding: 15px;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          }
          .channel {
          display: block;
            border-radius: 3px;
            box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
            margin-bottom: 0.5em;
          }
          .channel img {
            width: 100%;
          }
          h1{
            font-weight: 600;
            padding: 15px
          }
          .channel h2 {
            padding: 5px;
            font-size: 0.9em;
            font-weight: 600;
            margin: 0;
            text-align: center;
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
  );
};

Channel.getInitialProps = async ({ res, query }) => {
  const idChannel = query.id;

  try {
    const [reqChannel, reqAudio, reqSeries] = await Promise.all([
      fetch(`https://api.audioboom.com/channels/${idChannel}`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`),
      fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
    ])

    if(reqChannel.status >= 400){
      res.statusCode = reqChannel.status;
      return { channel: [], audioClips: [], series: [], statusCode: reqChannel.status}
    }

    const dataChannel = await reqChannel.json();
    const channel = dataChannel.body.channel;

    const dataAudios = await reqAudio.json();
    const audioClips = dataAudios.body.audio_clips;

    const dataSeries = await reqSeries.json();
    const series = dataSeries.body.channels;

    return { channel, audioClips, series, statusCode:200}
  } catch (error) {
    res.statusCode = 503;
    return { channel: [], audioClips: [], series: [], statusCode:503}
  }
}

export default Channel;
