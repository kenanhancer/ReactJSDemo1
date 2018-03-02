var locale = () => (
    {
        pages: {
            login: "En kolay muhasebe uygulaması Haskee'ye hoşgeldiniz.",
            party_form: 'MÜŞTERİ / TEDARİKÇİ',
            party_list: 'MÜŞTERİ / TEDARİKÇİ LİSTESİ',
            address_list: 'ADRESLER',
            address: 'ADRES',
            cash_list: 'KASA HESAPLARI',
            cash_form: 'KASA HESAP TANIMI',
            cc_list: 'KREDI KARTI HESAPLARI',
            cc_form: 'KREDI KARTI HESAP TANIMI',
            bank_list: 'BANKA HESAPLARI',
            bank_form: 'BANKA HESAP TANIMI',
            cheque_list: 'ÇEK HESAPLARI',
            cheque_form: 'ÇEK HESAP TANIMI',
            billacc_list: 'SENET HESAPLARI',
            billacc_form: 'SENET HESAP TANIMI',
            trcode_list: 'HİZMET / ÜRÜN TANIMLARI',
            trcode_form: 'HİZMET / ÜRÜN TANIMI',
            paycode_list: 'ÖDEME TANIMLARI',
            paycode_form: 'ÖDEME TANIMI',
            account_transactions: 'HESAP HAREKETLERİ',
            sales_list: 'SATIŞ FATURALARI',
            sales_form: 'SATIŞ FATURASI',
            purchase_list: 'ALIŞ FATURALARI',
            purchase_form: 'ALIŞ FATURASI',
            payment_plan: 'ÖDEME PLANI',
            document_list: 'BELGELER'
        },
        party_types: [
            { code: 'LEGAL', description: 'Tüzel' },
            { code: 'PERSON', description: 'Gerçek' }
        ],
        invoice_types: [
            { code: 'SALES', description: 'Satış' },
            { code: 'PURCHASE', description: 'Alış' }
        ],
        trcode_types: [
            { code: 'PRODUCT', description: 'Ürün/Hizmet' },
            { code: 'VAT', description: 'KDV' },
            { code: 'TAX', description: 'Diğer Vergi' }
        ],
        payment_types: [
            { code: 'CASH', description: 'Nakit' },
            { code: 'BANK', description: 'Banka' },
            { code: 'CC', description: 'Kredi Kartı' },
            { code: 'CHEQUE', description: 'Çek' },
            { code: 'BILLACC', description: 'Senet' },
            { code: 'OTHER', description: 'Diğer' }
        ],
        payment_status: [
            { code: 'PAID', description: 'Ödendi' , color:'bg-blue'},
            { code: 'WAITING', description: 'Bekliyor', color:'bg-yellow' },
            { code: 'DELAYED', description: 'Gecikmiş', color:'bg-red' }
        ],
        fields: {
            username: {
                title: 'E-Posta',
                placeHolder: 'E-Posta'
            },
            password: {
                title: 'Şifre',
                placeHolder: 'Şifre'
            },
            party_name: {
                title: 'Ünvan / İsim',
            },
            party_alias: {
                title: 'Kodu',
            },
            party_type: {
                title: 'Tipi',
            },
            tax_no: {
                title: 'TCKN / Vergi No',
                placeHolder: 'Tüzel ise vergi numarasını, gerçek kişi ise TC kimlik numarasını giriniz'
            },
            tax_office: {
                title: 'Vergi Dairesi',
            },
            email: {
                title: 'E-Posta',
                placeHolder: 'Bildirimler için e-posta adresini girmelisiniz.'
            },
            phone: {
                title: 'Telefon',
                placeHolder: 'Bildirimler için telefon numarasını girmelisiniz.'
            },
            address_type_cd: {
                title: 'Adres Tipi',
            },
            address: {
                title: 'Adres',
            },
            city: {
                title: 'Şehir',
            },
            postal_code: {
                title: 'Posta Kodu',
            },
            isdefault: {
                title: 'Varsayılan',
            },
            code: {
                title: 'Kodu'
            },
            description: {
                title: 'Açıklama'
            },
            trcode_key: {
                title: 'Ürün/Hizmet'
            },
            trcode_type: {
                title: 'Ürün/Hizmet Tipi'
            },
            trcode_cat_def_key: {
                title: 'Ürün Kategori'
            },
            trcode_cat_def_description: {
                title: 'Kategori'
            },
            unit_def_key: {
                title: 'Birim'
            },
            unit_def_description: {
                title: 'Birim'
            },
            vat_trcode_key: {
                title: 'KDV'
            },
            vat_trcode_description: {
                title: 'KDV'
            },
            tax_rate: {
                title: 'Vergi Oranı'
            },
            isvatinclude: {
                title: 'KDV Dahil'
            },
            visible: {
                title: 'Faturada Görünür'
            },
            barcode: {
                title: 'Barkod'
            },
            validationrule: {
                title: 'Geçerlilik Kuralı'
            },
            paycode_key: {
                title: 'Ödeme Kodu'
            },
            paycode_type: {
                title: 'Ödeme Tipi'
            },
            balance: {
                title: 'Bakiye'
            },
            starting_balance: {
                title: 'Başlangıç Bakiyesi'
            },
            cc_to_bank_day: {
                title: 'Banka Aktarım Günü',
                placeHolder: ''
            },
            cc_to_bank_account_key: {
                title: 'Banka Hesabı',
                placeHolder: 'Banka aktarımı için banka hesabını seçiniz...'
            },
            paycode_description: {
                title: 'Ödeme Tanımı'
            },
            amount: {
                title: 'Tutar'
            },
            payment_status: {
                title: 'Ödeme Durumu'
            },
            date: {
                title: 'Tarih'
            },
            paid_date: {
                title: 'Ödeme Tarihi'
            },
            expiry_date: {
                title: 'Vade Tarihi'
            },
            total: {
                title: 'Toplam'
            },
            paid: {
                title: 'Ödenen'
            },
            remaining: {
                title: 'Kalan'
            },
            last_payment_date: {
                title: 'Son Ödeme Tarihi'
            },
            invoice: {
                title: 'Fatura'
            },
            invoice_serial: {
                title: 'Seri'
            },
            invoice_sequence: {
                title: 'Sıra No'
            },
            ineffective_stock: {
                title: 'Stoğu Etkilemez'
            },
            customer_name: {
                title: 'Müşteri'
            },
            supplier_name: {
                title: 'Tedarikçi'
            },
            unit_price: {
                title: 'Birim Fiyat'
            },
            qty: {
                title: 'Miktar'
            },
            net: {
                title: 'Net'
            },
            gross: {
                title: 'Brüt'
            },
            account_key: {
                title: 'Hesap'
            },
            currency: {
                title: 'Para Birimi'
            },
            exch_rate: {
                title: 'Kur'
            },
            f_amount: {
                title: 'Döviz'
            },
            document_no: {
                title: 'Belge'
            },
            cheque_no: {
                title: 'Çek Numarası'
            },
            iban: {
                title: 'IBAN'
            },
            discount_rate: {
                title: 'İndirim Oranı'
            },
            discount: {
                title: 'İndirim'
            },
            iscanceled: {
                title: 'İptal edildi mi?'
            },
            cancel_reason: {
                title: 'İptal Sebebi'
            },
            cancel_date: {
                title: 'İptal Tarihi'
            },
        },

        components: {
            combobox: {
                new: 'Yeni',
                loading: 'Yükleniyor...',
                notfound: 'Kayıt Bulunamadı!'
            },
            datatable: {
                new: 'Yeni',
                loading: 'Yükleniyor...',
                notfound: 'Kayıt Bulunamadı!'
            }
        },
        buttons: {
            new: 'Yeni',
            newaddress: 'Yeni Adres',
            cancel: 'Vazgeç',
            save: 'Kaydet',
            savenew: 'Kaydet/Yeni',
            login: 'Giriş',
            logout: 'Çıkış',
            remove: 'Sil',
            refresh: 'Tekrar Yükle',
            invoice_print: 'Fatura Yazdır',
            invoice_refund: 'İade Fatura Yazdır',
            invoice_cancel: 'Faturayı İptal Et',
            options:'Seçenekler',
            forgotpassword: 'Şifremi Unuttum',
            registernow: 'Üyelik Oluştur',
        },
        invoice: {
            total: 'Toplam',
            vat: 'KDV',
            tax: 'Vergi',
            discount: 'İskonto',
            generaltotal: 'Genel Toplam',
            paymenttotal: 'Ödeme Toplamı',
            remain: 'Bakiye',
            invoiceproduct_tab: 'Ürün/Hizmet Detayları',
            invoicepayment_tab: 'Ödeme Bilgileri',
            invoicedocs_tab: 'Belgeler',
            invoice_canceled: 'Fatura İptal Edildi !',
        },
        messages: {    
            required: '{0} gereklidir !',
            alreadyExists: '{0} zaten tanımlı !',
            username_pattern: 'E-Posta adresi geçerli değil !',
            email_pattern: 'E-Posta adresi geçerli değil !',
            password_pattern: 'Şifreniz en az 8 karakter olmalıdır.Ayrıca en az bir rakam ve büyük harf içermelidir.',
            tax_rate_pattern: 'KDV oranını 0 ile 99 arasında giriniz.',
            norecordfound: 'Kayıt bulunamadı !',
            notfound: 'Kayıt bulunamadı!',
            networkerror: 'Lütfen internet bağlantınızı kontrol edin!',
            missingparameter: 'Eksik parametre verildi. Lütfen verilen parametreleri kontrol edin!',
            tablefooter_nof_recs: 'Toplam kayıt sayısı {0}',
            atmostonenewrecord:'En fazla bir tane yeni kayıt olabilir!'
        },
        formats: {
            date: 'dd.mm.yyyy',
            
        }
    }
);

module.exports = locale;