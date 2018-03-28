import tr from 'locale/locale_tr';
import en from 'locale/locale_en';
import store from 'redux/store';
import moment from 'moment';
import 'moment/locale/tr';

var current = null;

export default class locale {
    static getLanguage() {
        return store.getState().language.current;
    }

    static setLanguage(lang='tr'){
        store.dispatch({ type: 'LANGUAGE', current: lang });
        moment.locale(lang);
        switch (lang) {
            case 'en':
                current = en();
                break;
            default:
                current = tr();
        }
    }

    static getLocale(category, field, args) {
        if (!current)
            return field + ' !!';

        if (!field)
            return current[category];

        let value = current[category][field];
        if (!value)
            return field + ' !!';

        if (args) {
            if (typeof (args) === 'object')
                value = value.replace(/\{(\d+)\}/g, (match, index) => { return args[index]; });
            else
                value = value.replace(/\{(\d+)\}/g, (match, index) => { return args; });
        }
        return value;
    }

    static getPage(page) {
        return this.getLocale('pages', page);
    }

    static getMessage(field, args) {
        return this.getLocale('messages', field, args);
    }

    static getField(field, params) {
        return this.getLocale('fields', field, params);
    }

    static getComponent(field) {
        return this.getLocale('components', field);
    }

    static getButton(button) {
        return this.getLocale('buttons', button);
    }

    static getCategory(cat) {
        return this.getLocale(cat);
    }
    static getFormat(format) {
        return this.getLocale('formats', format);
    }
}