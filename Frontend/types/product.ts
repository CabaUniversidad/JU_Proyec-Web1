export interface Product {
  idProd: string
  NomProducto: string
  Estado: boolean
  Imagen: string | null
  idCategoria: number
  Stock: number
  marca: string
  Descripcion: string
  PrecioUnitario: number
  PrecioMayor: number
  categoria?: Category

  isFavorite?: boolean
}

export interface Category {
  idCategoria: number
  NomCategoria: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Cliente {
  idCliente: string
  Nombre: string
  Telefono: string
  Email: string
}

export interface Solicitud {
  idSolicitud: string
  idCliente: string
  mensaje: string
}

export interface ListaSolicitud {
  idListaS: number
  idSolicitud: string
  idProducto: string
  nombreProd: string
  Cantidad: number
  PrecioSelect: number
}

export interface FilterState {
  categories: number[]
  brands: string[]
  priceRange: [number, number]
}
