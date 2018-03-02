import React from 'react';
import { Menu, Icon } from 'antd';

var menuItems = [
    {
        key: "01",
        href: "/dashboard",
        icon: "bar-chart",
        title: "Güncel Durum",
        subItems: [
            {
                key: "02",
                href: "/dashboard",
                icon: "dashboard",
                title: "Özet Durum",
            },
            {
                key: "keyd2",
                href: "/dashboard2",
                icon: "calendar",
                title: "Ödeme Planı",
            }
        ]
    },
    {
        key: "key00fatura",
        icon: "solution",
        title: "Faturalar",
        subItems: [
            {
                key: "key003",
                icon: "upload",
                title: "Satış Faturaları",
                href: "/invoices/SALES"
            },
            {
                key: "key004",
                icon: "download",
                title: "Alış Faturaları",
                href: "/invoices/PURCHASE"
            },
            {
                key: "keyexch",
                icon: "global",
                title: "Günlük Kurlar",
                href: "/exch_rates"
            }]
    },
    {
        key: "keyscustomer",
        href: "/parties",
        icon: "contacts",
        title: "Müşteri / Tedarikçiler"
    },
    {
        key: "keyg3",
        href: "/personel",
        icon: "team",
        title: "Çalışanlar"
    },
    {
        key: "key005",
        icon: "calculator",
        title: "Hesaplar",
        subItems: [
            {
                key: "keyh1",
                href: "/accounts/CASH",
                icon: "database",
                title: "Kasalar"
            },
            {
                key: "keyh2",
                href: "/accounts/BANK",
                icon: "home",
                title: "Bankalar"
            },
            {
                key: "keyh3",
                href: "/accounts/CHEQUE",
                icon: "edit",
                title: "Çekler"
            },
            {
                key: "keyh4",
                href: "/accounts/CC",
                icon: "credit-card",
                title: "Kartlar"
            },
            {
                key: "keyh5",
                href: "/accounts/BILLACC",
                icon: "form",
                title: "Senetler"
            },
        ]
    },
    {
        key: "key006",
        icon: "retweet",
        title: "Stok",
        subItems: [
            {
                key: "keystok1",
                href: "/stoklist",
                icon: "retweet",
                title: "Stok Listesi"
            },
            {
                key: "keystok2",
                href: "/stokrapor",
                icon: "api",
                title: "Stok Durum Raporu"
            }
        ]
    },
    {
        key: "key007",
        icon: "setting",
        title: "Ayarlar",
        subItems: [
            {
                key: "keytrcodes",
                href: "/trcodes",
                icon: "setting",
                title: "Hizmet / Ürünler"
            },
            {
                key: "keypaycodes",
                href: "/paycodes",
                icon: "wallet",
                title: "Ödeme Tanımları"
            },
            {
                key: "keykullanicilar",
                href: "/kullanicilar",
                icon: "idcard",
                title: "Kullanıcılar"
            }
        ]
    },
    {
        key: "key008",
        icon: "rocket",
        title: "Raporlar",
        subItems: [
            {
                key: "keystok1",
                href: "/stoklist",
                icon: "rocket",
                title: "Rapor1"
            },
            {
                key: "keystok2",
                href: "/stokrapor",
                icon: "rocket",
                title: "Rapor2"
            }
        ]
    }

];

const Title = (props) => {
    if (props.icon)
        return (<span>
            <Icon type={props.icon} />
            <span>{props.title}</span>
        </span>);

    return <span>{props.title}</span>;
}

export class HkMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { current: null };
    }

    handleClick = (e) => {
        console.log('menu click ', e);
        this.setState({
            current: e.key
        });

        if (this.props.onClick)
            this.props.onClick(e.item.props.item);
    }

    render() {
        return (
            <Menu theme={this.props.theme} mode={this.props.mode} style={this.props.style}
                selectedKeys={[this.state.current]}
                onOpenChange={(e) => { console.log(e) }}
                onClick={this.handleClick}>
                {this.props.items.map((item, i) => {
                    if (item.subItems)
                        return (
                            <Menu.SubMenu key={item.key} item={item} title={<Title key={item.key} icon={item.icon} title={item.title} />}>
                                {
                                    item.subItems.map((child,j)=> {
                                        return <Menu.Item key={child.key} item={child}>{<Title key={child.key} icon={child.icon} title={child.title}/>}</Menu.Item>;
                                    })
                                }
                            </Menu.SubMenu>);

                    return <Menu.Item key={item.key} item={item}><Title key={item.key} icon={item.icon} title={item.title} /></Menu.Item>;
                })}
            </Menu>
        );
    }
}

export const AppMenu = (props) => (<HkMenu theme="dark" mode="inline" items={menuItems} onClick={props.onClick} />);
