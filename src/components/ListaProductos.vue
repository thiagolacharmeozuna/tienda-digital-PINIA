<script setup>
import { storeToRefs } from 'pinia'
import ProductoCard from './ProductoCard.vue'
import { useTiendaStore } from '../stores/tienda'

const tienda = useTiendaStore()
const { filtroActivo, productosVisibles } = storeToRefs(tienda)
const filtros = ['Todos', 'Diseñador', 'Árabe']
</script>

<template>
  <section id="catalogo" class="catalogo" aria-labelledby="titulo-catalogo">
    <div class="cabecera">
      <div>
        <p class="etiqueta">Colección</p>
        <h2 id="titulo-catalogo">Catálogo</h2>
      </div>

      <div class="filtros" role="group" aria-label="Filtrar por tipo de perfume">
        <button
          v-for="f in filtros"
          :key="f"
          type="button"
          class="filtro"
          :class="{ activo: filtroActivo === f }"
          :aria-pressed="filtroActivo === f"
          @click="tienda.establecerFiltro(f)"
        >
          {{ f }}
        </button>
      </div>
    </div>

    <div class="rejilla">
      <ProductoCard
        v-for="p in productosVisibles"
        :key="p.id"
        :producto="p"
      />
    </div>
  </section>
</template>

<style scoped>
.cabecera {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding-bottom: 1.2rem;
  margin-bottom: 1.8rem;
  border-bottom: 1px solid var(--linea);
}

h2 {
  font-size: clamp(2rem, 4vw, 2.8rem);
  color: var(--oud);
  margin-top: 0.3rem;
}

.filtros {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filtro {
  background: transparent;
  border: 1px solid var(--linea);
  padding: 0.5rem 1rem;
  border-radius: 999px;
  font-size: 0.74rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition: all 0.2s;
}

.filtro:hover {
  border-color: var(--oud);
}

.filtro.activo {
  background: var(--oud);
  border-color: var(--oud);
  color: var(--papel);
}

.rejilla {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.4rem;
}

@media (max-width: 560px) {
  .rejilla {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.8rem;
  }
}
</style>
