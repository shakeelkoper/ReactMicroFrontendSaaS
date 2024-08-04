import React from 'react';
import ReactDOM from 'react-dom';
import {createMemoryHistory, createBrowserHistory} from 'history';
import App from './App';

const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    });
    if(onNavigate){
        history.listen(onNavigate);
    }
    ReactDOM.render(<App onSignIn={onSignIn} history={history}/>, el);
    return{
        onParentNavigate({ pathname: nextPathname }){
            const { pathname } = history.location;
            if(pathname !== nextPathname){
                history.push(nextPathname)
            }
        }
    }
}
// If we are in development and in isolation, call mount immediately
// We are using the id '_marketing-dev-root' to identify the element
if(process.env.NODE_ENV === 'development'){
    const el = document.querySelector('#_auth-dev-root');
    if(el){
        mount(el, { defaultHistory: createBrowserHistory() });
    }
}

// we are exporting the mount function so that the container can call it
export { mount };