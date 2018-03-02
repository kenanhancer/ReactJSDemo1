var locale = () => (
    {
        pages: {
            login: 'Welcome to Haskee is easiest accounting programme.',
            party_form:'CUSTOMER / SUPPLIER',
            address_list:'ADDRESSES',
            address: 'ADDRESS',
            cash_list: 'CASH ACCOUNTS',
            cash_form: 'CASH ACCOUNT',
            cc_list: 'CREDIT CARD ACCOUNTS',
            cc_form: 'CREDIT CARD ACCOUNT',
            bank_list: 'BANK ACCOUNTS',
            bank_form: 'BANK ACCOUNT',
            cheque_list: 'CHEQUE ACCOUNTS',
            cheque_form: 'CHEQUE ACCOUNT',
            billacc_list: 'BILL ACCOUNTS',
            billacc_form: 'BILL ACCOUNT',
            trcode_list: 'SERVICE / PRODUCT DEFINITIONS',
            trcode_form: 'SERVICE / PRODUCT',
            paycode_list: 'PAYMENT DEFINITIONS',
            paycode_form: 'PAYMENT DEFINITION',
            account_transactions: 'ACCOUNT TRANSACTIONS',
            sales_list: 'SALES INVOICES',
            sales_form: 'SALES INVOICE',
            purchase_list: 'PURCHASE INVOICES',
            purchase_form: 'PURCHASE INVOICE',
            payment_plan:'PAYMENT PLAN'
        },
        party_types: [
            {code:'LEGAL',description:'Legal Firm'},
            {code:'PERSON',description:'Person'}
        ],
        invoice_types: [
            { code: 'SALES', description: 'Sales' },
            { code: 'PURCHASE', description: 'Purchase' }
        ],        
        trcode_types: [
            {code:'PRODUCT',description:'Product/Service'},
            { code: 'VAT', description: 'VAT'},
            { code: 'TAX', description: 'Other TAX' }
        ],
        payment_types: [
            {code:'CASH',description:'Cash'},
            {code:'BANK',description:'Bank'},
            {code:'CC',description:'Credit Card'},
            {code:'CHEQUE',description:'Cheque'},
            {code:'BILLACC',description:'Bill'},
            {code:'OTHER',description:'Other'}
        ],
        payment_status: [
            { code: 'PAID', description: 'PAID', color:'bg-blue' },
            { code: 'WAITING', description: 'WAITING', color:'bg-yellow' },
            { code: 'DELAYED', description: 'DELAYED', color:'bg-red' }
        ],        
        fields: {
            username: {
                title: 'E-Mail',
                placeHolder: 'E-Mail'
            },
            password: {
                title: 'Password',
                placeHolder: 'Password'
            },
            party_name: {
                title: 'Title / Name',
            },
            party_alias: {
                title: 'Code',
            },
            party_type: {
                title: 'Type',
            },
            tax_no: {
                title: 'ID / Tax Number',
                placeHolder:''
            },
            tax_office: {
                title: 'Tax Office',
            },
            email: {
                title: 'E-Mail',
                placeHolder:'E-Mail should be entered for notifications'
            },
            phone: {
                title: 'Phone',
                placeHolder:'Phone should be entered for notifications'
            },
            address_type_cd: {
                title: 'Address Type',
            },
            address: {
                title: 'Address ',
            },
            city: {
                title: 'City',
            },
            postal_code: {
                title: 'Postal Code',
            },
            isdefault: {
                title: 'Default',
            },            
            code: {
                title: 'Code'
            },
            description: {
                title: 'Description'
            },
            trcode_key: {
                title: 'Ürün/Hizmet'
            },            
            trcode_type: {
                title: 'Product/Service Type'
            },
            trcode_cat_def_key: {
                title: 'Category'
            },
            trcode_cat_def_description: {
                title: 'Category'
            },
            unit_def_key: {
                title: 'Unit'
            },
            unit_def_description: {
                title: 'Unit'
            },
            vat_trcode_key: {
                title: 'VAT'
            },
            vat_trcode_description: {
                title: 'VAT'
            },
            tax_rate: {
                title: 'TAX Rate'
            },
            isvatinclude: {
                title: 'VAT Included?'
            },
            visible:{
                title: 'Visible on Billing'
            },
            barcode: {
                title: 'Barcode'
            },
            validationrule: {
                title: 'Validation Rule'
            },
            paycode_key: {
                title:'Payment Code'
            },
            paycode_type: {
                title:'Payment Type'
            },
            balance: {
                title:'Balance'
            },
            starting_balance: {
                title:'Starting Balance'
            },
            cc_to_bank_day: {
                title:'Bank Transfer Day'
            },
            cc_to_bank_account_key: {
                title:"Bank Transfer's Account"
            },
            paycode_description: {
                title: 'Payment Definition'
            },
            f_amount: {
                title: 'Amount in Currency'
            },
            amount: {
                title: 'Amount'
            },
            payment_status: {
                title: 'Payment Status'
            },
            date: {
                title:'Date'
            },
            paıd_date: {
                title:'Paid Date'
            },
            expiry_date: {
                title:'Expiry Date'
            },
            total: {
                title: 'Total'
            },
            paid: {
                title: 'Paid'
            },
            remaining: {
                title: 'Remaining'
            },
            last_payment_date: {
                title: 'Last Payment Date'
            },
            invoice: {
                title: 'Invoice'
            },
            invoice_serial: {
                title: 'Serial'
            },
            invoice_sequence: {
                title: 'Order'
            },
            ineffective_stock: {
                title: 'Ineffective Stock'
            },
            customer_name: {
                title: 'Customer Name'
            },
            supplier_name: {
                title: 'Supplier Name'
            },
            unit_price: {
                title:'Unit Price'
            },
            qty: {
                title:'Qty'
            },
            net: {
                title:'Net'
            },
            gross: {
                title:'Gross'
            },
            discount_rate: {
                title: 'Discount Rate%'
            },
            discount: {
                title: 'Discount'
            },
            iscanceled: {
                title: 'Is Canceled?'
            },
            cancel_reason: {
                title: 'Cancel Reason'
            },
            cancel_date: {
                title: 'Cancel Date'
            },

        },
        components: {
            combobox: {
                new: 'New',
                loading: 'Loading...',
                notfound: 'No Records Found!'
            },
            datatable: {
                new: 'New',
                loading: 'Loading...',
                notfound: 'No Records Found!'
            }
        },
        buttons: {
            new: 'New',
            newaddress: 'New Address',            
            cancel: 'Cancel',
            save: 'Save',
            savenew: 'Save/New',
            login: 'Login',
            logout: 'Logout',
            remove: 'Remove',
            refresh: 'Refresh',
            invoice_print: 'Print Invoice',
            invoice_refund: 'Refund Invoice',
            invoice_cancel: 'Cancel Invoice',
            options: 'Options',
            forgotpassword: 'Forgot Password',
            registernow: 'Create an Account',
        },
        invoice: {
            total: 'Total',
            vat: 'VAT',
            tax: 'TAX',
            discount: 'Discount',
            generaltotal: 'General Total',
            paymenttotal: 'Payment Total',
            remain: 'Balance',            
            invoiceproduct_tab: 'Product/Service Details',
            invoicepayment_tab: 'Payment Info',
            invoicedocs_tab: 'Documents',
            invoice_canceled: 'Invoice Canceled !',
        },
        messages: {
            required: '{0} required !',
            alreadyExists: '{0} already exists !',
            username_pattern: 'E-Mail is not valid !',
            password_pattern: 'Your password must be 8 characters at least. It must contain a number and uppercase letter at least.',
            tax_rate_pattern: "Tax rate's range must be 0 and 99.",
            norecordfound: 'No Records Found!',
            forgetpasswordlink: "Don't worry, click here to recover your password.",
            signuplink: 'Create new account',
            notfound: 'No records found!',
            networkerror: 'Please check your internet connection!',
            missingparameter: 'Missing parameter. Please check given parameters!',
            tablefooter_nof_recs: 'Number of records {0}',
            atmostonenewrecord:'There can be at most one new record'
        },
        formats: {
            date: 'dd-mm-yyyy',
        }
    }
);

module.exports = locale;