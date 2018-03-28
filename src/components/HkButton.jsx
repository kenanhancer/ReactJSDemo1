import React from 'react';
import { Button, Dropdown } from 'antd';
import HkMenu from 'components/HkMenu.jsx';
import locale from 'locale';

const buttonStyle = { fontWeight: 'bold', marginRight: 2 }
const boldStyle = { fontWeight: 'bold' };

export const HkNewButton = (props) => (
    <Button type='primary' icon='plus' size='default' style={buttonStyle} disabled={props.disabled} onClick={props.onClick}>{locale.getButton('new')}</Button>
)

export const HkSaveButton = (props) => (
    <Button type='primary' icon='save' size='default' style={buttonStyle} disabled={props.disabled} onClick={props.onClick}>{locale.getButton('save')}</Button>
)

export const HkCancelButton = (props) => (
    <Button type='danger' icon='close-circle-o' size='default' style={buttonStyle} disabled={props.disabled} onClick={props.onClick}>{locale.getButton('cancel')}</Button>
)

export const HkTableAddButton = (props) => (
    <Button type='primary' icon='plus' style={boldStyle} disabled={props.disabled} onClick={props.onClick} />
)

export const HkTableRemoveButton = (props) => (
    <Button icon="close" size='small' style={{ fontWeight: 'bold', color: 'white', backgroundColor: 'red' }} disabled={props.disabled} onClick={props.onClick} />
)

export const HkTableOptionsButton = (props) => (
    <Button type='danger' size='small' style={boldStyle} disabled={props.disabled} onClick={props.onClick}>{'...'}</Button>
)

export class HkDropdownButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activeItem: props.dropdownMenu.items[(props.defaultIndex || 0)] };
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.handleDropdownClick = this.handleDropdownClick.bind(this);
    }

    handleDropdownClick() {
        if (this.state.activeItem)
            this.state.activeItem.onClick();
    }

    handleMenuClick(item) {
        if (item)
            this.setState({ activeItem: item }, () => {
                this.handleDropdownClick();
            });
    }

    getMenu() {
        return <HkMenu onClick={this.handleMenuClick} items={this.props.dropdownMenu.items} />;
    }

    render() {
        let buttonTitle = null;
        if (this.props.dropdownMenu.currentAsButton && this.state.activeItem)
            buttonTitle = this.state.activeItem.title || locale.getButton(this.state.activeItem.name);
        else
            buttonTitle = this.props.title || locale.getButton(this.props.name);

        return (
            <Dropdown.Button style={buttonStyle} disabled={this.props.disabled} onClick={this.handleDropdownClick} overlay={this.getMenu()}>
                <span style={boldStyle}>{buttonTitle}</span>
            </Dropdown.Button >
        );
    }
}