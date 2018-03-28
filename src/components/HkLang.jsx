import React from 'react';
import { Dropdown, Menu, Icon } from 'antd';
import locale from 'locale';

const supportedLangs = [{ key: 'en', title: 'EN' }, { key: 'tr', title: 'TR' }]

const LangMenu = (props) => (
    <Menu theme="dark" mode="inline" onClick={(e) => {locale.setLanguage(e.key)}}>
        {supportedLangs.map((lang, i) => (<Menu.Item key={lang.key}><span>{lang.title}</span></Menu.Item>))}
    </Menu>
)

const HkLang = () => {
    const lang = locale.getLanguage();
    return <Dropdown overlay={<LangMenu />}>
        <span style={{ color: '#1890ff', fontWeight: 'bold' }}>
            {lang && lang.toUpperCase()} <Icon type="down" />
        </span>
    </Dropdown>;
}

export default HkLang;