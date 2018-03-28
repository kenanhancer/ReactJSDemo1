import locale from 'locale';

const patterns = {
    email: "^((([a-z]|\\d|[!#\\$%&'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|"
        + "[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])+(\\.([a-z]|\\d|[!#\\$%&'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|"
        + "[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])+)*)|((\\x22)((((\\x20|\\x09)*(\\x0d\\x0a))?(\\x20|\\x09)+)?"
        + "(([\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x7f]|\\x21|[\\x23-\\x5b]|[\\x5d-\\x7e]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|"
        + "(\\\\([\\x01-\\x09\\x0b\\x0c\\x0d-\\x7f]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]))))*(((\\x20|\\x09)*(\\x0d\\x0a))?(\\x20|\\x09)+)?"
        + "(\\x22)))@((([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])"
        + "([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])*([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))\\.)+"
        + "(([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])([a-z]|\\d|-|\\.|_|~|"
        + "[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])*([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))\\.?$"
        ,
    password: "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}",
    phone:"(?([0-9]{3})\\)?([ .-]?)([0-9]{3})\\2([0-9]{4})"
}
class Validator
{
    static isValid(fieldname, value, validation) {
        if (validation.required && !value) {
            const title = locale.getField(fieldname).title;
            return locale.getMessage('required', title);
        }

        if (validation.pattern && validation.pattern in patterns) {
            let re = new RegExp(patterns[validation.pattern]);
            if (!re.test(value)) {
                return locale.getMessage(fieldname + "_pattern");
            }
        }

        if (validation.min && value < validation.min)
            return locale.getMessage(fieldname + "_pattern");

        if (validation.max && value > validation.max)
            return locale.getMessage(fieldname + "_pattern");

        if (validation.minLength && value.length < validation.minLength)
            return locale.getMessage(fieldname + "_pattern");

        if (validation.maxLength && value.length < validation.maxLength)
            return locale.getMessage(fieldname + "_pattern");

        return null;
    } 
    
    static getValidationClass(validation) {
        let ret = { className : "", icon : null };
        if (validation) {
            switch (validation.Type) {
                case "error": ret.className = " has-error"; break;
                case "warning": ret.className = " has-warning"; break;
                default: //success
                    ret.className = " has-success"; 
            }
            if (validation.showIcon === true) {
                ret.className += " input-icon right";
                switch (validation.Type) {
                    case "error": ret.icon = "fa fa-exclamation tooltips"; break;
                    case "warning": ret.icon = "fa fa-warning tooltips"; break;
                    default: // "success": 
                        ret.icon = "fa fa-check tooltips";
                }
            }
        }
        return ret;
    }
}

export default Validator;    