<template>

  <div class="mb-4">

    <div class="flex justify-between items-center">
      
      <label :for="id" class="block text-black font-bold text-sm">{{ label }}</label>
      
      <button
        v-if="isPassword"
        type="button"
        @click="togglePassword"
        class="text-gray-600 text-sm flex items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
        </svg>
        <span class="ml-1">{{ showPassword ? 'Hide' : 'Show' }}</span>
      </button>
    </div>

    <input
      :id="id"
      :type="isPassword && showPassword ? 'text' : type"
      :placeholder="placeholder"
      class="mt-2 w-full rounded-md border border-gray-300 text-md p-2"
      :value="modelValue"
      @input="updateValue"
    />

    <p v-if="errorMessage" class="text-red-500 text-sm mt-1">{{ errorMessage }}</p>
  </div>

</template>

<script setup lang="ts">
import { defineEmits, ref, computed } from 'vue';

interface Props {
  modelValue: string;
  label: string;
  type: string;
  id: string;
  placeholder: string;
  errorMessage?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);

const updateValue = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const isPassword = computed<boolean>(() => props.type === 'password');
const showPassword = ref<boolean>(false);

const togglePassword = (): void => {
  showPassword.value = !showPassword.value;
};
</script>
