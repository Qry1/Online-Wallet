<template>
  <app-loader v-if="loading"></app-loader>
  <app-page back v-else-if="request" title="Заявка">
    <p><strong>Имя:</strong> {{ request.name }}</p>
    <p><strong>Телефон:</strong> {{ request.phone }}</p>
    <p><strong>Сумма:</strong> {{ currency(request.amount) }}</p>
    <p><strong>Статус:</strong> <app-status :type="request.status"/></p>

    <div class="form-control">
      <label for="status">Статус</label>
      <select id="status" v-model="status">
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>

    <button class="btn danger" @click="remove">Удалить</button>
    <button class="btn" @click="update" v-if="hasChanges">Обновить</button>
  </app-page>
  <h3 v-else class="text-center text-white">Такой заявки нет</h3>
</template>

<script>
  import AppPage from "@/components/ui/AppPage";
  import {useRoute, useRouter} from 'vue-router';
  import {ref, onMounted, computed} from 'vue';
  import {useStore} from "vuex";
  import AppLoader from "@/components/ui/AppLoader";
  import AppStatus from "@/components/ui/AppStatus";
  import {currency} from "@/utils/currency";

  export default {
    name: "Request",
    components: {
      AppPage,
      AppLoader,
      AppStatus
    },
    setup() {
      const route = useRoute();
      const router = useRouter()
      const loading = ref(true);
      const status = ref();
      const store = useStore();
      const request = ref({});


      onMounted(async () => {
        loading.value = true;
        request.value = await store.dispatch('request/loadById', route.params.id)
        status.value = request.value?.status
        loading.value = false;
      });

      const hasChanges = computed(() => request.value.status !== status.value)

      const remove = async () => {
        await store.dispatch('request/remove', route.params.id);
        router.push('/')
      };

      const update = async () => {
        const data = {...request.value, status: status.value, id: route.params.id}
        await store.dispatch('request/update', data);
        request.value.status = status.value
      }

      return {
        loading,
        request,
        status,
        currency,
        hasChanges,
        remove,
        update
      }
    }
  }
</script>

<style scoped>

</style>