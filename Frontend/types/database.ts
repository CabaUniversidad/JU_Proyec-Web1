export interface Database {
  public: {
    Tables: {
      Categoria: {
        Row: {
          idCategoria: number
          NomCategoria: string | null
        }
        Insert: {
          idCategoria?: number
          NomCategoria?: string | null
        }
        Update: {
          idCategoria?: number
          NomCategoria?: string | null
        }
      }
      Producto: {
        Row: {
          idProd: string
          NomProducto: string | null
          Estado: boolean | null
          Imagen: string | null
          idCategoria: number | null
          Stock: number | null
          marca: string | null
          Descripcion: string | null
          PrecioUnitario: number | null
          PrecioMayor: number | null
        }
        Insert: {
          idProd: string
          NomProducto?: string | null
          Estado?: boolean | null
          Imagen?: string | null
          idCategoria?: number | null
          Stock?: number | null
          marca?: string | null
          Descripcion?: string | null
          PrecioUnitario?: number | null
          PrecioMayor?: number | null
        }
        Update: {
          idProd?: string
          NomProducto?: string | null
          Estado?: boolean | null
          Imagen?: string | null
          idCategoria?: number | null
          Stock?: number | null
          marca?: string | null
          Descripcion?: string | null
          PrecioUnitario?: number | null
          PrecioMayor?: number | null
        }
      }
      Cliente: {
        Row: {
          idCliente: string
          Nombre: string | null
          Telefono: string | null
          Email: string | null
        }
        Insert: {
          idCliente: string
          Nombre?: string | null
          Telefono?: string | null
          Email?: string | null
        }
        Update: {
          idCliente?: string
          Nombre?: string | null
          Telefono?: string | null
          Email?: string | null
        }
      }
      Solicitud: {
        Row: {
          idSolicitud: string
          idCliente: string | null
          mensaje: string | null
        }
        Insert: {
          idSolicitud: string
          idCliente?: string | null
          mensaje?: string | null
        }
        Update: {
          idSolicitud?: string
          idCliente?: string | null
          mensaje?: string | null
        }
      }
      ListaSolicitud: {
        Row: {
          idListaS: number
          idSolicitud: string | null
          idProducto: string | null
          nombreProd: string | null
          Cantidad: number | null
          PrecioSelect: number | null
        }
        Insert: {
          idListaS?: number
          idSolicitud?: string | null
          idProducto?: string | null
          nombreProd?: string | null
          Cantidad?: number | null
          PrecioSelect?: number | null
        }
        Update: {
          idListaS?: number
          idSolicitud?: string | null
          idProducto?: string | null
          nombreProd?: string | null
          Cantidad?: number | null
          PrecioSelect?: number | null
        }
      }
    }
  }
}
