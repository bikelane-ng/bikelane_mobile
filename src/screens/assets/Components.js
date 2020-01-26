import React from 'react';
import Svg, {
    Path, Circle, Defs, ClipPath, Rect, G, Line, Text, TSpan,
} from "react-native-svg";
// import { Text } from 'react-native';
import { colors, fonts } from '../../constants/DefaultProps';

export const Menu = () => {
    return <Svg id="Menu" xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 52 52">
        <Circle id="Oval" cx="26" cy="26" r="26" fill={colors.default} />
        <Path id="Line" d="M.342,1H17.45" transform="translate(15 22.125)" fill="none" stroke="#fff" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2" />
        <Path id="Line_Copy" d="M.325,1H16.577" transform="translate(19.444 30.125)" fill="none" stroke="#fff" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2" />
    </Svg>
}

export const Call = () => {
    return <Svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 26 26">
        <G id="Group_16" data-name="Group 16" transform="translate(-254 -389)">
            <Circle id="Ellipse_3" data-name="Ellipse 3" cx="13" cy="13" r="13" transform="translate(254 389)" fill="#f2f2f2" />
            <G id="phone-2" transform="translate(261 393.586)">
                <Path id="Path_3" data-name="Path 3" d="M9.465,13.707A8.474,8.474,0,0,1,1,5.242a.173.173,0,0,1,.051-.122L2.656,3.515a.345.345,0,0,1,.489,0L5.319,5.69a.345.345,0,0,1,0,.489L3.835,7.661l3.211,3.211L8.529,9.389a.345.345,0,0,1,.489,0l2.174,2.174a.345.345,0,0,1,0,.489L9.586,13.657A.173.173,0,0,1,9.465,13.707Z" transform="translate(0 0)" fill="#111" />
            </G>
        </G>
    </Svg>
}

export const Briefcase = () => {
    return <Svg xmlns="http://www.w3.org/2000/svg" width="10.455" height="10" viewBox="0 0 10.455 10">
        <G id="briefcase-24" transform="translate(-1 -2)">
            <Path id="Path_61" data-name="Path 61" d="M8.909,34.455a.227.227,0,0,1-.227.227H6.864a.227.227,0,0,1-.227-.227V34H3v2.273a.454.454,0,0,0,.455.455h8.636a.454.454,0,0,0,.455-.455V34H8.909Z" transform="translate(-1.545 -24.727)" fill="#111" />
            <Path id="Path_62" data-name="Path 62" d="M11,10H1.455A.454.454,0,0,0,1,10.455v4.318A.227.227,0,0,0,1.227,15H5.091v-.455a.227.227,0,0,1,.227-.227H7.136a.227.227,0,0,1,.227.227V15h3.864a.227.227,0,0,0,.227-.227V10.455A.454.454,0,0,0,11,10Z" transform="translate(0 -6.182)" fill="#111" />
            <Path id="Path_63" data-name="Path 63" d="M16.455,2.455h2.727v.909h.455V2.227A.227.227,0,0,0,19.409,2H16.227A.227.227,0,0,0,16,2.227V3.364h.455Z" transform="translate(-11.591)" fill="#111" />
        </G>
    </Svg>
}

export const Home = () => {
    return <Svg xmlns="http://www.w3.org/2000/svg" width="10.588" height="9" viewBox="0 0 10.588 9">
        <G id="ic_home_48px" transform="translate(-4 -6)">
            <Path id="Path_60" data-name="Path 60" d="M8.235,15V11.824h2.118V15H13V10.765h1.588L9.294,6,4,10.765H5.588V15Z" transform="translate(0 0)" fill="#111" />
        </G>
    </Svg>
}

export const Heart = () => {
    return <Svg id="heart-2" xmlns="http://www.w3.org/2000/svg" width="9.676" height="8.57" viewBox="0 0 9.676 8.57">
        <Path id="Path_34" data-name="Path 34" d="M9.9,3.773a2.637,2.637,0,0,0-4.065.408A2.639,2.639,0,1,0,1.773,7.5L5.838,11.57,9.9,7.5A2.639,2.639,0,0,0,9.9,3.773Z" transform="translate(-1 -3)" fill="#efd303" />
    </Svg>
}

export const Ellipse = () => {
    return <Svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5">
        <G id="Ellipse_8" data-name="Ellipse 8" fill="#fff" stroke="#707070" strokeWidth="1">
            <Circle cx="2.5" cy="2.5" r="2.5" stroke="none" />
            <Circle cx="2.5" cy="2.5" r="2" fill="none" />
        </G>
    </Svg>
}


