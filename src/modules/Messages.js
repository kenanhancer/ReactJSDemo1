import Locale from 'modules/Locale';

export default class Messages {
    static getRequestErrorMessage(error) {
        console.log(error);
        if (error.message === "Network Error")
            return { type: "danger", text: Locale.getMessage("networkerror") };

        return { type: "warning", text: error.message };
    }

    static getErrorMessage(error) {
        return { type: "danger", text: Locale.getMessage(error) };        
    }
}