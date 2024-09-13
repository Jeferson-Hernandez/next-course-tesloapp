
export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {

  // si el numero de paginas es menor a 7
  // se muestran todas las paginas normalmente
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // si la pagina actual esta entre las primeras 3 paginas
  // mostrar las primeras 3, ... , y las ultimas 2
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  // si la pagina actual esta entre las ultimas 3 paginas
  // mostrar las primeras 2, ..., y las ultimas 3 paginas
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  // si la pagina actual es intermedia
  // mostrar la primera y la ultima y los vecinos de la actual
  return [
    1,
    '...',
    currentPage -1,
    currentPage,
    currentPage +1,
    '...',
    totalPages
  ]
}