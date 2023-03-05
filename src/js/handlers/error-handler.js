import { createModal } from '../components/modal.js'

export const renderErrors = (error) => {
  let header, message
  if (error.status === 404) {
    header = 'No hay resultados'
    message = 'No se han encontrado productos que coincidan con su búsqueda. Por favor, pruebe con otra.'
  } else if (error.status === 500) {
    header = 'Error en el servidor'
    message = 'Se ha producido un error interno del servidor. Por favor, inténtelo de nuevo más tarde.'
  } else if (error.status === 503) {
    header = 'Servicio no disponible'
    message = 'El servidor no se encuentra disponible en estos momentos. Por favor, inténtelo de nuevo más tarde.'
  } else if (error.message === 'NetworkError when attempting to fetch resource.') {
    header = 'Ocurrió un error'
    message = 'El servidor no se encuentra disponible en estos momentos. Por favor, inténtelo de nuevo más tarde.'
  } else {
    header = 'Ocurrió un error'
    message = 'El servidor no se encuentra disponible en estos momentos. Por favor, inténtelo de nuevo más tarde.'
  }
  createModal(header, message)
}
