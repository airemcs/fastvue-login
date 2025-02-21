<template>
  <button
    class="w-full mt-2 p-2 rounded-md text-white"
    :class="buttonClasses"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'warning' | 'danger' | 'default';
  disabled?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['click']);

const buttonClasses = computed(() => {
  if (props.disabled) {
    return 'bg-gray-300 cursor-not-allowed';
  }

  const variants: Record<string, string> = {
    default: 'bg-cyan-600 hover:bg-cyan-700',
    primary: 'bg-blue-600 hover:bg-blue-700',
    secondary: 'bg-gray-300 text-black hover:bg-gray-400',
    warning: 'bg-yellow-500 hover:bg-yellow-600',
    danger: 'bg-red-600 hover:bg-red-700',
  };

  return variants[props.variant || 'default'];
});

const handleClick = () => {
  if (!props.disabled) {
    emit('click');
  }
};
</script>
