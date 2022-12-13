import { createModal } from './modal.js'

export const renderErrors = (error) => {
  let message
  if (error.status === 404) {
    message = 'No se han encontrado productos que coincidan con su búsqueda. Por favor, pruebe con otra.'
  } else if (error.status === 500) {
    message = 'Se ha producido un error interno del servidor. Por favor, inténtelo de nuevo más tarde.'
  } else if (error.message === 'NetworkError when attempting to fetch resource.') {
    message = 'Se ha llegado al límite máximo de peticiones que soporta el servidor en un determinado espacio de tiempo. Por favor, inténtelo de nuevo más tarde.'
  } else {
    message = error.toString()
  }
  createModal(message)
}
