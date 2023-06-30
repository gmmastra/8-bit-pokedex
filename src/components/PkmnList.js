import React, { useEffect } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import { PkmnEntryMini } from "./PkmnEntryMini";
import useSound from 'use-sound';
import plinkSfx from '../assets/sfx/plink.mp3';
import openSfx from '../assets/sfx/open.mp3';
import Loading from "../assets/img/loading.gif";
import dexOpen from '../assets/img/dex_open.png';

export function PkmnList(props) {

  // general pokemon data
  const [pkmnMap, setPkmnMap] = React.useState([]);
  // extra pokemon entry data (titles, flavor text, etc.)
  const [pkmnExtra, setPkmnExtra] = React.useState([]);
  // holds current id position (loads dynamically)
  const [position, setPosition] = React.useState(1);
  const [initialize, setInitialize] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    fetchPokemon();
    // eslint-disable-next-line
  }, [])

  // Axios GET response from pokeapi
  const fetchPokemon = async () => {
    setLoading(true);
    var chunkSize;
    initialize ? chunkSize = 75 : chunkSize = 25;
    const promiseChunk = [];
    const extraChunk = [];

    // array of requests
    for (let i = position; i < position + chunkSize; i++) {
      promiseChunk.push(
        axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
          .then(({ data }) => (data))
      );
      extraChunk.push(
        axios.get(`https://pokeapi.co/api/v2/pokemon-species/${i}`)
          .then(({ data }) => (data))
      );
    }
    // wait to execute in parallel
    const temp = await axios.all(promiseChunk);
    const tempExtra = await axios.all(extraChunk);
    if (initialize) {
      setPkmnMap(temp);
      setPkmnExtra(tempExtra);
      setInitialize(false);
    } else {
      setPkmnMap((prevState) => [
        ...prevState,
        ...temp,
      ]);
      setPkmnExtra((prevState) => [
        ...prevState,
        ...tempExtra,
      ]);
    }
    setPosition(position + chunkSize);
    setLoading(false);
  }

  // Fetch next chunk when near bottom of page
  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop < e.target.clientHeight + 1;
    if (bottom && !loading) {
      fetchPokemon();
    }
  }

  // Handle opening animation/sfx
  const [open, setOpen] = React.useState(false);

  const [playPlink] = useSound(plinkSfx, { volume: 1.5 });

  const [playOpen] = useSound(openSfx, { volume: 1 });

  const handleClickOpen = () => {
    playPlink();
    playOpen();
    setOpen(true);
  };

  // Optionally press space/enter to enter
  document.addEventListener('keyup', event => {
    if (event.code === 'Space' || event.code === 'Enter') {
      handleClickOpen();
    }
  })

  return (
    <>
      {/* OPENING PANELS */}
      <div className={open ? 'open-right curtain__panel curtain__panel--right' : 'curtain__panel curtain__panel--right'}
        onClick={handleClickOpen} style={{ display: 'flex', alignItems: 'center' }}>
        {/* front panel corner */}
        <Box sx={{ width: '300px', alignSelf: 'flex-start', margin: '-10px' }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.2 -0.2 10 6.4">
            <path d="M0 0 0 4 6 4 10 0" fill='#951021' />
          </svg>
        </Box>
        <img src={dexOpen} alt='click to open' height='fit-content' style={{ margin: '-15% 0 0 -250px' }} />
      </div>
      {/* back panel */}
      <div className={open ? 'open-left curtain__panel curtain__panel--left' : 'curtain__panel curtain__panel--left'}
        onClick={handleClickOpen}>
        {/* large power indicator */}
        <div className='power-indicators' style={{ backgroundColor: '#629dd7', width: '120px', height: '120px', margin: '30px', border: '10px solid white' }} />
        {/* small power indicators */}
        <div style={{ display: 'flex' }}>
          <div className='power-indicators' style={{ backgroundColor: '#b62e2e' }} />
          <div className='power-indicators' style={{ backgroundColor: '#f6fa4d' }} />
          <div className='power-indicators' style={{ backgroundColor: '#5cbe75' }} />
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>

        {/* DISPLAY INFOCARDS */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }} >
          <Box className="info-card-wrapper" sx={{ maxHeight: "85%", gridTemplateColumns: { sm: 'repeat(auto-fit, minmax(7.5rem, 1fr))' } }} onScroll={handleScroll} >
            {pkmnMap.map((e) => {
              return <PkmnEntryMini key={e.id} pkmn={e} extra={pkmnExtra[e.id - 1]} />;
            })}
          </Box>
        </div>

        {/* LOADING BAR */}
        {loading && <img style={{ height: '50px' }} src={Loading} alt="loading..." />}
      </div>
      <div className="halftone" />
      <div className="bg-logo" />
    </>
  );
}