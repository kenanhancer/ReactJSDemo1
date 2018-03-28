import React from 'react';
import PropTypes from 'prop-types';
import { Select, Spin, Input, InputNumber, DatePicker, Checkbox } from 'antd';
import moment from 'moment';
import Utilities from 'modules/Utilities';

export const HkAddon = (props) => {
    let style = props.style || { width: '100%' };
    return <span className="ant-input-group-wrapper" style={style}>
        <span className="ant-input-wrapper ant-input-group">
            {props.addonBefore && <span className="ant-input-group-addon">{props.addonBefore}</span>}
            {props.children}
            {props.addonAfter && <span className="ant-input-group-addon">{props.addonAfter}</span>}
        </span>
    </span>;
}

export class HkCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        const field = e.target;
        this.props.onChange({
            target: { name: this.props.name, value: field.checked, primaryKey: this.props.primaryKey }
        });
    }

    render() {
        return (<Checkbox checked={this.props.checked} onChange={this.handleChange} disabled={this.props.disabled}/>);
    }
}

export class HkInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(value) {
        this.props.onChange({
            target: { name: this.props.name, value: value, primaryKey: this.props.primaryKey }
        });
    }

    render() {
        let props = { ...this.props };
        props.onChange = this.handleChange;
        props.style = props.style || {};
        props.style['width'] = '100%';
        delete props.primaryKey;

        return (<Input {...props} />);
    }
}
HkInput.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}

export class HkInputNumber extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(value) {
        this.props.onChange({
            target: { name: this.props.name, value: value, primaryKey: this.props.primaryKey }
        });
    }

    render() {
        let props = { ...this.props };
        props.onChange = this.handleChange;
        props.style = props.style || {};
        props.style['width'] = '100%';

        return (<InputNumber {...props} />);
    }
}
HkInputNumber.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
}

export class HkDatePicker extends React.Component {
    static defaultProps = {
        value: moment()
    }
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(value) {
        this.props.onChange({
            target: { name: this.props.name, value: value, primaryKey: this.props.primaryKey }
        });
    }
    render() {
        let style = this.props.style || {};
        style['fontWeight'] = 'bold';
        style['width'] = '100%';

        return (<DatePicker value={this.props.value} style={style} disabled={this.props.disabled}
            onChange={this.handleChange}
            placeholder={this.props.placeHolder}
            format="DD.MM.YYYY"
        />);
    }
}
HkDatePicker.propTypes = {
    name: PropTypes.string.isRequired,
    format: PropTypes.string,
    placeHolder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}

export class HkComboBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [], loading: false, filter: null
        }
        this.fetchData = this.fetchData.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.fetchData(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.fetchData(nextProps);
    }

    fetchData(props) {
        if ('dataList' in props) {
            if (!(props.dataList && this.state.dataList && props.dataList.join() === this.state.dataList.join())) {
                let dataList = null;
                if (props.dataList) {
                    dataList = Utilities.filterList(props.dataList, props.filter);
                }
                this.setState({
                    dataList: dataList
                });
                return;
            }
        }
        if (this.props.dataWS) {
            this.setState({ loading: true });
            this.props.dataWS().then((result) => {
                this.setState({ dataList: result.data.list, loading: false });
            });
        }
    }

    handleChange(value) {
        this.props.onChange({
            target: { name: this.props.name, value: value, primaryKey: this.props.primaryKey },
            model: this.state.dataList.find(x => x[this.props.keyField] === value)
        });
    }

    render() {
        let style = this.props.style || { width: '100%' };
        return (
            <Spin spinning={this.state.loading} style={style}>
                <Select
                    showSearch
                    disabled={this.props.disabled}
                    value={this.props.value}
                    placeholder={this.props.placeHolder}
                    optionFilterProp="children"
                    onChange={this.handleChange}
                    style={style}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {this.state.dataList && this.state.dataList.map((item, i) => {
                        const key = item[this.props.keyField];
                        const text = item[this.props.displayField];
                        return <Select.Option key={i} value={key} title={text}>{text}</Select.Option>;
                    })}
                </Select >
            </Spin>
        );
    }
}

HkComboBox.propTypes = {
    name: PropTypes.string.isRequired,
    keyField: PropTypes.string.isRequired,
    displayField: PropTypes.string.isRequired,
    placeHolder: PropTypes.string,
    value: PropTypes.string,
    dataList: PropTypes.array,
    dataWS: PropTypes.func,
    onChange: PropTypes.func.isRequired,
}