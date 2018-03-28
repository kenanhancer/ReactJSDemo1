const init = { current: 'tr' };

export function language(state = init, action) {
    switch (action.type) {
        case 'LANGUAGE':
            return { ...state, current: action.current };
        default:
            return state;
    }
}
