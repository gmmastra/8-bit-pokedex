import React, { useEffect } from "react";
import axios from "axios";
import { PkmnInfoCard } from "./components/PkmnInfoCard";

const App = () => {

  const [pkmnMap, setPkmnMap] = React.useState([]);
  const [position, setPosition] = React.useState(1);
  const [initialize, setInitialize] = React.useState(true);

  useEffect(() => {
    fetchPokemon();
    // eslint-disable-next-line
  }, [])

  const fetchPokemon = async () => {
    // array of promises (requests)
    const promiseChunk = [];
    const chunkSize = 50;
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
  }

  return (
    <div
    // onScroll={handleScroll}
    >
      {/* DISPLAY INFOCARDS */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '10px' }}>
        {pkmnMap.map((e) => {
          return <PkmnInfoCard key={e.id}
            id={e.id}
            name={e.name}
            types={e.types}
            sprite={e.sprites.versions["generation-viii"].icons.front_default} />;
        })}
      </div>
      <button onClick={fetchPokemon}>Load more</button>
    </div>
  );
}

export default App;