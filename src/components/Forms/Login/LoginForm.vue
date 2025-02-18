<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <form
      @submit.prevent="handleSubmit"
      class="p-6 rounded-lg w-full max-w-md bg-white shadow"
    >
      <p class="text-2xl font-bold text-black">Login</p>

      <div class="mb-4 mt-4">
        <label for="email" class="block text-black font-bold text-sm">Email</label>
        <input
          v-model="email"
          @input="validateEmail"
          type="text"
          class="mt-2 w-full rounded-md border border-gray-300 text-md p-2"
          placeholder="Enter email"
        />
        <p v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</p>
      </div>

      <div class="mb-2">
        <div class="flex w-full justify-between">
          <label for="password" class="block text-black font-bold text-sm">Password</label>
          <button
            type="button"
            @click="togglePassword"
            class="flex items-center text-sm text-cyan-600 font-medium focus:outline-none space-x-1"
          >
            <svg
              v-if="showPassword"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-eye"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
              />
              <path
                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-eye"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"
              />
              <path
                d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"
              />
            </svg>
            <span>{{ showPassword ? 'Hide' : 'Show' }}</span>
          </button>
        </div>

        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          class="mt-2 w-full rounded-md border border-gray-300 text-md p-2"
          placeholder="Enter password"
        />
      </div>

      <button
        :disabled="!isFormValid"
        class="w-full mt-2 p-2 rounded-md text-white"
        :class="
          isFormValid
            ? 'bg-cyan-600 hover:bg-cyan-700'
            : 'bg-gray-300 cursor-not-allowed'
        "
      >
        Log In
      </button>

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

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router'; // Import Vue Router

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const email = ref('');
    const password = ref('');
    const showPassword = ref(false);
    const errorMessage = ref('');
    const emailError = ref('');
    const router = useRouter(); // Initialize Vue Router

    // Email validation function
    const validateEmail = () => {
      const emailRegex = /^[^@]+@[^@]+\.(com|ph)$/;
      if (!emailRegex.test(email.value)) {
        emailError.value =
          "Invalid email. Must contain '@' and end with '.com' or '.ph'.";
      } else {
        emailError.value = '';
      }
    };

    // Check if form is valid
    const isFormValid = computed(() => {
      return (
        email.value.trim() !== '' &&
        password.value.trim() !== '' &&
        emailError.value === ''
      );
    });

    const handleSubmit = () => {
      validateEmail();
      if (emailError.value) return;

      if (email.value === 'admin@gmail.com' && password.value === 'admin') {
        // Navigate to dashboard after successful login
        router.push('/dashboard');
      } else {
        errorMessage.value = 'Invalid email or password';
      }
    };

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    return {
      email,
      password,
      showPassword,
      errorMessage,
      emailError,
      isFormValid,
      handleSubmit,
      togglePassword,
      validateEmail,
    };
  },
});
</script>
