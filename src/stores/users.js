import { writable } from 'svelte/store'

const createUser = () => {
  const { subscribe, set } = writable(false)

  return {
    subscribe,
    setUser: (us) => {
      set(us)
    },
    logout: () => {
      set(false)
    }
  }
}

export const user = createUser()
