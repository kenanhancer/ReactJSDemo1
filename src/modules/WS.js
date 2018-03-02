import axios from 'axios';

// const wsAddr = "http://192.168.1.101:52184";
const wsAddr = "http://localhost:52184";

export default class WS {
    static get(controller, params) {
        return axios.get(wsAddr + "/api/" + controller, { params: { qry: params } });
    }
    static getByPK(controller, primary_key) {
        return axios.get(wsAddr + "/api/" + controller + "/pk/" + primary_key);
    }
    static getByPathParams(controller, path) {
        return axios.get(wsAddr + "/api/" + controller + path);
    }
    static post(controller, model) {
        return axios.post(wsAddr + "/api/" + controller, model);
    }
}

export class DefinitionsWS {
    static get(size, page, orderBy, filterBy) {
        const sz = size ? size : -1;
        const pg = page ? page : -1;
        const order = orderBy ? orderBy : [{ id: 'description', by: 'asc' }];
        const filter = filterBy ? filterBy : null;

        return WS.get('definitions', { size: sz, page: pg, orderBy: order, filter: filter });
    }
    static post(model) {
        return WS.post('definitions', model);
    }

    static getByParent(parent_definition_code) {
        const filter = parent_definition_code ? [{ id: 'parent_definition_code', value: parent_definition_code }] : null;
        return this.get(-1, -1, [{ id: 'description', by: 'asc' }], filter);
    }

    static getByPK(primary_key) {
        return WS.getByPK('definitions', primary_key);
    }
}

export class TrcodesWS {
    static get(size, page, orderBy, filter) {
        const order = orderBy ? orderBy : [{ id: 'description', by: 'asc' }];
        return WS.get('trcodes', { size: size, page: page, orderBy: order, filter: filter });
    }

    static post(model) {
        return WS.post('trcodes', model);
    }

    static getByType(trcode_type) {
        const filter = trcode_type ? [{ trcode_type: trcode_type }] : null;
        return this.get(-1, -1, [{ id: 'description', by: 'asc' }], filter);
    }

    static getByPK(primary_key) {
        return WS.getByPK('trcodes', primary_key);
    }
}

export class PaycodesWS {
    static get(size, page, orderBy, filter) {
        const order = orderBy ? orderBy : [{ id: 'description', by: 'asc' }];
        return WS.get('paycodes', { size: size, page: page, orderBy: order, filter: filter });
    }

    static post(model) {
        return WS.post('paycodes', model);
    }

    static getByType(payment_type) {
        const filter = payment_type ? [{ payment_type: payment_type }] : null;
        return this.get(-1, -1, [{ id: 'description', by: 'asc' }], filter);
    }

    static getByPK(primary_key) {
        return WS.getByPK('paycodes', primary_key);
    }
}

export class AccountsWS {
    static get(size, page, orderBy, filter) {
        const order = orderBy ? orderBy : [{ id: 'description', by: 'asc' }];
        return WS.get('accounts', { size: size, page: page, orderBy: order, filter: filter });
    }

    static post(model) {
        return WS.post('accounts', model);
    }

    static getByType(payment_type) {
        const filter = payment_type ? [{ payment_type: payment_type }] : null;
        return this.get(-1, -1, [{ id: 'description', by: 'asc' }], filter);
    }

    static getByPK(primary_key) {
        return WS.getByPK('accounts', primary_key);
    }
}

export class PartiesWS {
    static get(size, page, orderBy, filter) {
        const order = orderBy ? orderBy : [{ id: 'party_name', by: 'asc' }];
        return WS.get('parties', { size: size, page: page, orderBy: order, filter: filter });
    }

    static post(model) {
        return WS.post('parties', model);
    }

    static getByPK(primary_key) {
        return WS.getByPK('parties', primary_key);
    }
}

export class InvoicesWS {
    static get(size, page, orderBy, filter) {
        const order = orderBy ? orderBy : [{ id: 'date', by: 'desc' }];
        return WS.get('invoices', { size: size, page: page, orderBy: order, filter: filter });
    }

    static post(model) {
        return WS.post('invoices', model);
    }

    static getByPK(primary_key) {
        return WS.getByPK('invoices', primary_key);
    }
}

export class ExchratesWS {
    static get(size, page, orderBy, filter) {
        const order = orderBy ? orderBy : [{ id: 'date', by: 'desc' }];
        return WS.get('exchrates', { size: size, page: page, orderBy: order, filter: filter });
    }

    static getByDateType(fromcurrency, tocurrency, date, exchrate_type) {
        const path = `/${fromcurrency}/${tocurrency}/${date}/${exchrate_type}`;
        console.log(path);
        return WS.getByPathParams('exchrates', path);
    }

    static post(model) {
        return WS.post('exchrates', model);
    }

    static getByPK(primary_key) {
        return WS.getByPK('exchrates', primary_key);
    }

}