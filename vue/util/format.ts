export default {
  install: (app: any, options: any) => {
    app.directive('v-markdown', {
      created(el: any, binding: any, vnode: any, prevVnode: any) {
        console.log(el);
      },
    });
  },
};
