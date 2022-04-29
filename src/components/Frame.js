import React from "react";
import Box from '@mui/material/Box';

export function Frame(props) {

    function renderTopBezel(color, shadow) {
        return (<Box sx={{
            width: '70vw',
            position: 'absolute',
            left: '-1vh',
            top: shadow ? { xs: '7.3vh', sm: '7.3vh', md: '1.8vh' } : { xs: '6.5vh', sm: '6.5vh', md: '1vh' },
            zIndex: shadow ? -1 : 0
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.2 -0.2 81.4 6.4">
                <path d="M 0 0 L 0 6 L 73 6 L 81 0" fill={color} />
            </svg>
        </Box>);
    }

    function renderBottomBezel(color, shadow) {
        return (<Box sx={{
            width: '35vw',
            position: 'absolute',
            bottom: shadow ? { xs: '0.6vh', sm: '0.6vh', md: '-1.4vh' } : { xs: '0vh', sm: '0vh', md: '-2vh' },
            right: shadow ? '0.3vw' : 0,
            zIndex: shadow ? -1 : 0
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -6 65 6">
                <path d="M 0 0 L 5 -6 L 65 -6 L 65 0" fill={color} />
            </svg>
        </Box>);
    }

    return (
        <>
            {renderTopBezel('#f42', false)}
            {renderTopBezel('#1b51c5', true)}

            {renderBottomBezel('#f42', false)}
            {renderBottomBezel('#1b51c5', true)}
        </>
    );
}