import React from 'react';
import PropTypes from 'prop-types';

export const HkLogoImg = (props) => (
    <img className={props.className || "page-logo-content"}
        src={"assets/img/logo" + (props.suffix ? "-" + props.suffix : "") + ".png"} alt="logo" />
);

HkLogoImg.propTypes = {
    suffix: PropTypes.oneOf(['invert', 'big', 'big-white', 'template-header']),
}

export const HkLogo = (props) => (
    <div className="page-logo">
        <HkLogoImg />
    </div>
);

export const HkLogoInvert = (props) => (
    <div className="page-logo">
        <HkLogoImg suffix="invert" />
    </div>
);

//blue-6
const LogoBlue = () => (
    <b style={{ color: '#1890ff' }}>Haskee</b>
);

const LogoWhite = (props) => (
    <div>
        <b style={{ color: '#ffffff' }}>Haskee</b>
        <b style={{ color: '#ffffff' }}>kee </b>
    </div>
);

const LogoBlackRed = () => (
    <div>
        <b style={{ color: '#000000' }}>Has</b>
        <b style={{ color: '#f5222d' }}>kee </b>
    </div>
);

//green-6,
const LogoBlackGreen = () => (
    <div>
        <b style={{ color: '#000000' }}>Has</b>
        <b style={{ color: '#52c41a' }}>kee </b>
    </div>
);

export const HkLogoText = (props) => {
    if (props.type === 'blue') return <LogoBlue />;
    else if (props.type === 'white') return <LogoWhite />;
    else if (props.type === 'blackgreen') return <LogoBlackGreen />;
    else
        return <LogoBlackRed />;
}

HkLogoText.propTypes = {
    type: PropTypes.oneOf(['blue', 'white', 'blackred', 'blackgreen']),
    addon: PropTypes.string
}
