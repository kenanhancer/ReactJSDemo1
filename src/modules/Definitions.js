// first field is primary key
var models = {
    login: { username: 'a@a.com', password: '123' },
    invoice: {
        invoice_key: null, party_key: null, invoice_type: null, child_party_key: null, date: null, description: "", invoice_serial: "", invoice_sequence: "",
        iscanceled: false, cancel_date: null, cancel_reason: "",
        total: 0, generaltotal: 0, taxes: [],
        totalPayment: 0,  remain: 0,
        transactions: [{
            transaction_key: null,
            transaction_ref_key: null,
            invoice_key: null,
            account_key: null,
            date: null,
            trcode_key: "",
            unit_def_key: "",
            vat_trcode_key: "",
            currency: "TRY",
            description: "",
            exch_rate: 1.0,
            isvatinclude: true,
            unit_price: 0.0,
            qty: 1.0,
            net: 0.0,
            gross: 0.0,
            f_net: 0.0,
            f_gross: 0.0,
            discount_rate: 0.0,
            discount: 0.0,
            isvisible: true,
            isdeleted: false,
        }],
        payments: [{
            payment_key: null,
            payment_ref_key: null,
            invoice_key: null,
            account_key: null,
            paycode_key: null,
            paid_date: null,
            expiry_date: null,
            description: null,
            currency: 'TRY',
            exch_rate: 1,
            f_amount: 0.0,
            amount: 0.0,
            payment_status: 'WAITING',
            payment_type: 'CASH',
            document_no: '',
            isdeleted: false,
        }],
        documents: [{ document_key: null, party_key: null, ref_table: 'invoice', ref_table_key: null, description: null, document_path: null }]
    },
    party: { party_key: null, party_name: "", party_alias: "", party_type_cd: "LEGAL", tax_no: "", tax_office: "", email: "", phone: "" },
    address: { address_key: null, party_key: null, address_type_cd: "", address: "", city: "", postal_code: "", isdefault: false },
    party_role: {},
    account: { account_key: null, party_key: null, description: "", starting_balance: 0.0, cc_to_bank_day: 1, cc_to_bank_account_key: null, paycode_key: null },

    trcode: {
        trcode_key: null, party_key: null, code: "", description: "",
        trcode_type: "PRODUCT",
        trcode_cat_def_key: null,
        unit_def_key: null,
        vat_trcode_key: null,
        barcode: "",
        isvatinclude: true,
        tax_rate: 0
    },
    paycode: {
        paycode_key: null,
        party_key: null,
        code: "", description: "",
        paycode_type: "PRODUCT"
    },
    income: {},
    expense: {},
    definition: {},
};

const validations = {
    login: {
        username: { required: true, pattern: "email" },
        password: { required: true, pattern: null }
    },
    party: {
        party_name: { required: true, pattern: null },
        party_alias: { required: true, pattern: null },
        party_type: { required: true, pattern: null },
        tax_no: { required: false, pattern: null, maxlength: 11 },
        tax_office: { required: false, pattern: null },
        email: { required: false, pattern: "email" },
        phone: { required: false, pattern: "phone" }
    },
    address: {
        address_type_cd: { required: true, pattern: null },
        address: { required: true, pattern: null },
        city: { required: true, pattern: null },
        postal_code: { required: false, pattern: null },
        isdefault: { required: true, pattern: null }
    },
    trcode: {
        code: { required: true },
        description: { required: true },
        trcode_type: { required: true },
        trcode_cat_def_key: { required: false },
        unit_def_key: { required: false },
        vat_trcode_key: { required: false },
        barcode: { required: false },
        isvatinclude: { required: false },
        tax_rate: { required: true, pattern: 'number', min: 0, max: 99 }
    },
    paycode: {
        code: { required: true },
        description: { required: true },
        paycode_type: { required: true }
    }

}

export default class Definitions {
    static getModel(form) {
        return models[form];
    }

    static getValidation(form, field) {
        return validations[form];
    }
}