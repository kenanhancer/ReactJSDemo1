import React from 'react';
import { withRouter } from 'react-router-dom';
import { Table, Spin, Input, Row, Col, Alert } from 'antd';
import locale from 'locale';
import store from 'redux/store';
import format from 'helpers/format';
import table from 'helpers/table';
import api from 'app/invoice/api';
import { HkNewButton } from 'components/HkButton.jsx';
import { HkTitle } from 'components/HkForm.jsx';
import HkPaymentStatus from 'components/HkPaymentStatus.jsx';
import BaseComponent from 'components/BaseComponent.jsx';

class InvoiceList extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            invoice_type: props.match.params.invoice_type,
            list: [],
            loading: false,
            sortedInfo: { columnKey: "", order: "ascend" },
        }
        this.localCurrency = store.getState().login.localCurrency;
        this.tables = [{ name: 'table', width: 0, scroll: {}, columns: [] }];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.invoice_type != this.state.invoice_type) {
            this.setState({
                invoice_type: nextProps.match.params.invoice_type
            }, () => { this.fetchData(); });
        }
    }

    componentDidMount() {
        super.componentDidMount();
        this.fetchData();
    }

    createColumns() {
        console.log("createColumns");
        const sortedInfo = this.state.sortedInfo;
        let dt = this.tables.find(dt => dt.name === 'table');
        dt.columns = [
            table.getColumn({
                field: 'invoice_type', width: 100, sortedInfo: sortedInfo,
                render: (value, record) => ({ children: <span>{locale.getCategory('invoice_types').find(x => x.code === value).description}</span> })
            }),
            table.getColumn({
                field: 'date', width: 86, sortedInfo: sortedInfo,
                render: (value, record) => ({ children: <span>{format.date(value)}</span> })
            }),
            table.getColumn({
                field: 'child_party_name', title: locale.getField('party_name').title,  width: 135, sortedInfo: sortedInfo
            }),
            table.getColumn({
                field: 'description', width: 135, sortedInfo: sortedInfo
            }), 
            table.getColumn({
                field: 'invoice_serial', title: locale.getField('invoice').title, width: 75, sortedInfo: sortedInfo,
                render: (value, record) => ({ children: <span>{`${record.invoice_serial} ${record.invoice_sequence}`}</span> })
            }),
            table.getColumn({
                field: 'total', width: 90, sortedInfo: sortedInfo, align:'align-right',
                render: (value, record) => ({ children: <span>{format.number(value, record.currency)}</span> })
            }),
            table.getColumn({
                field: 'paid', width: 90, sortedInfo: sortedInfo, align: 'align-right',
                render: (value, record) => ({ children: <span>{format.number(value, record.currency)}</span> })
            }),
            table.getColumn({
                field: 'remaining', width: 90, sortedInfo: sortedInfo, align: 'align-right',
                render: (value, record) => ({ children: <span>{format.number(value, record.currency)}</span> })
            }),
            table.getColumn({
                field: 'payment_status', width: 85, sortedInfo: sortedInfo, 
                render: (value, record) => ({ children: <HkPaymentStatus status={value} /> })
            })
        ];
        dt.width = dt.columns.reduce((sum, item) => { return sum + item.width; }, 0); // when collapse icon exist , add + 50
    }

    handleChange = (pagination, filters, sorter) => {
        console.log('handle change', pagination, filters, sorter);
        this.setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    }


    fetchData() {
        this.setState({ loading: true });
        api.getInvoices(this.state.invoice_type, null).then((response) => {
            this.setState({ list: response.data.list, loading: false });
        }).catch((error) => {
            this.setState({ message: error });
        });
    }

    onNew() {
        this.props.history.push(`/invoice/${this.state.invoice_type}/new`);
    }
    onClickRow(record) {
        this.props.history.push(`/invoice/${this.state.invoice_type}/${record.invoice_key}`);
    }

    onChangePagination(page, pageSize) {
        console.log(`Pagination changed page:${page} pageSize:${pageSize}`);
    }
    onChangePageSize(current, size) {
        console.log(`Pagination page size current:${current} size: ${size}`);
    }

    render() {
        console.log(store.getState());
        const pageTitle = locale.getPage(this.state.invoice_type.toLowerCase() + '_invoice_list');
        const dt = this.tables.find(dt => dt.name === 'table');
        console.log('render invoice', dt);
        return <div>
            <HkTitle title={pageTitle}>
                <Row type="flex" justify="end">
                    <Col><HkNewButton onClick={() => this.onNew()} /></Col>
                </Row>
            </HkTitle>

            <div className="card-container" ref={(tableContainer) => { this.tableContainer = tableContainer }}>
                <Table bordered
                    loading={this.state.loading}
                    dataSource={this.state.list}
                    columns={dt.columns}
                    rowKey='invoice_key'
                    size='small'
                    scroll={dt.scroll}
                    expandedRowRender={this.expandedRow}
                    onRow={(record) => { return { onClick: () => { this.onClickRow(record) } } }}
                    onChange={this.handleChange}
                    pagination={table.paginationConfig(this.onChangePagination, this.onChangePageSize)}
                />
            </div>
        </div>
    }
}

export default withRouter(InvoiceList);