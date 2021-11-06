export default {
  install: (app: any, options: any) => {
    // Register ui components
    const ui = require.context('./component/', true, /^.*\.vue$/).keys();
    for (let i = 0; i < ui.length; i++) {
      const name = ui[i]
        .replace('./', '')
        .replace('.vue', '')
        .replace(/\//g, '-')
        .replace(/\./g, '-');

      const sas = require('./component/' + ui[i].replace('./', ''));
      app.component(name, sas.default);
    }

    // Register components globally
    const components = require.context('@/component/', true, /^.*\.vue$/).keys();
    for (let i = 0; i < components.length; i++) {
      const name = components[i]
        .replace('./', '')
        .replace('.vue', '')
        .replace(/\//g, '-')
        .replace(/\./g, '-')
        .toLowerCase();

      const sas = require('@/component/' + components[i].replace('./', ''));
      app.component(`${name}`, sas.default);
    }
  },
};
