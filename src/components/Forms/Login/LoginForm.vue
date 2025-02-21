<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <form
      @submit.prevent="handleSubmit"
      class="p-6 rounded-lg w-full max-w-md bg-white shadow"
    >
      <p class="text-2xl font-bold text-black">Login</p>

      <InputField
        id="email"
        label="Email"
        type="text"
        v-model="email"
        placeholder="Enter email"
        :error-message="emailError"
      />
      
      <InputField
        id="password"
        label="Password"
        type="password"
        v-model="password"
        placeholder="Enter password"
      />

      <Button :disabled="!isFormValid">Log In</Button>

      <p v-if="errorMessage" class="text-red-500 mt-2 text-center font-medium">
        {{ errorMessage }}
      </p>

      <div class="mt-8 flex w-full justify-center gap-1 text-gray-500 font-medium">
        <a href="#" class="underline text-sm">Privacy Policy</a>
        <span>-</span>
        <a href="#" class="underline text-sm">Terms and Conditions</a>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import InputField from '../../Input/InputField.vue';
import Button from '../../Base/Button.vue';

const email = ref<string>('');
const password = ref<string>('');
const emailError = ref<string>('');
const errorMessage = ref<string>('');
const router = useRouter();

const validateEmail = (): void => {
  const emailRegex = /^[^@]+@[^@]+\.(com|ph)$/;
  emailError.value = emailRegex.test(email.value) ? '' : "Invalid email format.";
};

const isFormValid = computed<boolean>(() => {
  return email.value.trim() !== '' && 
         password.value.trim() !== '' &&
         emailError.value === '';
});

const handleSubmit = (): void => {
  validateEmail();
  if (!emailError.value && email.value === 'admin@gmail.com' && password.value === 'admin') {
    router.push('/dashboard');
  } else {
    errorMessage.value = 'Invalid email or password';
  }
};

watch([email, password], () => {
  validateEmail();
  errorMessage.value = ''; // Reset error when user types
});
</script>
