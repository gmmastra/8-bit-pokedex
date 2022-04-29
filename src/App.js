import React, { useEffect } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import { PkmnInfoCard } from "./components/PkmnInfoCard";
import Loading from "./assets/loading.gif";

const App = () => {

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

  // Fetch when near bottom of page
  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop < e.target.clientHeight + 10;
    if (bottom) {
      fetchPokemon();
    }
  }

  return (
    <div style={{ textAlign: 'center' }}>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}>
        {/* DISPLAY INFOCARDS */}
        <Box className="info-card-wrapper" sx={{ gridTemplateColumns: { sm: 'repeat(auto-fit, minmax(8rem, 1fr))' } }} onScroll={handleScroll} >
          {pkmnMap.map((e) => {
            return <PkmnInfoCard key={e.id}
              id={e.id}
              name={e.name}
              types={e.types}
              sprite={e.sprites.versions["generation-viii"].icons.front_default} />;
          })}
        </Box>
      </div>

      {loading && <img style={{ height: '50px', opacity: '.5' }} src={Loading} alt="loading..." />}

    </div>
  );
}

export default App;