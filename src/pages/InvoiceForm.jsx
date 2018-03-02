import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Table, Spin, Input, Tabs, Row, Col, Alert } from 'antd';
import axios from 'axios';
import moment from 'moment';
import PublishSubscribe from 'publish-subscribe-js';

import { HkTitle, HkFormItem } from 'components/HkForm.jsx';
import { HkComboBox, HkDatePicker, HkInput, HkInputNumber, HkAddon, HkCheckbox } from 'components/HkControl.jsx';
import { HkTableAddButton, HkTableRemoveButton, HkDropdownButton } from 'components/HkButton.jsx';
import HkPictureWall from 'components/HkPictureWall.jsx';
import { DefinitionsWS, TrcodesWS, InvoicesWS, PartiesWS, PaycodesWS, AccountsWS, ExchratesWS } from 'modules/WS';
import Definitions from 'modules/Definitions';
import Locale from 'modules/Locale';
import Auth from 'modules/Auth';
import Messages from 'modules/Messages';
import Formatter from 'modules/Formatter';
import Utilities from 'modules/Utilities';

const columnStyle = { style: { padding: '4px', fontWeight: 'bold' } };

class InvoiceForm extends React.Component {
    constructor(props) {
        super(props);
        this.model = Definitions.getModel('invoice');
        this.localCurrency = Auth.getLocalCurrency();

        this.handleInvoiceCancel = this.handleInvoiceCancel.bind(this);
        this.handleInvoicePrint = this.handleInvoicePrint.bind(this);
        this.handleInvoiceRefund = this.handleInvoiceRefund.bind(this);
        this.handleStoppage = this.handleStoppage.bind(this);
        this.handleTevkifat = this.handleTevkifat.bind(this);

        this.getHeaderOptionsMenu = this.getHeaderOptionsMenu.bind(this);

        this.state = {
            primaryKey: 'new',//props.match.params.pk,
            invoice_type: 'SALES',//props.match.params.invoice_type,
            units: [],
            trcodes: [],
            paycodes: [],
            accounts: [],
            parties: [],
            currencies: [],
            model: { transactions: null, payments: null },
            message: null,
            loading: false,
            trScroll: { y: 46 * 2 },
            payScroll: { y: 46 * 2 },
            nofTr: 0,
            nofPay: 0,
            warningTransaction: null,
            warningPayment: null,
            modalCancelReasonVisibility: false,
            // headerOptionsMenu: this.getHeaderOptionsMenu( props.match.params.invoice_type, props.match.params.pk)
            headerOptionsMenu: this.getHeaderOptionsMenu('SALES', 'new')

        }

        this.calculateSummary = this.calculateSummary.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeTransaction = this.handleChangeTransaction.bind(this);
        this.handleRemoveTransaction = this.handleRemoveTransaction.bind(this);
        this.handleNewTransaction = this.handleNewTransaction.bind(this);
        this.trFooter = this.trFooter.bind(this);
        this.payFooter = this.payFooter.bind(this);

        this.handleChangePayment = this.handleChangePayment.bind(this);
        this.handleRemovePayment = this.handleRemovePayment.bind(this);
        this.handleNewPayment = this.handleNewPayment.bind(this);

        this.handleCancel = this.handleCancel.bind(this);

        this.calculateTableSize = this.calculateTableSize.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
        this.expandedRow = this.expandedRow.bind(this);

        this.trColumns = [{
            title: Locale.getField('trcode_key').title,
            dataIndex: 'trcode_key',
            width: 210,
            render: (value, record) => {
                return {
                    props: columnStyle,
                    children: <HkComboBox
                        name='trcode_key' keyField='trcode_key' displayField='description'
                        disabled={this.state.model.iscanceled}
                        value={value}
                        dataList={this.state.trcodes}
                        filter={[{ id: 'trcode_type', value: 'PRODUCT' }]}
                        onChange={this.handleChangeTransaction}
                        primaryKey={record.transaction_key}
                    />
                }
            }
        }, {
            title: Locale.getField('vat_trcode_key').title,
            dataIndex: 'vat_trcode_key',
            width: 115,
            render: (value, record) => {
                return {
                    props: columnStyle,
                    children: <HkComboBox
                        name='vat_trcode_key' keyField='trcode_key' displayField='description'
                        disabled={this.state.model.iscanceled}
                        value={value}
                        dataList={this.state.trcodes}
                        filter={[{ id: 'trcode_type', value: 'VAT' }]}
                        onChange={this.handleChangeTransaction}
                        primaryKey={record.transaction_key}
                    />
                }
            },
        }, {
            title: Locale.getField('isvatinclude').title,
            dataIndex: 'isvatinclude',
            width: 52,
            render: (value, record) => {
                return {
                    props: { style: { padding: '4px', textAlign: 'center' } },
                    children: <HkCheckbox name="isvatinclude"
                        disabled={this.state.model.iscanceled}
                        checked={value} onChange={this.handleChangeTransaction}
                        primaryKey={record.transaction_key}
                    />
                }
            }
        }, {
            title: Locale.getField('qty').title,
            dataIndex: 'qty',
            width: 100,
            render: (value, record) => {
                return {
                    props: columnStyle,
                    children: <HkInputNumber
                        name='qty'
                        disabled={this.state.model.iscanceled}
                        min={0}
                        value={value}
                        onChange={this.handleChangeTransaction}
                        primaryKey={record.transaction_key}
                        style={{ width: '90px', textAlign: 'right' }}
                    //formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                }
            },
        }, {
            title: Locale.getField('unit_def_key').title,
            dataIndex: 'unit_def_key',
            width: 105,
            render: (value, record) => {
                return {
                    props: columnStyle,
                    children: <HkComboBox
                        name='unit_def_key' keyField='definition_key' displayField='description'
                        disabled={this.state.model.iscanceled}
                        value={value}
                        dataList={this.state.units}
                        onChange={this.handleChangeTransaction}
                        primaryKey={record.transaction_key}
                    />
                }
            },
        }, {
            title: Locale.getField('unit_price').title,
            dataIndex: 'unit_price',
            width: 115,
            render: (value, record) => {
                return {
                    props: columnStyle,
                    children: <HkInputNumber
                        name='unit_price'
                        disabled={this.state.model.iscanceled}
                        min={0.0001}
                        step={0.01}
                        value={value}
                        onChange={this.handleChangeTransaction}
                        primaryKey={record.transaction_key}
                        style={{ width: '105px' }}
                    //formatter={value => new Intl.NumberFormat(Locale.getLanguage(), { style: 'currency', currency: record.currency }).format(value)}
                    />
                }
            },
        }, {
            title: Locale.getField('net').title,
            dataIndex: 'net',
            width: 150,
            render: (value, record) => {
                return {
                    props: columnStyle,
                    children: <HkInputNumber
                        name='net'
                        disabled={this.state.model.iscanceled}
                        min={0.01}
                        step={0.01}
                        value={value}
                        onChange={this.handleChangeTransaction}
                        primaryKey={record.transaction_key}
                        style={{ width: '140px' }}
                    //formatter={value => new Intl.NumberFormat(Locale.getLanguage(), { style: 'currency', currency: this.localCurrency }).format(value)}
                    />
                }
            },
        }, {
            title: Locale.getField('gross').title,
            dataIndex: 'gross',
            width: 150,
            render: (value, record) => {
                return {
                    props: columnStyle,
                    children: <HkInputNumber
                        name='gross'
                        disabled={this.state.model.iscanceled}
                        min={0.01}
                        step={0.01}
                        value={value}
                        onChange={this.handleChangeTransaction}
                        primaryKey={record.transaction_key}
                        style={{ width: '140px' }}
                    //formatter={value => new Intl.NumberFormat(Locale.getLanguage(), { style: 'currency', currency: this.localCurrency }).format(value)}
                    />
                }
            },
        }, {
            title: <HkTableAddButton
                disabled={this.state.model.iscanceled}
                onClick={this.handleNewTransaction} />,
            key: 'operation',
            width: 50,
            fixed: false,
            render: (text, record) => {
                return <HkTableRemoveButton
                    disabled={this.state.model.iscanceled}
                    onClick={this.handleRemoveTransaction.bind(this, record.transaction_key)} />;
            },
        }
        ];

        this.payColumns = [{
            title: Locale.getField('paycode_key').title,
            dataIndex: 'paycode_key',
            width: 110,
            render: (value, record) => {
                return {
                    props: columnStyle,
                    children: <HkComboBox
                        name='paycode_key' keyField='paycode_key' displayField='description'
                        disabled={this.state.model.iscanceled}
                        value={value}
                        dataList={this.state.paycodes}
                        filter={[{ id: 'trcode_type', value: 'PRODUCT' }]}
                        onChange={this.handleChangePayment}
                        primaryKey={record.payment_key}
                    />
                }
            }
        }, {
            title: Locale.getField('account_key').title,
            dataIndex: 'account_key',
            width: 200,
            render: (value, record) => {
                return {
                    props: columnStyle,
                    children: <HkComboBox
                        name='account_key' keyField='account_key' displayField='description'
                        disabled={this.state.model.iscanceled}
                        value={value}
                        dataList={this.state.accounts}
                        filter={[{ id: 'payment_type', value: record.payment_type }]}
                        onChange={this.handleChangePayment}
                        primaryKey={record.payment_key}
                    />
                }
            },
        }, {
            title: Locale.getField('description').title,
            dataIndex: 'description',
            width: 150,
            render: (value, record) => {
                return {
                    props: columnStyle,
                    children: <HkInput
                        name='description'
                        disabled={this.state.model.iscanceled}
                        value={value}
                        onChange={this.handleChangePayment}
                        primaryKey={record.payment_key}
                    />
                }
            },
        }, {
            title: Locale.getField('f_amount').title,
            dataIndex: 'f_amount',
            width: 200,
            render: (value, record) => {
                return {
                    props: { style: { padding: '4px', textAlign: 'right' }, },
                    children: <HkAddon addonAfter={<HkComboBox
                        name='currency' keyField='code' displayField='code'
                        disabled={this.state.model.iscanceled}
                        value={record.currency}
                        dataList={this.state.currencies}
                        onChange={this.handleChangePayment}
                        primaryKey={record.payment_key}
                        style={{ width: 80 }}
                    />}>

                        <HkInputNumber
                            name='f_amount'
                            disabled={this.state.model.iscanceled}
                            min={0}
                            value={value}
                            onChange={this.handleChangePayment}
                            primaryKey={record.payment_key}
                        //formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        />
                    </HkAddon>
                }
            },
        }, {
            title: Locale.getField('exch_rate').title,
            dataIndex: 'exch_rate',
            width: 115,
            render: (value, record) => {
                return {
                    props: columnStyle,
                    children: <HkInputNumber
                        name='exch_rate'
                        disabled={this.state.model.iscanceled}
                        min={0.0001}
                        value={value}
                        onChange={this.handleChangePayment}
                        primaryKey={record.payment_key}
                    //formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                }
            },
        }, {
            title: Locale.getField('amount').title,
            dataIndex: 'amount',
            width: 100,
            render: (value, record) => {
                return Formatter.numberFormat(value, this.localCurrency);
            },
        }, {
            title: Locale.getField('expiry_date').title,
            dataIndex: 'expiry_date',
            width: 140,
            render: (value, record) => {
                return {
                    props: columnStyle,
                    children: <HkDatePicker name='expiry_date'
                        value={moment(this.state.model.date)}
                        disabled={this.state.model.iscanceled}
                        onChange={this.handleChangePayment}
                        primaryKey={record.payment_key}
                        style={{ width: '130px' }}
                    />
                }
            },
        }, {
            title: Locale.getField('payment_status').title,
            dataIndex: 'payment_status',
            width: 125,
            render: (value, record) => {
                return {
                    props: columnStyle,
                    children: <HkComboBox
                        name='payment_status' keyField='code' displayField='description'
                        disabled={this.state.model.iscanceled}
                        value={value}
                        dataList={Locale.getCategory('payment_status')}
                        onChange={this.handleChangePayment}
                        primaryKey={record.payment_key}
                    />
                }
            },
        }, {
            title: <HkTableAddButton
                disabled={this.state.model.iscanceled}
                onClick={this.handleNewPayment} />,
            key: 'operation',
            width: 50,
            fixed: false,
            render: (text, record) => {
                return <HkTableRemoveButton
                    disabled={this.state.model.iscanceled}
                    onClick={this.handleRemovePayment.bind(this, record.payment_key)} />;
            },
        }
        ];

        this.trWidth = this.trColumns.reduce((sum, item) => { return sum + item.width; }, 0) + 50; // collapse icon
        this.payWidth = this.payColumns.reduce((sum, item) => { return sum + item.width; }, 0);

        this.footerOptionsMenu = {
            currentAsButton: false, items: [
                {
                    key: 'stopaj', title: 'Stopaj', subItems: [
                        { key: 'stopaj20', title: '%20 Stopaj', rate: 0.20, onClick: this.handleStoppage },
                        { key: 'stopaj17', title: '%17 Stopaj', rate: 0.17, onClick: this.handleStoppage },
                        { key: 'stopaj15', title: '%15 Stopaj', rate: 0.15, onClick: this.handleStoppage },
                        { key: 'stopaj10', title: '%10 Stopaj', rate: 0.10, onClick: this.handleStoppage },
                        { key: 'stopaj3', title: '% 3 Stopaj', rate: 0.03, onClick: this.handleStoppage },
                    ]
                },
                { key: 'tevkifat', title: 'Tevkifat', onClick: this.handleTevkifat }
            ]

        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            invoice_type: nextProps.match.params.invoice_type,
            primaryKey: nextProps.match.params.pk,
            headerOptionsMenu: this.getHeaderOptionsMenu(nextProps.match.params.invoice_type, nextProps.match.params.pk)
        }, () => { this.fetchData(); });
    }

    componentDidMount() {
        this.resizeSubKey = PublishSubscribe.subscribe('resize', this.onWindowResize);
        this.fetchData();
        this.calculateTableSize();
    }

    componentWillUnmount() {
        PublishSubscribe.unsubscribe('resize', this.resizeSubKey);
    }

    onWindowResize(rect) {
        this.calculateTableSize(rect);
    }

    calculateTableSize(parentRect) {
        let trScroll = { y: 1 };
        let payScroll = { y: this.state.payScroll.y };
        if (this.tableContainer) {
            const rect = this.tableContainer.getBoundingClientRect();
            if (parentRect) {
                let y = parentRect.height - 450;
                if (y < 100) y = 100;
                trScroll['y'] = y;
            }

            let trOp = this.trColumns.find(col => col.key === 'operation');
            let payOp = this.payColumns.find(col => col.key === 'operation');
            if (rect.width < this.trWidth) {
                trScroll['x'] = this.trWidth;
                if (trOp.fixed !== 'right')
                    trOp.fixed = 'right';
            }
            else if (trOp.fixed)
                trOp.fixed = false;

            if (rect.width < this.payWidth) {
                payScroll["x"] = this.payWidth;
                if (payOp.fixed !== 'right')
                    payOp.fixed = 'right';
            }
            else if (payOp.fixed)
                payOp.fixed = false;
        }
        if (trScroll.x !== this.state.trScroll.x || payScroll.x !== this.state.payScroll.x ||
            trScroll.y !== this.state.trScroll.y || payScroll.y !== this.state.payScroll.y)
            this.setState({ trScroll: trScroll, payScroll: payScroll });
    }

    getHeaderOptionsMenu(invoice_type, primaryKey) {
        let items = null;

        if (invoice_type.startsWith('SALES'))
            items = [
                { key: 'invoice_print', title: Locale.getButton('invoice_print'), onClick: this.handleInvoicePrint },
                { key: 'invoice_cancel', title: Locale.getButton('invoice_cancel'), onClick: this.handleInvoiceCancel }
            ];
        else if (primaryKey !== 'new')
            items = [
                { key: 'invoice_refund', title: Locale.getButton('invoice_refund'), onClick: this.handleInvoiceRefund },
                { key: 'invoice_cancel', title: Locale.getButton('invoice_cancel'), onClick: this.handleInvoiceCancel }
            ];

        if (items)
            return { currentAsButton: true, items: items };
        else
            return null;
    }

    fetchData() {

        this.setState({ loading: true });
        axios.all([
            PartiesWS.get(),
            DefinitionsWS.getByParent('UNIT'),
            DefinitionsWS.getByParent('CURRENCY'),
            TrcodesWS.get(),
            InvoicesWS.getByPK(this.state.primaryKey),
            PaycodesWS.get(),
            AccountsWS.get(),

        ]
        ).then(function ([parties, units, currencies, trcodes, invoice, paycodes, accounts]) {
            this.setState({
                model: invoice.data,
                parties: parties.data.list,
                trcodes: trcodes.data.list,
                units: units.data.list,
                currencies: currencies.data.list,
                paycodes: paycodes.data.list,
                accounts: accounts.data.list,
                loading: false
            }, () => {
                this.calculateSummary(this.state.model);
            });
        }.bind(this)).catch((error) => {
            this.setState({ message: Messages.getRequestErrorMessage(error), loading: false });
        });
    }

    handleChange(e) {
        const field = e.target;
        var model = this.state.model;
        if (model.currency !== field.value) {
            model.currency = field.value;
            ExchratesWS.getByDateType(model.currency, this.localCurrency, this.state.model.date, 'I').then(
                function (exchrate) {
                    // todo satinalma / satis tipine gore kur kurallari eklenebilir,
                    model.exch_rate = exchrate.data ? exchrate.data.buying : 1;
                    this.calculateSummary(model);
                }.bind(this));
        }
        else {
            model[field.name] = field.value;
            this.setState({ model: model });
        }
    }

    handleNewTransaction() {
        let model = this.state.model;
        if (model.iscanceled)
            return;

        if (model.transactions) {
            let found = model.transactions.find(x => x.isvisible && !x.isdeleted && !x.trcode_key);
            if (found) {
                this.setState({ warningTransaction: Locale.getMessage('atmostonenewrecord') });
                return;
            }
        }

        let transaction = { ...this.model.transactions[0] };
        transaction.transaction_key = Utilities.generateUuid();
        transaction.invoice_key = model.invoice_key;
        model.transactions.push(transaction);
        let nofTr = this.state.nofTr + 1;
        this.setState({ model: model, nofTr: nofTr, warningTransaction: null });
    }

    handleRemoveTransaction(primaryKey) {
        var model = this.state.model;
        if (model.transactions) {
            if (primaryKey.startsWith(Utilities.UID_PREFIX))  // yeni eklenen kayitlar db ye gitmeden silinirse
                model.transactions = model.transactions.filter(tr => !(tr.transaction_key === primaryKey || tr.transaction_ref_key === primaryKey));
            else {
                // var olan kayitlar db de silindi olarak isaretlenmesi icin
                model.transactions.forEach((tr, i) => {
                    if (tr.transaction_key === primaryKey || tr.transaction_ref_key === primaryKey) {
                        tr.isvisible = false;
                        tr.isdeleted = true;
                    }
                });
            }
            this.calculateSummary(model);
        }
    }

    handleChangeTransaction(e) {
        const field = e.target;
        let model = this.state.model;
        let transaction = model.transactions.find(x => x.transaction_key === field.primaryKey);
        const oldvat_trcode_key = transaction.vat_trcode_key;
        switch (field.name) {
            case "trcode_key":
                transaction.trcode_key = field.value;
                transaction.vat_trcode_key = e.model.vat_trcode_key;
                transaction.description = e.model.description;
                transaction.isvatinclude = e.model.isvatinclude;
                transaction.unit_def_key = e.model.unit_def_key ? e.model.unit_def_key : transaction.unit_def_key;
                transaction.unit_price = e.model.unit_price;
                transaction.qty = transaction.qty !== 0 ? transaction.qty : 1.0;
                transaction.tax_rate = e.model.tax_rate;
                transaction.exch_rate = transaction.exch_rate || 1.0;
                transaction.currency = transaction.currency || this.localCurrency;
                break;
            case "description":
                transaction.description = field.value;
                break;
            case "unit_def_key":
                transaction.unit_def_key = field.value;
                break;
            case "vat_trcode_key":
                transaction.vat_trcode_key = field.value;
                transaction.tax_rate = e.model.tax_rate;
                break;
            case "isvatinclude":
                transaction.isvatinclude = field.value;
                break;
            case "unit_price":
                transaction.unit_price = field.value;
                break;
            case "exch_rate":
                transaction.exch_rate = field.value;
                break;
            case "currency":
                transaction.currency = field.value;
                break;
            case "qty":
                transaction.qty = field.value;
                break;
            case "net":
                transaction.net = field.value;
                break;
            case "gross":
                transaction.gross = field.value;
                break;
            case "discount_rate":
                transaction.discount_rate = field.value;
                break;
            case "discount":
                transaction.discount = field.value;
                break;
            default: break;
        }
        //vat changes -- removing different vat transaction
        if (transaction.vat_trcode_key !== oldvat_trcode_key) {
            let vattr = model.transactions.find(tr => tr.transaction_ref_key === transaction.transaction_key && tr.trcode_key === oldvat_trcode_key);
            if (vattr)
                model.transactions = model.transactions.filter(tr => tr.transaction_key !== vattr.transaction_key);
        }

        switch (field.name) {
            case "net":
                transaction.gross = Utilities.round(transaction.net + (transaction.net * transaction.tax_rate / 100.0), 2);
                transaction.f_gross = transaction.gross / transaction.exch_rate;
                transaction.unit_price = Utilities.round((transaction.isvatinclude ? transaction.gross : transaction.net) / transaction.qty / transaction.exch_rate, 4);

                transaction.discount = 0.0;
                transaction.discount_rate = 0.0;
                break;
            case "gross":
                transaction.net = Utilities.round(transaction.gross / ((100.0 + transaction.tax_rate) / 100.0), 2);
                transaction.f_net = transaction.net / transaction.exch_rate;
                transaction.unit_price = Utilities.round((transaction.isvatinclude ? transaction.gross : transaction.net) / transaction.qty / transaction.exch_rate, 4);
                transaction.discount = 0.0;
                transaction.discount_rate = 0.0;
                break;
            default:
                if (transaction.discount_rate !== 0)
                    transaction.discount = Utilities.round(transaction.unit_price * transaction.qty * transaction.discount_rate / 100.0, 2);

                if (transaction.isvatinclude) {
                    transaction.f_gross = Utilities.round(transaction.unit_price * transaction.qty - transaction.discount, 2);
                    transaction.f_net = Utilities.round(transaction.f_gross / ((100.0 + transaction.tax_rate) / 100.0), 2);
                    transaction.gross = Utilities.round(transaction.f_gross * transaction.exch_rate, 2);
                    transaction.net = Utilities.round(transaction.f_net * transaction.exch_rate, 2);
                }
                else {
                    transaction.f_net = Utilities.round(transaction.unit_price * transaction.qty - transaction.discount, 2);
                    transaction.f_gross = Utilities.round(transaction.f_net + (transaction.f_net * transaction.tax_rate / 100), 2);
                    transaction.gross = Utilities.round(transaction.f_gross * transaction.exch_rate, 2);
                    transaction.net = Utilities.round(transaction.f_net * transaction.exch_rate, 2);
                }
        }

        // checking vat details
        if (transaction.vat_trcode_key) {
            let vat_trcode = this.state.trcodes.find(code => code.trcode_key === transaction.vat_trcode_key);
            let vat = model.transactions.find(tr => tr.transaction_ref_key === transaction.transaction_key && tr.trcode_key === transaction.vat_trcode_key);
            let isNew = false;
            if (!vat) {
                vat = {};
                vat["transaction_key"] = Utilities.generateUuid();
                vat["transaction_ref_key"] = transaction.transaction_key;
                vat["trcode_key"] = transaction.vat_trcode_key;
                vat["date"] = transaction.date;
                vat["invoice_key"] = transaction.invoice_key;
                vat["account_key"] = transaction.account_key;
                vat["unit_def_key"] = null;
                vat["vat_trcode_key"] = null;
                vat["isvatinclude"] = false;
                vat["qty"] = 1;
                vat["isvisible"] = false; //todo
                isNew = true;
            }
            vat["description"] = transaction.description + "-" + vat_trcode.description;
            vat["exch_rate"] = transaction.exch_rate;
            vat["currency"] = transaction.currency;
            vat["tax_rate"] = vat_trcode.tax_rate;
            vat["net"] = transaction.gross - transaction.net;
            vat["gross"] = vat.net;
            vat["f_net"] = transaction.f_gross - transaction.f_net;
            vat["f_gross"] = vat.f_net;

            if (isNew)
                model.transactions.push(vat);
        }
        this.calculateSummary(model);
    }

    calculateSummary(model) {
        model.total = 0;
        model.generaltotal = 0;
        model.taxes = [];
        model.totalPayment = 0;
        model.remain = 0;

        let nofTr = 0;
        let nofPay = 0;
        model.transactions.forEach((tr, i) => {
            if (tr.isdeleted)
                return;

            if (tr.isvisible)
                nofTr++;

            let trcode = this.state.trcodes.find(code => code.trcode_key === tr.trcode_key);
            if (trcode) {
                if (trcode.trcode_type === "PRODUCT") {
                    model.total += tr.net;
                    model.generaltotal += tr.gross;
                }
                else if (trcode.trcode_type === "VAT" || trcode.trcode_type === "TAX") {
                    let tax = model.taxes.find(x => x.trcode_key === tr.trcode_key);
                    if (tax)
                        tax.value += tr.net;
                    else {
                        tax = { trcode_key: tr.trcode_key, title: trcode.description, value: tr.net };
                        model.taxes.push(tax);
                    }
                }
            }
        });

        model.payments.forEach((py, i) => {
            if (py.isdeleted)
                return;

            nofPay++;
            model.totalPayment += py.amount;
        });

        model.remain = model.generaltotal - model.totalPayment;
        this.setState({ model: model, nofTr: nofTr, nofPay: nofPay });
    }

    trFooter() {
        const localeInv = Locale.getCategory('invoice');
        const remainStyle = this.state.model.remain < 0 ? { color: 'red' } : {};

        return (
            <div>
                <Row justify='end' type='flex' >
                    <Col span={8} className='table-footer-desc-col'>{Locale.getMessage('tablefooter_nof_recs', this.state.nofTr)}</Col>
                    <Col span={4} className='table-footer-sum-col'>{localeInv.total}</Col>
                    <Col span={4} className='table-footer-sum-col'>{Formatter.numberFormat(this.state.model.total || 0, this.localCurrency)}</Col>
                    <Col span={3} />
                    {/* <Col span={3} style={{ textAlign: 'right' }}><HkDropdownButton title={Locale.getButton('options')} dropdownMenu={footerOptionsMenu} /> </Col> */}
                </Row>
                {this.state.model.taxes && this.state.model.taxes.map((tax, i) => {
                    return <Row justify='end' type='flex' key={i}>
                        <Col span={4} className='table-footer-sum-col'>{tax.title}</Col>
                        <Col span={4} className='table-footer-sum-col'>{Formatter.numberFormat(tax.value, this.localCurrency)}</Col>
                        <Col span={3} />
                    </Row>;
                })}
                <Row justify='end' type='flex' >
                    <Col span={4} className='table-footer-sum-col'>{localeInv.generaltotal}</Col>
                    <Col span={4} className='table-footer-sum-col'>{Formatter.numberFormat(this.state.model.generaltotal || 0, this.localCurrency)}</Col>
                    <Col span={3} />
                </Row>
                <Row justify='end' type='flex' >
                    <Col span={4} className='table-footer-sum-col'>{localeInv.remain}</Col>
                    <Col span={4} className='table-footer-sum-col' style={remainStyle}>{Formatter.numberFormat(this.state.model.remain, this.localCurrency)}</Col>
                    <Col span={3} />
                </Row>
            </div>
        );
    }

    payFooter() {
        const localeInv = Locale.getCategory('invoice');
        const remainStyle = this.state.model.remain < 0 ? { color: 'red' } : {};

        return (
            <div>
                <Row justify='end' type='flex' >
                    <Col span={8} className='table-footer-desc-col'>{Locale.getMessage('tablefooter_nof_recs', this.state.nofPay)}</Col>
                    <Col span={4} className='table-footer-sum-col'>{localeInv.paymenttotal}</Col>
                    <Col span={4} className='table-footer-sum-col'>{Formatter.numberFormat(this.state.model.totalPayment, this.localCurrency)}</Col>
                    <Col span={3} />
                </Row>
                <Row justify='end' type='flex' >
                    <Col span={4} className='table-footer-sum-col'>{localeInv.remain}</Col>
                    <Col span={4} className='table-footer-sum-col' style={remainStyle}>{Formatter.numberFormat(this.state.model.remain, this.localCurrency)}</Col>
                    <Col span={3} />
                </Row>
            </div>
        );
    }

    handleNewPayment() {
        let model = this.state.model;
        if (model.iscanceled)
            return;

        if (model.payments) {
            let found = model.payments.find(x => !x.isdeleted && !x.paycode_key);
            if (found) {
                this.setState({ warningPayment: Locale.getMessage('atmostonenewrecord') });
                return;
            }
        }

        var payment = { ...this.model.payments[0] };
        payment.payment_key = Utilities.generateUuid();
        payment.invoice_key = model.invoice_key;
        model.payments.push(payment);
        var nofPay = this.state.nofPay + 1;
        this.setState({ model: model, nofPay: nofPay });
    }

    handleRemovePayment(primaryKey) {
        var model = this.state.model;
        if (model.payments) {
            if (primaryKey.startsWith(Utilities.UID_PREFIX))  // yeni eklenen kayitlar db ye gitmeden silinirse
                model.payments = model.payments.filter(pay => !(pay.payment_key === primaryKey || pay.payment_ref_key === primaryKey));
            else {
                // var olan kayitlar db de silindi olarak isaretlenmesi icin
                model.payments.forEach((pay, i) => {
                    if (pay.payment_key === primaryKey || pay.payment_ref_key === primaryKey)
                        pay.isdeleted = true;
                });
            }
            this.calculateSummary(model);
        }
    }

    handleChangePayment(e) {
        const field = e.target;
        let model = this.state.model;
        let payment = model.payments.find(x => x.payment_key === field.primaryKey);
        switch (field.name) {
            case "paycode_key":
                if (payment.payment_type !== e.model.payment_type) {
                    payment.payment_type = e.model.payment_type;
                    payment.description = e.model.description;
                    let found = this.state.accounts.find(acc => acc.payment_type === payment.payment_type);
                    if (found)
                        payment.account_key = found.account_key;
                    else
                        payment.account_key = null;
                }
                payment.paycode_key = field.value;
                break;
            case "currency":
                if (payment.currency !== field.value) {
                    payment.currency = field.value;
                    ExchratesWS.getByDateType(payment.currency, this.localCurrency, this.state.model.date, 'I').then(
                        function (exchrates) {
                            payment.exch_rate = exchrates.data ? exchrates.data.buying : 1;
                            payment.amount = payment.f_amount * payment.exch_rate;
                            this.calculateSummary(model);
                        }.bind(this));
                }
                break;
            case "f_amount":
                payment.f_amount = field.value;
                payment.amount = payment.f_amount * payment.exch_rate;
                break;
            default:
                payment[field.name] = field.value;
        }

        if (field.name === 'exch_rate' || field.name === 'f_amount')
            this.calculateSummary(model);
        else
            this.setState({ model: model });

    }

    handleStoppage(item) {
        console.log('stopaj ' + item);
    }

    handleTevkifat(item) {
        console.log('tevkifat ' + item);
    }

    handleSave() {
        console.log('handleSave');
    }

    handleCancel() {
        this.close();
    }

    close() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        this.props.history.push(from.pathname);
    }
    handleInvoiceCancel() {
        let model = this.state.model;
        model.iscanceled = true;
        model.cancel_date = moment.now();
        this.setState({ model: model });
    }

