import React, { useEffect } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import { PkmnInfoCard } from "./PkmnInfoCard";
import useSound from 'use-sound';
import plinkSfx from '../assets/plink.mp3';
import openSfx from '../assets/open.mp3';
import Loading from "../assets/loading.gif";

export function PkmnList(props) {

  const [pkmnMap, setPkmnMap] = React.useState([]);
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

    // array of promises (requests)
    for (let i = position; i < position + chunkSize; i++) {
      promiseChunk.push(
        axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
          .then(({ data }) => (data))
      );
    }
    // wait to execute in parallel
    const temp = await axios.all(promiseChunk);
    if (initialize) {
      setPkmnMap(temp);
      setInitialize(false);
    } else {
      setPkmnMap((prevState) => [
        ...prevState,
        ...temp,
      ]);
    }
    setPosition(position + chunkSize);
    setLoading(false);
  }

  // Fetch next chunk when near bottom of page
  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop < e.target.clientHeight + 10;
    if (bottom) {
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

  return (
    <>
      {/* OPENING PANELS */}
      <div className={open ? 'open-right curtain__panel curtain__panel--right' : 'curtain__panel curtain__panel--right'}
        onClick={handleClickOpen} />
      <div className={open ? 'open-left curtain__panel curtain__panel--left' : 'curtain__panel curtain__panel--left'}
        onClick={handleClickOpen} />
      <div style={{ textAlign: 'center' }}>

        {/* DISPLAY INFOCARDS */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}>
          <Box className="info-card-wrapper" sx={{ gridTemplateColumns: { sm: 'repeat(auto-fit, minmax(7.5rem, 1fr))' } }} onScroll={handleScroll} >
            {pkmnMap.map((e) => {
              return <PkmnInfoCard key={e.id}
                id={e.id}
                name={e.name}
                types={e.types}
                sprite={e.sprites.versions["generation-viii"].icons.front_default} />;
            })}
          </Box>
        </div>

        {/* LOADING BAR */}
        {loading && <img style={{ height: '50px' }} src={Loading} alt="loading..." />}
      </div>
    </>
  );
}