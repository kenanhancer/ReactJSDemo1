import locale from 'locale';

export default class table {
    static paginationShowTotal(total) {
        return locale.getMessage('tablefooter_nof_recs', total);
    }

    static paginationConfig(showPagination = true, onChange, onChangePageSize, showSizeChanger = true, defaultPageSize = 15, size = "small") {
        if (!showPagination)
            return false;

        return {
            onChange: onChange,
            onShowSizeChange: onChangePageSize,
            showSizeChanger: showSizeChanger,
            pageSizeOptions: ['10', '15', '20', '30', '50', '75'],
            defaultPageSize: defaultPageSize,
            showTotal: this.paginationShowTotal,
            size: size,
        }
    }

    static getColumn({field, width=100, sortedInfo, title=null, className = 'column bold', align = '', render}) {
        return {
            className: `${className} ${align}`,
            title: title || locale.getField(field).title,
            dataIndex: field,
            width: width,
            sortOrder: sortedInfo.columnKey === field && sortedInfo.order,
            render: render
        }
    }
}