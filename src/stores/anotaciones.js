import { writable } from 'svelte/store'

const createAnotaciones = () => {
  // Cada anotacion es del tipo id = 'asdfasdadf', data:  { fecha: "2022-07-08", fechacreacion: 1658688245963, estado: "pendiente", categoria: "asdf", descripcion: "Prueba" }
  const { subscribe, set, update } = writable(false)

  return {
    subscribe,
    agregarAnotacion: (anotacion) => {
      update((anotaciones) => [...anotaciones, anotacion])
    },
    modificaranotacion: (anotacion) => {
      update(anotaciones => anotaciones.map(element => element.id == anotacion.id ? {...anotacion} : element))
    },
    setear: (anotaciones) => {
      set(anotaciones)
    },
  }
}

export const anotaciones = createAnotaciones()
