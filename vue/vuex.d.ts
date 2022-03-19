import { Store } from 'vuex';
import { MainTree } from '@/store';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<MainTree>;
  }
}
