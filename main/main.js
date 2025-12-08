// Import Vue createApp from global Vue object (CDN build exposes Vue globally)
const { createApp } = Vue;

// Create the app using the `App` component defined in app.js and mount to #app
createApp(App).mount('#app');
