export default {
  install: (app: any, options: unknown) => {
    app.directive('doubleclick', {
      created(el: HTMLElement, binding: any, vnode: any, prevVnode: any) {
        let clicks = 0;
        let timer = null as any;

        el.addEventListener('click', (e: MouseEvent) => {
          clicks += 1;

          if (clicks === 1) {
            timer = setTimeout(() => {
              clicks = 0;
            }, 300);
          } else {
            clearTimeout(timer);
            clicks = 0;
            binding?.value();
          }
        });
      },
    });
  },
};
