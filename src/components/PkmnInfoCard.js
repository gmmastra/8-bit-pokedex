import React from "react";
import { Dialog, Toolbar, Slide } from '@mui/material';
import useSound from 'use-sound';
import { PkmnEntry } from "./PkmnEntry";

// Custom dialog transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function PkmnInfoCard(props) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    play();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const soundUrl = `https://veekun.com/dex/media/pokemon/cries/${props.pkmn.id}.ogg`;

  const [play] = useSound(
    soundUrl,
    { volume: 0.1 } // my ears...
  );

  const TYPE_COLORS = {
    bug: "#ab2",
    dark: "#754",
    dragon: "#76e",
    electric: "#fc3",
    fairy: "#e9e",
    fighting: "#b54",
    fire: "#f42",
    flying: "#89f",
    ghost: "#66b",
    grass: "#7c5",
    ground: "#db5",
    ice: "#6cf",
    normal: "#aa9",
    poison: "#a59",
    psychic: "#f59",
    rock: "#ba6",
    steel: "#aab",
    water: "#39f",
  };

  function renderType(type) {
    return <span className="type-box" style={{ backgroundColor: `${TYPE_COLORS[type]}` }}>
      {type}
    </span>
  }

  return (
    <div>

      <div style={{ textAlign: 'center', width: '120px' }}>
        <button key={props.pkmn.id} value={props.pkmn.name} onClick={handleClickOpen} style={{ cursor: 'pointer', padding: '0px', border: '0px', backgroundColor: 'initial' }}>
          {/* SPRITE */}
          <img
            src={props.pkmn.sprites.versions["generation-viii"].icons.front_default}
            alt={props.pkmn.name}
            width="120px"
            loading="lazy"
          />
        </button>
        <div>
          {/* ID */}
          <span>#{(props.pkmn.id).toString().padStart(3, '0')}</span>
          {/* NAME */}
          <p>{props.pkmn.name}</p>
          {/* TYPE [1] */}
          {renderType(props.pkmn.types[0].type.name)}
          {/* TYPE [2] */}
          {props.pkmn.types.length === 2 ? renderType(props.pkmn.types[1].type.name) : ''}
        </div>
      </div>

      {/* ENTRY POPUP */}
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        fullScreen
        PaperProps={{ sx: { height: '100%', maxWidth: {xs: '100%', sm: '100%', md: '65%'}, position: 'absolute', top: '6vh' } }}
      >
        {/* Toolbar handled outside the entry to close the dialog */}
        <Toolbar className="entry-toolbar-outer" style={{ minHeight: '35px' }} onClick={handleClose}>
          <div className="entry-toolbar-inner">
            <span className="outlined" style={{ fontSize: '15px', paddingRight: '6px', paddingLeft: '10px' }} >▼</span>
            <span className="outlined" style={{ fontSize: '25px' }}>Info</span>
          </div>
        </Toolbar>
        <PkmnEntry pkmn={props.pkmn} />
      </Dialog>
    </div>
  );
}