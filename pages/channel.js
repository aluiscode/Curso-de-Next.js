import React from 'react';

const Channel = ( {channel, audioClips, series} ) => {
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

Channel.getInitialProps = async ({ query }) => {
  const idChannel = query.id;

  const reqChannel = await fetch(`https://api.audioboom.com/channels/${idChannel}`);
  const dataChannel = await reqChannel.json();
  const channel = dataChannel.body.channel;

  const reqAudio= await fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
  const dataAudios = await reqAudio.json();
  const audioClips = dataAudios.body.audio_clips;

  const reqSeries= await fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`)
  const dataSeries = await reqSeries.json();
  const series = dataSeries.body.channels;
  console.log(series)
  return { channel, audioClips, series }
}

export default Channel;
