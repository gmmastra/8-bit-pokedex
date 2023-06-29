import React, { useEffect } from "react";
import { Box } from '@mui/material';
import pokeball from '../assets/img/entry_pokeball.png';

export function PkmnEntry(props) {

  useEffect(() => {
    // eslint-disable-next-line
  }, [])

  // creates type box
  function renderType(type) {
    return <span className="type-box pixel-corners" style={{ backgroundColor: `${props.colors[type]}`, padding: '0 10px 0 13px' }}>
      {type}
    </span>
  }

  // gets first english translation of flavor text
  function filterTextLang(texts) {
    for (var i = 0; i < texts.length; i++) {
      if (texts[i].language.name === 'en')
        return texts[i].flavor_text;
    }
    return 'Flavor text not found.';
  }

  return (
    <div className="entry-grid" style={{ textAlign: 'center', height: '100%', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', margin: '30px auto 10px auto', padding: '20px', width: { xs: '100%', sm: '100%', md: '80%' }, flexWrap: 'wrap' }}>

        {/* SPRITE */}
        <Box sx={{ display: 'flex', justifyContent: 'center', maxWidth: '40%' }}>
          <img
            src={props.pkmn.sprites.versions["generation-v"]["black-white"].animated.front_default}
            alt={props.pkmn.name}
            style={{ zoom: 2, height: '40vw', paddingTop: '10%', maxHeight: '200px' }}
            loading="lazy"
          />
        </Box>

        {/* RIGHT COLUMN */}
        <Box sx={{ width: { xs: '50%', sm: '50%', md: '60%' }, fontSize: '30px' }}>

          {/* NAME BOX */}
          <div className="pixel-corners" style={{ height: '72px', textTransform: 'capitalize' }}>
            {/* ID# Name */}
            <div style={{ textAlign: "left", backgroundColor: "#e83030", whiteSpace: 'nowrap', overflow: 'hidden' }}>
              <img src={pokeball} alt="pokeball" style={{ margin: "-8px 7px 0 3px", verticalAlign: "middle" }} />
              <span className="shadowed-black" style={{ marginRight: '10px' }}>{(props.pkmn.id).toString().padStart(3, '0')}</span>
              <span className="shadowed-black"> {props.pkmn.name}</span>
            </div>
            {/* Title */}
            <div className="entry-box" style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
              <span className="shadowed" style={{ marginRight: '15px' }}>{props.extra.genera[7].genus}</span>
            </div>
          </div>
          <div className="pixel-shadow" style={{ height: '72px', marginRight: "-10px", marginTop: "-60px" }} />


          <div style={{ display: "flex", justifyContent: "space-between" }}>

            {/* FOOTPRINT BOX */}
            <div>
              <div className="pixel-corners" style={{ height: "80px", width: "80px", marginTop: "15px", backgroundColor: "white" }}>
                <div style={{ height: '10px', backgroundColor: "#e83030" }} />
                <div className="entry-box" style={{ height: '70px', display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={`https://veekun.com/dex/media/pokemon/footprints/${props.pkmn.id}.png`} alt="footprint" style={{ height: "50px" }} />
                </div>
              </div>
              <div className="pixel-shadow" style={{ height: '80px', width: "80px", marginLeft: "8px", marginTop: "-70px" }} />
            </div>

            {/* TYPE BOX(ES) */}
            <div style={{ marginTop: "15px", display: 'flex', flexWrap: 'wrap', height: 'fit-content', justifyContent: 'right', flexBasis: "70%" }}>
              {/* TYPE [1] */}
              {renderType(props.pkmn.types[0].type.name)}
              {/* TYPE [2] (if applicable) */}
              {props.pkmn.types.length === 2 ? renderType(props.pkmn.types[1].type.name) : ''}
            </div>

          </div>

          {/* HEIGHT/WEIGHT */}
          <Box className="pixel-corners" sx={{ height: '72px', marginTop: { xs: '10px', sm: '10px', md: '-30px' }, float: 'right', width: { xs: '100%', sm: '100%', md: '70%' } }}>
            <div className='height-weight-box' style={{ borderBottom: '4px dotted black' }}>
              <span style={{ float: 'left' }}>HT</span>
              <span>{props.pkmn.height / 10} m</span>
            </div>
            <div className='height-weight-box'>
              <span style={{ float: 'left' }}>WT</span>
              <span style={{ float: 'right' }}>{props.pkmn.weight / 10} kg</span>
            </div>
          </Box>
          <Box className="pixel-shadow" sx={{ height: '72px', width: { xs: '100%', sm: '100%', md: '70%' }, marginRight: "-10px", marginTop: "-60px", float: 'right' }} />
        </Box>

        {/* FLAVOR TEXT */}
        <Box className='pixel-corners' sx={{ height: 'fit-content', width: { xs: '90%', sm: '90%', md: '100%' }, marginTop: '30px', backgroundColor: '#eb2e30' }}>
          <div className='flavor-box' style={{ textTransform: 'none', fontSize: '30px', textAlign: 'left' }}>
            <div style={{ padding: '10px' }}>
              {filterTextLang(props.extra.flavor_text_entries).replace(/[\s\n]+/g, " ")}
            </div>
          </div>
        </Box>

      </Box>
    </div>
  );
}