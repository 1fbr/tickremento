import { createModal } from '../components/modal.js'

export const renderErrors = (response, error) => {
  let header, message
  if (response.status === 404 && error.flag === 'search') {
    header = error.title
    message = error.error
  } else if (response.status === 404 && error.flag === 'search-by-supermarket') {
    header = error.title
    message = error.error
  } else if (response.status === 429) {
    header = 'Límite de peticiones alcanzado'
    message = 'Se ha llegado al límite máximo de peticiones que soporta el servidor en un determinado espacio de tiempo. Por favor, inténtelo de nuevo más tarde.'
  } else if (response.status === 500) {
    header = 'Error en el servidor'
    message = 'Se ha producido un error interno del servidor. Por favor, inténtelo de nuevo más tarde.'
  } else if (response.status === 503) {
    header = 'Servicio no disponible'
    message = 'El servidor no se encuentra disponible en estos momentos. Por favor, inténtelo de nuevo más tarde.'
  } else {
    header = 'Ocurrió un error'
    message = 'El servidor no se encuentra disponible en estos momentos. Por favor, inténtelo de nuevo más tarde.'
  }
  createModal(header, message)
}
