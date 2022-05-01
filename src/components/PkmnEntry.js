import React, { useEffect } from "react";

export function PkmnEntry(props) {

  useEffect(() => {
    // eslint-disable-next-line
  }, [])

  return (
    <div className="entry-grid" style={{ textAlign: 'center', height: '100%' }}>
      <div style={{ display: 'flex', margin: '30px auto 10px auto', padding: '20px', width: '80%' }}>
        <div style={{ display: 'flex', flexBasis: '40%', justifyContent: 'center' }}>
          <img
            src={props.pkmn.sprites.versions["generation-v"]["black-white"].animated.front_default}
            alt={props.pkmn.name}
            style={{ zoom: 2, height: "fit-content", paddingTop: '10%' }}
            loading="lazy"
          />
        </div>
        <div style={{ fontSize: '25px' }}>
          <span className="outlined" style={{ marginRight: '25px' }}>{(props.pkmn.id).toString().padStart(3, '0')}</span>
          <span className="outlined">{props.pkmn.name}</span>
        </div>
      </div>
    </div>
  );
}