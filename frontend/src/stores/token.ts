import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTokenStore = defineStore('token', () => {
  const storedToken = localStorage.getItem('token')

  const token = ref(storedToken || '')

  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  const getToken = computed(() => {
    const localToken = localStorage.getItem('token')

    if (!token.value && localToken) {
      token.value = localToken;
    }

    return token.value;
  })

  const clearToken = () => {
    token.value = ''
    localStorage.removeItem('token')
  }

  const tokenStore = {
    setToken,
    getToken,
    clearToken,
  }

  return tokenStore
})
