import Input from './component/ui.input.vue';
import Button from './component/ui.button.vue';
import TextArea from './component/ui.textarea.vue';
import Modal from './component/ui.modal.vue';
import Select from './component/ui.select.vue';
import Icon from './component/ui.icon.vue';

export default {
  install: (app: any, options: any) => {
    app.component('ui-input', Input);
    app.component('ui-button', Button);
    app.component('ui-textarea', TextArea);
    app.component('ui-modal', Modal);
    app.component('ui-select', Select);
    app.component('ui-icon', Icon);
  },
};
