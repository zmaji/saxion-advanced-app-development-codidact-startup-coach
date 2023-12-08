import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', () => {
  const token = ref('')

  const setToken = (newToken: string) => {
    token.value = newToken
  }

  const getToken = computed(() => {
    return token.value
  })

  const tokenStore = {
    setToken,
    getToken
  }

  return tokenStore
})
