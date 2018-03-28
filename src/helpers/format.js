import locale from 'locale';

export default class format {
    static date = (value) => {
        return (new Date(Date.parse(value))).toLocaleDateString(locale.getLanguage());
    }
    static datetime = (value) => {
        let date = new Date(Date.parse(value));
        return date.toLocaleDateString(locale.getLanguage()) + ' ' + date.toLocaleTimeString(locale.getLanguage());
    }
    static currencyTemplate = (obj, fields) => {  // fields amount, currency, exch_rate
        return new Intl.NumberFormat(locale.getLanguage(), { style: 'currency', currency: obj[fields[1]] }).format(obj[fields[0]]) + " x " + obj[fields[2]];
    }
    static string = (fmtstr, args) => {
        return fmtstr.replace(/\{(\d+)\}/g,(match, index) => {
            return args[index];
        });
    }
    static stringByObject = (format, obj, args) => {
        return format.replace(/\{(\d+)\}/g, (match, index) => {
            return obj[args[index]];
        });
    }
    static number = (value, currency) => {
        let lang = locale.getLanguage();
        if (currency){
            if (currency === 'TRY' && lang != 'tr')
                lang='tr';
            return new Intl.NumberFormat(lang, { style: 'currency', currency: currency }).format(value);
        }
        else
            return new Intl.NumberFormat(lang).format(value);
    }
}