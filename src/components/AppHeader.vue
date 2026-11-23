<script setup>
import { storeToRefs } from 'pinia'
import { useTiendaStore } from '../stores/tienda'

const tienda = useTiendaStore()
const { nombreTienda, cantidadItems } = storeToRefs(tienda)
const base = import.meta.env.BASE_URL
</script>

<template>
  <header class="encabezado">
    <p class="franja">Productos 100 % originales · Envíos a todo el país</p>

    <div class="contenedor barra">
      <a class="marca" href="#inicio" aria-label="Inicio">
        {{ nombreTienda.split('&')[0] }}<em>&amp;</em>{{ nombreTienda.split('&')[1] }}
      </a>

      <nav class="enlaces" aria-label="Principal">
        <a href="#catalogo">Catálogo</a>
        <a href="#carrito">Carrito</a>
      </nav>

      <button
        class="boton-carrito"
        type="button"
        :aria-label="`Ver carrito, ${cantidadItems} unidades`"
        @click="tienda.verCarrito"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path d="M5 8h14l-1.2 11.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 8z" />
          <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
        </svg>
        <span class="texto-carrito">Carrito</span>
        <span class="contador" :class="{ vacio: cantidadItems === 0 }">{{ cantidadItems }}</span>
      </button>
    </div>

    <section id="inicio" class="contenedor portada">
      <div class="portada-texto">
        <p class="etiqueta">Fragancias originales · Colombia</p>
        <h1>
          Tu aroma, <em>tu sello personal</em>.
        </h1>
        <p class="bajada">
          Clásicos de diseñador y perfumes árabes, con envío a todo el país.
        </p>
        <div class="portada-acciones">
          <a class="btn" href="#catalogo">Ver catálogo</a>
          <a class="enlace-sutil" href="#carrito">Ir al carrito</a>
        </div>
        <ul class="garantias">
          <li><strong>Originales</strong><span>Sellados de fábrica</span></li>
          <li><strong>Envío nacional</strong><span>A todo el país</span></li>
          <li><strong>Precios en COP</strong><span>IVA discriminado</span></li>
        </ul>
      </div>

      <div class="portada-arte" aria-hidden="true">
        <img class="frasco frasco-a" :src="`${base}img/productos/12562773.jpg`" alt="" />
        <img class="frasco frasco-b" :src="`${base}img/productos/11417443.jpg`" alt="" />
      </div>
    </section>
  </header>
</template>

<style scoped>
.franja {
  background: var(--oud);
  color: #f1e7d4;
  text-align: center;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 0.55rem 1rem;
}

.barra {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1.1rem;
  padding-bottom: 1.1rem;
  border-bottom: 1px solid var(--linea);
}

.marca {
  font-family: var(--serif);
  font-size: 1.9rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--oud);
  text-decoration: none;
  white-space: nowrap;
}

.marca em {
  font-style: italic;
  font-weight: 500;
  color: var(--laton);
  padding: 0 0.12em;
}

.enlaces {
  display: flex;
  gap: 2rem;
  margin-left: auto;
  margin-right: 1.5rem;
}

.enlaces a {
  color: var(--tinta);
  text-decoration: none;
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding-bottom: 2px;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

.enlaces a:hover {
  border-color: var(--laton);
}

.boton-carrito {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.9rem;
  background: transparent;
  border: 1px solid var(--oud);
  border-radius: 999px;
  transition: background 0.2s, color 0.2s;
}

.boton-carrito:hover {
  background: var(--oud);
  color: var(--papel);
}

.texto-carrito {
  font-size: 0.74rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.contador {
  min-width: 1.45rem;
  height: 1.45rem;
  padding: 0 0.35rem;
  display: inline-grid;
  place-items: center;
  border-radius: 999px;
  background: var(--terracota);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
}

.contador.vacio {
  background: var(--linea);
  color: var(--tinta-suave);
}

/* Portada */
.portada {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
  padding-top: clamp(2.5rem, 6vw, 5rem);
  padding-bottom: clamp(2.5rem, 6vw, 5rem);
}

.portada-texto h1 {
  max-width: 11ch;
  font-size: clamp(2.7rem, 5.2vw, 4.3rem);
  margin: 0.8rem 0 1rem;
  color: var(--oud);
}

.portada-texto h1 em {
  color: var(--laton-oscuro);
  font-weight: 500;
}

.bajada {
  max-width: 29rem;
  color: var(--tinta-suave);
  font-size: 1rem;
}

.portada-acciones {
  display: flex;
  align-items: center;
  gap: 1.75rem;
  margin: 1.5rem 0 2rem;
}

.enlace-sutil {
  color: var(--oud);
  font-size: 0.78rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  border-bottom: 1px solid var(--laton);
  padding-bottom: 3px;
}

.garantias {
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: start;
  gap: 0;
  list-style: none;
  margin: 0;
  padding: 0;
}

.garantias li {
  display: flex;
  flex-direction: column;
  padding: 0 1.6rem;
  border-left: 1px solid var(--linea);
}

.garantias li:first-child {
  padding-left: 0;
  border-left: 0;
}

.garantias strong {
  font-family: var(--serif);
  font-size: 1.15rem;
  font-weight: 700;
}

.garantias span {
  font-size: 0.8rem;
  color: var(--tinta-suave);
}

.portada-arte {
  position: relative;
  aspect-ratio: 1 / 1.05;
  background: linear-gradient(145deg, #e8ede4, #dce8df 55%, #f0dfc8);
  border-radius: 1.4rem;
}

.portada-arte::after {
  content: '';
  position: absolute;
  inset: 12px -12px -12px 12px;
  border: 1px solid var(--laton);
  border-radius: 1.4rem;
  z-index: -1;
}

.frasco {
  position: absolute;
  width: 58%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border: 5px solid var(--papel);
  border-radius: 0.9rem;
  box-shadow: 0 22px 40px -18px rgba(23, 63, 58, 0.38);
}

.frasco-a {
  left: 6%;
  top: 9%;
  object-position: center 56%;
}

.frasco-b {
  right: 6%;
  bottom: 7%;
  object-position: center 48%;
}

@media (max-width: 900px) {
  .portada {
    grid-template-columns: 1fr;
  }

  .portada-arte {
    max-width: 440px;
    width: 100%;
    margin: 0 auto 14px;
  }

  .enlaces {
    display: none;
  }

  .boton-carrito {
    margin-left: auto;
  }
}

@media (max-width: 520px) {
  .marca {
    font-size: 1.55rem;
  }

  .texto-carrito {
    display: none;
  }

  .garantias {
    grid-template-columns: 1fr;
    gap: 0.9rem;
  }

  .garantias li {
    padding: 0;
    border-left: 0;
    flex-direction: row;
    gap: 0.6rem;
    align-items: baseline;
  }

  .portada-acciones {
    flex-wrap: wrap;
  }

  .portada-arte::after {
    inset: 8px -8px -8px 8px;
  }
}
</style>
