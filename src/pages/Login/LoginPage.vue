<template>
  <div class="login-page">
    <LoginForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginForm from '@/components/Forms/Login/LoginForm.vue';

export default defineComponent({
  name: 'LoginPage',
  components: { LoginForm },
});
</script>
