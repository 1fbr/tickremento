import{createModal as e}from"../components/modal.js";export const renderErrors=(o,r)=>{let t,n;404===o.status&&"search"===r.flag?(t=r.title,n=r.error):404===o.status&&"search-by-supermarket"===r.flag?(t=r.title,n=r.error):429===o.status?(t="L\xedmite de peticiones alcanzado",n="Se ha llegado al l\xedmite m\xe1ximo de peticiones que soporta el servidor en un determinado espacio de tiempo. Por favor, int\xe9ntelo de nuevo m\xe1s tarde."):500===o.status?(t="Error en el servidor",n="Se ha producido un error interno del servidor. Por favor, int\xe9ntelo de nuevo m\xe1s tarde."):503===o.status?(t="Servicio no disponible",n="El servidor no se encuentra disponible en estos momentos. Por favor, int\xe9ntelo de nuevo m\xe1s tarde."):(t="Ocurri\xf3 un error",n="El servidor no se encuentra disponible en estos momentos. Por favor, int\xe9ntelo de nuevo m\xe1s tarde."),e(t,n)};