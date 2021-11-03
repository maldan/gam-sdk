export default {
  install: (app: any, options: any) => {
    // Register components
    const components = require.context('./component/', true, /^.*\.vue$/).keys();
    for (let i = 0; i < components.length; i++) {
      const name = components[i]
        .replace('./', '')
        .replace('.vue', '')
        .replace(/\//g, '-')
        .replace(/\./g, '-');

      const sas = require('./component/' + components[i].replace('./', ''));
      app.component(name, sas.default);
    }

    // Register modals
    const modals = require.context('@/component/modal/', true, /^.*\.vue$/).keys();
    for (let i = 0; i < modals.length; i++) {
      const name = modals[i]
        .replace('./', '')
        .replace('.vue', '')
        .replace(/\//g, '-')
        .replace(/\./g, '-')
        .toLowerCase();

      const sas = require('@/component/modal/' + modals[i].replace('./', ''));
      app.component(`modal-${name}`, sas.default);
    }
  },
};
