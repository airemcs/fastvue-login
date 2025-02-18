<template>
  <div class="container mx-auto p-6">
    <div class="flex justify-between mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search..."
        class="p-2 rounded-md border border-gray-300"
      />
      <button
        @click="openCreateModal"
        class="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
      >
        Create New User
      </button>
    </div>

    <table class="w-full table-auto">
      <thead>
        <tr class="bg-gray-200">
          <th class="px-4 py-2 text-left">First Name</th>
          <th class="px-4 py-2 text-left">Middle Name</th>
          <th class="px-4 py-2 text-left">Last Name</th>
          <th class="px-4 py-2 text-left">Username</th>
          <th class="px-4 py-2 text-left">Email</th>
          <th class="px-4 py-2 text-left">Role</th>
          <th class="px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, index) in filteredUsers"
          :key="user.username"
          :class="index % 2 === 0 ? 'bg-gray-100' : 'bg-white'"
        >
          <td class="px-4 py-2">{{ user.firstName }}</td>
          <td class="px-4 py-2">{{ user.middleName }}</td>
          <td class="px-4 py-2">{{ user.lastName }}</td>
          <td class="px-4 py-2">{{ user.username }}</td>
          <td class="px-4 py-2">{{ user.email }}</td>
          <td class="px-4 py-2">{{ user.role }}</td>
          <td class="px-4 py-2">
            <button
              @click="editUser(user)"
              class="bg-yellow-500 text-white p-2 rounded-md mr-2 hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              @click="deleteUser(user.username)"
              class="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div
      v-if="showModal"
      class="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-md w-96">
        <h3 class="text-xl font-bold mb-4">{{ modalTitle }}</h3>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label for="firstName" class="block text-sm font-medium">First Name</label>
            <input
              v-model="newUser.firstName"
              type="text"
              id="firstName"
              required
              class="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div class="mb-4">
            <label for="middleName" class="block text-sm font-medium">Middle Name</label>
            <input
              v-model="newUser.middleName"
              type="text"
              id="middleName"
              class="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div class="mb-4">
            <label for="lastName" class="block text-sm font-medium">Last Name</label>
            <input
              v-model="newUser.lastName"
              type="text"
              id="lastName"
              required
              class="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div class="mb-4">
            <label for="username" class="block text-sm font-medium">Username</label>
            <input
              v-model="newUser.username"
              type="text"
              id="username"
              required
              class="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium">Email</label>
            <input
              v-model="newUser.email"
              type="email"
              id="email"
              required
              class="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div class="mb-4">
            <label for="role" class="block text-sm font-medium">Role</label>
            <select
              v-model="newUser.role"
              id="role"
              class="w-full p-2 border border-gray-300 rounded-md"
            >
              <option>User</option>
              <option>Admin</option>
            </select>
          </div>

          <div class="flex justify-end gap-2">
            <button
              type="button"
              @click="closeModal"
              class="bg-gray-300 text-black p-2 rounded-md"
            >
              Cancel
            </button>
            <button type="submit" class="bg-blue-600 text-white p-2 rounded-md">
              {{ isEditing ? 'Update User' : 'Create User' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface User {
  firstName: string;
  middleName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
}

const users = ref<User[]>([
  { firstName: 'John', middleName: '', lastName: 'Doe', username: 'johndoe', email: 'john@example.com', role: 'User' },
  { firstName: 'Jane', middleName: 'M', lastName: 'Smith', username: 'janesmith', email: 'jane@example.com', role: 'Admin' },
]);

const newUser = ref<User>({
  firstName: '',
  middleName: '',
  lastName: '',
  username: '',
  email: '',
  role: 'User',
});

const showModal = ref(false);
const isEditing = ref(false);
const modalTitle = computed(() => (isEditing.value ? 'Edit User' : 'Create New User'));

const searchQuery = ref('');

const filteredUsers = computed(() => {
  return users.value.filter(user =>
    user.firstName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const openCreateModal = () => {
  isEditing.value = false;
  newUser.value = {
    firstName: '',
    middleName: '',
    lastName: '',
    username: '',
    email: '',
    role: 'User',
  };
  showModal.value = true;
};

const openEditModal = (user: User) => {
  isEditing.value = true;
  newUser.value = { ...user };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const handleSubmit = () => {
  if (isEditing.value) {
    const index = users.value.findIndex(user => user.username === newUser.value.username);
    if (index !== -1) {
      users.value[index] = { ...newUser.value };
    }
  } else {
    users.value.push({ ...newUser.value });
  }
  closeModal();
};

const editUser = (user: User) => {
  openEditModal(user);
};

const deleteUser = (username: string) => {
  const index = users.value.findIndex(user => user.username === username);
  if (index !== -1) {
    users.value.splice(index, 1);
  }
};
</script>