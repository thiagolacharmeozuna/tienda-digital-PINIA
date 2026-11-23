import { defineStore } from 'pinia'
import { calcularTotales } from '../utils/calculos'

export const useTiendaStore = defineStore('tienda', {
  state: () => ({
    nombreTienda: 'Ámbar & Oud',
    contacto: 'ventas@ambaroud.co · WhatsApp +57 300 000 0000',
    productos: [
      { id: 1, marca: 'Dior', descripcion: 'Sauvage Eau de Parfum 100 ml', categoria: 'Diseñador',
        notas: 'Bergamota · Lavanda · Vainilla', imagen: 'img/productos/12562773.jpg', valor: 520000, descuento: 10 },
      { id: 2, marca: 'Chanel', descripcion: 'Bleu de Chanel Eau de Parfum 100 ml', categoria: 'Diseñador',
        notas: 'Cítricos · Incienso · Cedro', imagen: 'img/productos/11417443.jpg', valor: 590000, descuento: 0 },
      { id: 3, marca: 'Paco Rabanne', descripcion: '1 Million Eau de Toilette 100 ml', categoria: 'Diseñador',
        notas: 'Mandarina · Canela · Cuero', imagen: 'img/productos/19272234.jpg', valor: 390000, descuento: 15 },
      { id: 4, marca: 'Carolina Herrera', descripcion: 'Good Girl Eau de Parfum 80 ml', categoria: 'Diseñador',
        notas: 'Almendra · Café · Tuberosa', imagen: 'img/productos/14635172.jpg', valor: 480000, descuento: 0 },
      { id: 5, marca: 'Yves Saint Laurent', descripcion: 'Libre Eau de Parfum 90 ml', categoria: 'Diseñador',
        notas: 'Lavanda · Azahar · Vainilla', imagen: 'img/productos/32645088.jpg', valor: 530000, descuento: 12 },
      { id: 6, marca: 'Versace', descripcion: 'Eros Eau de Toilette 100 ml', categoria: 'Diseñador',
        notas: 'Menta · Manzana verde · Vainilla', imagen: 'img/productos/28460123.jpg', valor: 340000, descuento: 20 },
      { id: 7, marca: 'Lattafa', descripcion: 'Khamrah Eau de Parfum 100 ml', categoria: 'Árabe',
        notas: 'Canela · Dátil · Praliné', imagen: 'img/productos/34051691.jpg', valor: 185000, descuento: 15 },
      { id: 8, marca: 'Lattafa', descripcion: 'Yara Eau de Parfum 100 ml', categoria: 'Árabe',
        notas: 'Orquídea · Heliotropo · Vainilla', imagen: 'img/productos/31612020.jpg', valor: 135000, descuento: 10 },
      { id: 9, marca: 'Afnan', descripcion: '9PM Eau de Parfum 100 ml', categoria: 'Árabe',
        notas: 'Manzana · Canela · Vainilla', imagen: 'img/productos/32630375.jpg', valor: 165000, descuento: 0 },
      { id: 10, marca: 'Armaf', descripcion: 'Club de Nuit Intense Man 105 ml', categoria: 'Árabe',
        notas: 'Limón · Piña · Abedul', imagen: 'img/productos/29611647.jpg', valor: 175000, descuento: 18 },
      { id: 11, marca: 'Al Haramain', descripcion: 'Amber Oud Gold Edition 120 ml', categoria: 'Árabe',
        notas: 'Melón · Piña · Ámbar', imagen: 'img/productos/264819.jpg', valor: 240000, descuento: 0 },
      { id: 12, marca: 'Rasasi', descripcion: 'Hawas for Him 100 ml', categoria: 'Árabe',
        notas: 'Manzana · Canela · Ámbar', imagen: 'img/productos/1961786.jpg', valor: 210000, descuento: 25 }
    ].map((producto) => ({
      ...producto,
      imagen: `${import.meta.env.BASE_URL}${producto.imagen}`
    })),
    carrito: [],
    mostrarFactura: false,
    consecutivo: 1,
    fechaFactura: '',
    aviso: '',
    filtroActivo: 'Todos',
    temporizadorAviso: null
  }),
  getters: {
    cantidadItems: (state) => state.carrito.reduce((total, item) => total + item.cantidad, 0),
    numeroFactura: (state) => `FAC-${String(state.consecutivo).padStart(4, '0')}`,
    totales: (state) => calcularTotales(state.carrito),
    productosVisibles: (state) =>
      state.filtroActivo === 'Todos'
        ? state.productos
        : state.productos.filter((producto) => producto.categoria === state.filtroActivo)
  },
  actions: {
    agregarProducto(producto) {
      const existente = this.carrito.find((item) => item.producto.id === producto.id)
      if (existente) existente.cantidad++
      else this.carrito.push({ producto, cantidad: 1 })
      this.avisar(`${producto.marca} ${producto.descripcion} se agregó al carrito`)
    },
    incrementar(id) {
      const item = this.carrito.find((entry) => entry.producto.id === id)
      if (item) item.cantidad++
    },
    decrementar(id) {
      const item = this.carrito.find((entry) => entry.producto.id === id)
      if (item && item.cantidad > 1) item.cantidad--
    },
    eliminar(id) {
      this.carrito = this.carrito.filter((item) => item.producto.id !== id)
    },
    limpiarCarrito() {
      this.carrito = []
      this.avisar('Se vació el carrito')
    },
    finalizarCompra() {
      if (this.carrito.length === 0) return
      const texto = new Date().toLocaleString('es-CO', { dateStyle: 'full', timeStyle: 'short' })
      this.fechaFactura = texto.charAt(0).toUpperCase() + texto.slice(1)
      this.mostrarFactura = true
    },
    cerrarFactura() {
      this.mostrarFactura = false
    },
    nuevaCompra() {
      this.carrito = []
      this.mostrarFactura = false
      this.consecutivo++
    },
    avisar(texto) {
      this.aviso = texto
      clearTimeout(this.temporizadorAviso)
      this.temporizadorAviso = setTimeout(() => {
        this.aviso = ''
      }, 2200)
    },
    establecerFiltro(filtro) {
      this.filtroActivo = filtro
    },
    verCarrito() {
      document.getElementById('carrito')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
})
