import { createApp } from 'vue';
import Dashboard from './components/Dashboard.vue';

const mount = (el) => {
    const app = createApp(Dashboard);
    app.mount(el);
}
// If we are in development and in isolation, call mount immediately
// We are using the id '_marketing-dev-root' to identify the element
if(process.env.NODE_ENV === 'development'){
    const el = document.querySelector('#_dashboard-dev-root');
    if(el){
        mount(el);
    }
}

// we are exporting the mount function so that the container can call it
export { mount };