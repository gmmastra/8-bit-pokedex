import React from "react";
import useSound from 'use-sound';
import plinkSfx from '../assets/plink.mp3';
import openSfx from '../assets/open.mp3';

export function Home() {

    const [open, setOpen] = React.useState(false);

    const [playPlink] = useSound(
        plinkSfx,
        { volume: 1.5 }
    );

    const [playOpen] = useSound(
        openSfx,
        { volume: 1 }
    );

    const handleClickOpen = () => {
        playPlink();
        playOpen();
        setOpen(true);
    };

    return (
        <div>
            <div className={open ? 'open-right curtain__panel curtain__panel--right' : 'curtain__panel curtain__panel--right'}
                onClick={handleClickOpen} />
            <div className={open ? 'open-left curtain__panel curtain__panel--left' : 'curtain__panel curtain__panel--left'}
                onClick={handleClickOpen} />

            <h1 style={{ zIndex: 6 }}>Pokedex</h1>
        </div>
    );
}