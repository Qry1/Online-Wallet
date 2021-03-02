<template>
  <div v-if="message" :class="['alert', message.type]">
    <p class="alert-title" v-if="title">{{ title }}</p>
    <p>{{ message.value }}</p>
    <span class="alert-close" @click="close">&times;</span>
  </div>
</template>

<script>
  import { computed } from 'vue';
  import {useStore} from 'vuex';

  export default {
    name: "AppMessage",
    setup() {
      const store = useStore();

      const titleMap = {
        primary: 'Успешно!',
        danger: 'Ошибка!',
        warning: 'Внимание!'
      }

      const message = computed(() => store.state.message);
      const title = computed(() => message.value ? titleMap[message.value.type] : null)

      return {
        message,
        title,
        close: () => store.commit('clearMessage')
      }
    }
  }

</script>

<style scoped>

</style>