export const CheckCircle = () => {
    return <Svg xmlns="http://www.w3.org/2000/svg" width="46.688" height="45.117" viewBox="0 0 26.688 25.117">
        <G id="check-circle-07" transform="translate(-1 -3)">
            <Path id="Path_91" data-name="Path 91" d="M24.713,12.5a10.6,10.6,0,0,1,.4,3.063A11.559,11.559,0,1,1,13.559,4a11.3,11.3,0,0,1,6.068,1.734" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" stroke-width="2" />
            <Path id="Path_92" data-name="Path 92" d="M14,14.091l4.623,4.623L31.338,6" transform="translate(-5.065 -0.844)" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" />
        </G>
    </Svg>
}

export const SplashLogo = () => {
    return <Svg xmlns="http://www.w3.org/2000/svg" width="100" height="34" viewBox="0 0 100 34">
        <G id="Group_7" data-name="Group 7" transform="translate(-502 -399)">
            <Text id="Bikelane" transform="translate(502 426)" fontSize="26" fill={colors.white} fontFamily={fonts.medium} font-weight="500"><TSpan x="0" y="0">Bikelane</TSpan></Text>
            <Rect id="Rectangle_1" data-name="Rectangle 1" width="5" height="2" transform="translate(553 409)" fill="#fff700" />
            <Rect id="Rectangle_6" data-name="Rectangle 6" width="5" height="2" transform="translate(553 415)" fill="#fff700" />
            <Rect id="Rectangle_7" data-name="Rectangle 7" width="4" height="2" transform="translate(553 420)" fill="#fff700" />
        </G>
    </Svg>
}

export const Pickup = () => {
    return <Svg xmlns="http://www.w3.org/2000/svg" width="36" height="40.744" viewBox="0 0 36 40.744">
        <G id="Group_2874" data-name="Group 2874" transform="translate(-64 -176)">
            <G id="Group_2873" data-name="Group 2873">
                <Path id="Union_23" data-name="Union 23" d="M-1289.811,915.782A18,18,0,0,1-1305,898a18,18,0,0,1,18-18,18,18,0,0,1,18,18,18.006,18.006,0,0,1-14.662,17.691l-3.1,5.053Z" transform="translate(1369 -704)" />
            </G>
            <Path id="Union_24" data-name="Union 24" d="M-1246.334,841.905v-6.638c-.331-.048-.638-.072-.936-.138a4.261,4.261,0,0,1-3.354-4.176c-.005-1.347,0-2.694,0-4.041v-.218h2.146v.288q0,1.92,0,3.84a2.144,2.144,0,0,0,2.28,2.279q1.288,0,2.576,0,1.824,0,3.649,0a4.25,4.25,0,0,1,4.283,3.587,4.026,4.026,0,0,1,.06.7c.005,1.355,0,2.711,0,4.066,0,.057-.007.114-.013.188h-2.134v-.273c0-1.339.009-2.677,0-4.015a2.126,2.126,0,0,0-1.963-2.106c-.048,0-.1,0-.183,0v6.658Zm3.046-10.954a3.233,3.233,0,0,1-3.007-2.664,3.222,3.222,0,0,1,2.588-3.708,1.339,1.339,0,0,0,.162-.051h.8a7.942,7.942,0,0,1,1.063.354,3.185,3.185,0,0,1,1.658,3.67,3.207,3.207,0,0,1-3.132,2.4Z" transform="translate(1324.626 -639.529)" fill="#fff" stroke="rgba(0,0,0,0)" stroke-width="1" />
        </G>
    </Svg>
}

export const Dropoff = () => {
    return <Svg xmlns="http://www.w3.org/2000/svg" width="36" height="40.744" viewBox="0 0 36 40.744">
        <G id="Group_2875" data-name="Group 2875" transform="translate(-276 -96)">
            <Path id="Union_25" data-name="Union 25" d="M-1289.811,915.782A18,18,0,0,1-1305,898a18,18,0,0,1,18-18,18,18,0,0,1,18,18,18.006,18.006,0,0,1-14.662,17.691l-3.1,5.053Z" transform="translate(1581 -784)" fill="#9703fc" />
            <Text id="_" data-name="" transform="translate(294 122)" fill="#fff" font-size="22" font-family="LastResort, '.LastResort'"><TSpan x="-12.622" y="0"></TSpan></Text>
        </G>
    </Svg>
}