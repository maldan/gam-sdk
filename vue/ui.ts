import Input from './component/ui.input.vue';
import Button from './component/ui.button.vue';
import TextArea from './component/ui.textarea.vue';
import Modal from './component/ui.modal.vue';
import Select from './component/ui.select.vue';
import Icon from './component/ui.icon.vue';
import Header from './component/ui.header.vue';
import Table from './component/ui.table.vue';

import ModalApprove from './component/modal/approve.vue';
import ModalPrompt from './component/modal/prompt.vue';

export default {
  install: (app: any, options: any) => {
    app.component('ui-input', Input);
    app.component('ui-button', Button);
    app.component('ui-textarea', TextArea);
    app.component('ui-modal', Modal);
    app.component('ui-select', Select);
    app.component('ui-icon', Icon);
    app.component('ui-header', Header);
    app.component('ui-table', Table);

    app.component('modal-approve', ModalApprove);
    app.component('modal-prompt', ModalPrompt);
  },
};
