import React from 'react';
import Svg, {
    Path, Circle, Defs, ClipPath, Rect, G, Line,
} from "react-native-svg";
import { Text } from 'react-native';

export const Menu = () => {
    return <Svg id="Menu" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 52 52">
        <Circle id="Oval" cx="26" cy="26" r="26" fill="#F58788" />
        <Path id="Line" d="M.342,1H17.45" transform="translate(15 22.125)" fill="none" stroke="#fff" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2" />
        <Path id="Line_Copy" d="M.325,1H16.577" transform="translate(19.444 30.125)" fill="none" stroke="#fff" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2" />
    </Svg>
}