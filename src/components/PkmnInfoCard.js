import React from "react";
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
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

  const soundUrl = `https://veekun.com/dex/media/pokemon/cries/${props.id}.ogg`;

  const [play, { stop }] = useSound(
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
        <button key={props.id} value={props.name} onClick={handleClickOpen} style={{ cursor: 'pointer', padding: '0px', border: '0px', backgroundColor: 'initial' }}>
          {/* SPRITE */}
          <img
            src={props.sprite}
            alt={props.name}
            width="120px"
            loading="lazy"
          />
        </button>
        <div>
          {/* ID */}
          <span>#{(props.id).toString().padStart(3, '0')}</span>
          {/* NAME */}
          <p>{props.name}</p>
          {/* TYPE [1] */}
          {renderType(props.types[0].type.name)}
          {/* TYPE [2] */}
          {props.types.length === 2 ? renderType(props.types[1].type.name) : ''}
        </div>
      </div>

      {/* ENTRY POPUP */}
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        PaperProps={{ sx: { width: "75%", height: "90%", maxWidth: '100%', position: 'absolute', top: '6vh' } }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <PkmnEntry pkmn={props.name} />
      </Dialog>
    </div>
  );
}