    handleInvoicePrint() {
        console.log('handleInvoicePrint');
    }

    handleInvoiceRefund() {
        console.log('handleInvoiceRefund');
    }

    handleCloseAlert(element) {
        let newState = this.state;
        newState[element] = null;
        this.setState(newState);
    }

    expandedRow(record) {
        return <Row gutter={16}>
            <Col span={6}>
                <HkAddon
                    addonBefore={Locale.getField('description').title}>
                    <HkInput name='description' value={record.description} primaryKey={record.transaction_key} onChange={this.handleChangeTransaction} />
                </HkAddon>
            </Col>
            <Col span={4}>
                <HkAddon
                    addonBefore={Locale.getField('currency').title}>
                    <HkComboBox name='currency' keyField='code' displayField='code'
                        value={record.currency} primaryKey={record.transaction_key}
                        dataList={this.state.currencies} onChange={this.handleChangeTransaction} />
                </HkAddon>
            </Col>
            <Col span={4}>
                <HkAddon
                    addonBefore={Locale.getField('exch_rate').title}>
                    <HkInputNumber
                        name='exch_rate'
                        min={0.0001}
                        value={record.exch_rate} primaryKey={record.transaction_key}
                        onChange={this.handleChangeTransaction}
                    //formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                </HkAddon>
            </Col>
            <Col span={4}>
                <HkAddon
                    addonBefore={Locale.getField('discount_rate').title}>
                    <HkInputNumber
                        name='discount_rate'
                        min={0}
                        value={record.discount_rate} primaryKey={record.transaction_key}
                        onChange={this.handleChangeTransaction}
                    //formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                </HkAddon>
            </Col>
            <Col span={4}>
                <HkAddon
                    addonBefore={Locale.getField('discount').title}>
                    <HkInputNumber
                        name='discount'
                        min={0}
                        value={record.discount} primaryKey={record.transaction_key}
                        onChange={this.handleChangeTransaction}
                    //formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                </HkAddon>
            </Col>
        </Row>;
    }

