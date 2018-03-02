import Locale from 'modules/Locale';

export default class Formatter {
    static dateFormat = (value) => {
        return (new Date(Date.parse(value))).toLocaleDateString(Locale.getLanguage());
    }
    static datetimeFormat = (value) => {
        let date = new Date(Date.parse(value));
        return date.toLocaleDateString(Locale.getLanguage()) + ' ' + date.toLocaleTimeString(Locale.getLanguage());
    }
    static currencyTemplateFormat = (obj, fields) => {  // fields amount, currency, exch_rate
        return new Intl.NumberFormat(Locale.getLanguage(), { style: 'currency', currency: obj[fields[1]] }).format(obj[fields[0]]) + " x " + obj[fields[2]];
    }
    static stringFormat = (fmtstr, args) => {
        return fmtstr.replace(/\{(\d+)\}/g,(match, index) => {
            return args[index];
        });
    }
    static stringFormatByObject = (format, obj, args) => {
        return format.replace(/\{(\d+)\}/g, (match, index) => {
            return obj[args[index]];
        });
    }
    static numberFormat = (value, currency) => {
        if (currency)
            return new Intl.NumberFormat(Locale.getLanguage(), { style: 'currency', currency: currency }).format(value);
        else
            return new Intl.NumberFormat(Locale.getLanguage()).format(value);
    }
}