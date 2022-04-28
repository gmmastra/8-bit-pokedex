import React, { useEffect } from "react";

export function PkmnEntry(props) {

  useEffect(() => {
    // eslint-disable-next-line
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Pokedex</h1>
      <p>{props.pkmn}</p>
    </div>
  );
}