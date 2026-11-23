<script setup>
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useTiendaStore } from './stores/tienda'
import AppHeader from './components/AppHeader.vue'
import ListaProductos from './components/ListaProductos.vue'
import CarritoCompra from './components/CarritoCompra.vue'
import FacturaCompra from './components/FacturaCompra.vue'
import AppFooter from './components/AppFooter.vue'

const tienda = useTiendaStore()
const { mostrarFactura, aviso } = storeToRefs(tienda)
const anio = new Date().getFullYear()
// Evita que la página de atrás se desplace mientras la factura está abierta
watch(mostrarFactura, (abierta) => {
  document.body.style.overflow = abierta ? 'hidden' : ''
})
</script>

<template>
  <div class="sitio">
    <AppHeader />

    <main class="contenedor principal">
      <ListaProductos />
      <CarritoCompra />
    </main>

    <AppFooter :anio="anio" />
  </div>

  <FacturaCompra
    v-if="mostrarFactura"
  />

  <Transition name="aviso">
    <p v-if="aviso" class="aviso" role="status">{{ aviso }}</p>
  </Transition>
</template>

<style scoped>
.principal {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 380px;
  gap: clamp(1.5rem, 3vw, 3rem);
  align-items: start;
}

.aviso {
  position: fixed;
  left: 50%;
  bottom: 1.5rem;
  transform: translateX(-50%);
  z-index: 40;
  max-width: min(92vw, 460px);
  background: var(--oud);
  color: #f4ead6;
  font-size: 0.88rem;
  padding: 0.8rem 1.2rem;
  border-left: 3px solid var(--laton-claro);
  box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.5);
}

.aviso-enter-active,
.aviso-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}

.aviso-enter-from,
.aviso-leave-to {
  opacity: 0;
  transform: translate(-50%, 10px);
}

@media (max-width: 1080px) {
  .principal {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
