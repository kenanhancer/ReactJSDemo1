import service from 'service';

export default class api {
    static getInvoices(invoiceType="SALES", filter=[]) {
        return service.request({
            url: '/invoices/'+invoiceType,
            method: 'get',
            params: filter
        });
    }

    static getInvoice(primaryKey) {
        return service.request({
            url: '/invoice/pk/'+primaryKey,
            method: 'get',
            params: null
        });
    }
    
    static saveInvoice(invoice={}) {
        return service.request({
            url: '/login/logout',
            method: 'post',
            data: invoice
        });
    }
}