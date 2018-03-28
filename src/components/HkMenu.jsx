import React from 'react';
import {Link} from 'react-router-dom';
import { Menu, Icon } from 'antd';
import locale from 'locale';

const Title = (props) => {
    const title = (typeof (props.title) === "object" ? props.title[locale.getLanguage()] : props.title);

    if (props.icon)
        return <span>
            <Icon type={props.icon} />
            <span>{title}</span>
        </span>;

    return <span>{title}</span>;
}

export default class HkMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { current: null };
    }

    handleClick = (e) => {
        this.setState({ current: e.key });
        if (this.props.onClick)
            this.props.onClick(e.item.props.item);
    }

    render() {
        return <Menu theme={this.props.theme} mode={this.props.mode} style={this.props.style}
            selectedKeys={[this.state.current]}
            onOpenChange={(e) => { console.log(e) }}
            onClick={this.handleClick}>
            {this.props.items && this.props.items.map((item, i) => {
                if (item.subItems)
                    return (
                        <Menu.SubMenu key={item.key} item={item} title={<Title key={item.key} icon={item.icon} title={item.title} />}>
                            {
                                item.subItems.map((child, j) => {
                                    return <Menu.Item key={child.key} item={child}>
                                        {child.href ?
                                            <Link to={child.href}><Title key={child.key} icon={child.icon} title={child.title} /></Link>
                                            :
                                            <Title key={child.key} icon={child.icon} title={child.title} />
                                        }
                                    </Menu.Item>;
                                })
                            }
                        </Menu.SubMenu>);

                return <Menu.Item key={item.key} item={item}>
                    {item.href ?
                        <Link to={item.href}><Title key={item.key} icon={item.icon} title={item.title} /></Link>
                        :
                        <Title key={item.key} icon={item.icon} title={item.title} />
                    }
                </Menu.Item>;
            })}
        </Menu>
    }
}