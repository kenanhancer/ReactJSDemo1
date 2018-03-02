import Auth from 'modules/Auth';
import tr from 'modules/locale_tr';
import en from 'modules/locale_en';

export default class Locale {
    static getLanguage() {
        var lang = Auth.getUserLocale(); //tr,en
        if (!lang) //not logged in 
            lang = navigator.language || navigator.userLanguage || 'tr';
        return lang;
    }

    static getLocale(category, field, args) {

        var locale = null;
        var lang = this.getLanguage();
        switch (lang) {
            case en:
                locale = en();
                break;
            default:
                locale = tr();
                break;
        }
        if (!locale)
            return field + ' !!';

        if (!field)
            return locale[category];

        let value = locale[category][field];
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