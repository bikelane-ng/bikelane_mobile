import React from 'react';
import Svg, {
    Path, Circle, Defs, ClipPath, Rect, G, Line,
} from "react-native-svg";
import { Text } from 'react-native';

export const Menu = () => {
    return <Svg id="Menu" xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 52 52">
        <Circle id="Oval" cx="26" cy="26" r="26" fill="#EFD303" />
        <Path id="Line" d="M.342,1H17.45" transform="translate(15 22.125)" fill="none" stroke="#fff" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2" />
        <Path id="Line_Copy" d="M.325,1H16.577" transform="translate(19.444 30.125)" fill="none" stroke="#fff" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2" />
    </Svg>
}

export const Call = () => {
    return <Svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
        <G id="Group_16" data-name="Group 16" transform="translate(-254 -389)">
            <Circle id="Ellipse_3" data-name="Ellipse 3" cx="13" cy="13" r="13" transform="translate(254 389)" fill="#f2f2f2" />
            <G id="phone-2" transform="translate(261 393.586)">
                <Path id="Path_3" data-name="Path 3" d="M9.465,13.707A8.474,8.474,0,0,1,1,5.242a.173.173,0,0,1,.051-.122L2.656,3.515a.345.345,0,0,1,.489,0L5.319,5.69a.345.345,0,0,1,0,.489L3.835,7.661l3.211,3.211L8.529,9.389a.345.345,0,0,1,.489,0l2.174,2.174a.345.345,0,0,1,0,.489L9.586,13.657A.173.173,0,0,1,9.465,13.707Z" transform="translate(0 0)" fill="#111" />
            </G>
        </G>
    </Svg>
}