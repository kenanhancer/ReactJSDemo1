import React from 'react';
import store from 'redux/store';

export default class BaseComponent extends React.Component {
    connect(reducers = []) {
        this.storeSubkey = store.subscribe(this.storeListener.bind(this, reducers));
    }

    componentWillUpdate() {
        console.log('componentWillUpdate');
        if (this.tables) {
            console.log('this tables component will update');
            const lang = store.getState().language.current;
            console.log(this.tables);
            if (this.currentLanguage !== lang) {
                this.currentLanguage = lang;
                this.createColumns();
            }
            this.calculateTableSize();
        }
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
        if (this.storeSubkey) // unsubscribe
            this.storeSubkey();
    }

    calculateTableSize() {
        console.log('calculateTableSize');
        const container = store.getState().container;
        this.tables.forEach(dt => {
            let scroll = { y: container.rect.height };
            
            if (this.tableContainer) {
                const rect = this.tableContainer.getBoundingClientRect();
                if (rect.width < dt.width)
                    scroll["x"] = dt.width;

                scroll.y = scroll.y - rect.top;
                if (scroll.y < 200)
                    scroll.y = 200;
            }
            dt.scroll = scroll;
        });
    }
    
    // reducer  string or object {name:'', props:[]}
    storeListener(reducers = []) {
        let storeState = store.getState();
        let newState = {};
        reducers.forEach(reducer => {
            if (typeof (reducer) === "object" && reducer.props)
                reducer.props.forEach(prop => {
                    let obj = {};
                    obj[prop] = storeState[reducer.name][prop];
                    newState = Object.assign({}, newState, obj);
                });
            else
                newState = Object.assign({}, newState, { ...storeState[reducer] });

        });
        if (this.state !== newState) {
            if (this.mounted)
                this.setState(newState);
            else
                // eslint-disable-next-line
                this.state = newState;
        }
    }
}