<template>
  <button
    class="w-full mt-2 p-2 rounded-md text-white"
    :class="disabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-700'"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{ disabled: boolean }>();
</script>
