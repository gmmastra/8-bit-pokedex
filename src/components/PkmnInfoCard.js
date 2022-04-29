import React from "react";
import Dialog from '@mui/material/Dialog';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { PkmnEntry } from "./PkmnEntry";

// Custom dialog transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function PkmnInfoCard(props) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function renderType(type) {
    switch (type) {
      case 'fire':
        return <span className="type-box" style={{ backgroundColor: '#f42' }}>
          {type}
        </span>
      case 'water':
        return <span className="type-box" style={{ backgroundColor: '#39f' }}>
          {type}
        </span>
      case 'electric':
        return <span className="type-box" style={{ backgroundColor: '#fc3' }}>
          {type}
        </span>
      case 'grass':
        return <span className="type-box" style={{ backgroundColor: '#7c5' }}>
          {type}
        </span>
      case 'ice':
        return <span className="type-box" style={{ backgroundColor: '#6cf' }}>
          {type}
        </span>
      case 'fighting':
        return <span className="type-box" style={{ backgroundColor: '#b54' }}>
          {type}
        </span>
      case 'poison':
        return <span className="type-box" style={{ backgroundColor: '#a59' }}>
          {type}
        </span>
      case 'ground':
        return <span className="type-box" style={{ backgroundColor: '#db5' }}>
          {type}
        </span>
      case 'flying':
        return <span className="type-box" style={{ backgroundColor: '#89f' }}>
          {type}
        </span>
      case 'psychic':
        return <span className="type-box" style={{ backgroundColor: '#f59' }}>
          {type}
        </span>
      case 'bug':
        return <span className="type-box" style={{ backgroundColor: '#ab2' }}>
          {type}
        </span>
      case 'rock':
        return <span className="type-box" style={{ backgroundColor: '#ba6' }}>
          {type}
        </span>
      case 'ghost':
        return <span className="type-box" style={{ backgroundColor: '#66b' }}>
          {type}
        </span>
      case 'dragon':
        return <span className="type-box" style={{ backgroundColor: '#76e' }}>
          {type}
        </span>
      case 'dark':
        return <span className="type-box" style={{ backgroundColor: '#754' }}>
          {type}
        </span>
      case 'steel':
        return <span className="type-box" style={{ backgroundColor: '#aab' }}>
          {type}
        </span>
      case 'fairy':
        return <span className="type-box" style={{ backgroundColor: '#e9e' }}>
          {type}
        </span>
      default:
        return <span className="type-box" style={{ backgroundColor: '#aa9' }}>
          {type}
        </span>
    }
  }

  return (
    <div>

      <div style={{ textAlign: 'center', width: '136px' }}>
        <button key={props.id} value={props.name} onClick={handleClickOpen} style={{ cursor: 'pointer', padding: '0px', border: '0px', backgroundColor: 'initial' }}>
          {/* SPRITE */}
          <img
            src={props.sprite}
            alt={props.name}
            width="136px"
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
        PaperProps={{ sx: { width: "75%", height: "90%", maxWidth: '100%', position:'absolute', top: '6vh' } }}
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