    render() {
        const localeInv = Locale.getCategory('invoice');
        const pageTitle = Locale.getPage(this.state.invoice_type.toLowerCase() + '_form');
        const partyTitle = Locale.getField(this.state.invoice_type.startsWith('PURCHASE') ? 'supplier_name' : 'customer_name').title;

        return (
            <div ref={(invForm) => { this.invForm = invForm }}>
                <HkTitle title={pageTitle} onSave={this.handleSave} onCancel={this.handleCancel}
                    dropdownMenu={this.state.model.iscanceled ? null : this.state.headerOptionsMenu} />
                <Spin size='large' spinning={this.state.loading}>
                    <Form>
                        {this.state.model.iscanceled &&
                            <div>
                                <h3>{localeInv.invoice_canceled}</h3>
                                <HkFormItem label={Locale.getField('cancel_reason').title}>
                                    <Input name='cancel_reason' value={this.state.model.cancel_reason} onChange={this.handleChange} />
                                </HkFormItem>
                                <HkFormItem label={Locale.getField('cancel_date').title}>
                                    <HkDatePicker name='cancel_date' disabled={true}
                                        value={moment(this.state.model.cancel_date)} onChange={this.handleChange} />
                                </HkFormItem>
                            </div>
                        }
                        <HkFormItem label={Locale.getField('description').title}>
                            <Input name='description' disabled={this.state.model.iscanceled} value={this.state.model.description} onChange={this.handleChange} />
                        </HkFormItem>
                        <HkFormItem label={partyTitle}>
                            <HkComboBox name='child_party_key' keyField='party_key' displayField='party_name'
                                disabled={this.state.model.iscanceled}
                                value={this.state.model.child_party_key}
                                dataList={this.state.parties} onChange={this.handleChange} />
                        </HkFormItem>
                        <HkFormItem label={Locale.getField('date').title}>
                            <HkDatePicker name='date' disabled={this.state.model.iscanceled}
                                value={moment(this.state.model.date)}
                                onChange={this.handleChange} />
                        </HkFormItem>
                        <HkFormItem label={Locale.getField('invoice').title}>
                            <Input.Group compact style={{ paddingTop: '4px' }}>
                                <Input name='invoice_serial' addonBefore={Locale.getField('invoice_serial').title}
                                    disabled={this.state.model.iscanceled}
                                    value={this.state.model.invoice_serial}
                                    style={{ width: '100px' }} onChange={this.handleChange} />
                                {' '}
                                <Input name='invoice_sequence'
                                    value={this.state.model.invoice_sequence}
                                    disabled={this.state.model.iscanceled}
                                    addonBefore={Locale.getField('invoice_sequence').title} style={{ width: '130px', fontWeight: 'bold' }} onChange={this.handleChange} />
                                {' '}
                                <HkAddon style={{ width: '166px' }}
                                    addonBefore={Locale.getField('currency').title}>
                                    <HkComboBox name='currency' keyField='code' displayField='code'
                                        disabled={this.state.model.iscanceled}
                                        value={this.state.model.currency}
                                        dataList={this.state.currencies} onChange={this.handleChange} />
                                </HkAddon>
                                {' '}
                                <HkAddon style={{ width: '160px' }}
                                    addonBefore={Locale.getField('exch_rate').title}>
                                    <HkInputNumber
                                        name='exch_rate'
                                        disabled={this.state.model.iscanceled}
                                        min={0.0001}
                                        value={this.state.model.exch_rate}
                                        onChange={this.handleChange}
                                    //formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    />
                                </HkAddon>
                            </Input.Group>
                        </HkFormItem>
                    </Form>
                </Spin>
                <div className="card-container" ref={(tableContainer) => { this.tableContainer = tableContainer }}>
                    <Tabs type="line" defaultActiveKey="1" style={{ fontWeight: 'bold' }}>
                        <Tabs.TabPane tab={localeInv.invoiceproduct_tab} key="1" >
                            {this.state.warningTransaction && <Alert
                                message={this.state.warningTransaction}
                                type="warning"
                                closable
                                onClose={this.handleCloseAlert.bind(this, 'warningTransaction')}
                            />}
                            <Table bordered
                                dataSource={Utilities.filterList(this.state.model.transactions, [{ id: 'isvisible', value: true }])}
                                columns={this.trColumns}
                                rowKey='transaction_key'
                                size='middle'
                                pagination={false}
                                scroll={this.state.trScroll}
                                footer={this.trFooter}
                                expandedRowRender={this.expandedRow}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab={localeInv.invoicepayment_tab} key="2">
                            {this.state.warningPayment && <Alert
                                message={this.state.warningPayment}
                                type="warning"
                                closable
                                onClose={this.handleCloseAlert.bind(this, 'warningPayment')}
                            />}
                            <Table bordered
                                dataSource={Utilities.filterList(this.state.model.payments, [{ id: 'isdeleted', value: false }])}
                                columns={this.payColumns}
                                rowKey='payment_key'
                                size='middle'
                                pagination={false}
                                scroll={this.state.payScroll}
                                footer={this.payFooter}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab={localeInv.invoicedocs_tab} key="3">
                            <HkPictureWall />
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

// const InvoiceForm = Form.create()(Invoice_Form);
export default withRouter(InvoiceForm);
