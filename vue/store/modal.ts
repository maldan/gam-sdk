import { ActionContext } from 'vuex';
import { MainTree } from '../../../store';

export type ModalStore = {
  name: string;
  data: any;
  func: () => void;
  onSuccess: () => void;
  cloneData: () => any;
};
export type ModalActionContext = ActionContext<ModalStore, MainTree>;

export default {
  namespaced: true,
  state: {
    name: '',
    data: {},
    func: () => {},
    onSuccess: () => {},
    cloneData() {
      return JSON.parse(JSON.stringify(this.data));
    },
  },
  mutations: {
    SET_MODAL(state: ModalStore, payload: any) {
      state.name = payload.name;
      state.data = payload.data;
      state.func = payload.func || function () {};
      state.onSuccess = payload.onSuccess || function () {};
    },
  },
  actions: {
    show({ commit }: any, payload: any) {
      commit('SET_MODAL', payload);
    },
    close({ commit }: any) {
      commit('SET_MODAL', {});
    },
    ok({ state, commit }: any) {
      state?.func();
      state?.onSuccess();
      commit('SET_MODAL', {});
    },
  },
};
