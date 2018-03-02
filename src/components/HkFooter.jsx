import React from 'react';

export const FooterContent = (props) => (
    <span className="page-footer-content">
        <b style={{ color: '#1890ff' }}>Has</b>
        <b style={{ color: '#1890ff' }}>kee </b>
        <b style={{ color: '#1890ff' }}> Ltd ©2017</b>
    </span>
)

export const HkFooter = (props) => (<div className="page-footer">
    <FooterContent />
</div>);