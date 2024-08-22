<script>
  import { onMount } from "svelte";
  import PokemonCard from "../lib/layout/PokemonCard.svelte";

  let pokemons = "";
  let pokemonsFiltrados = [];
  let pokemonsPagina = [];
  let infoTipo = [];
  let tipos = [
    "Normal",
    "Fighting",
    "Flying",
    "Poison",
    "Ground",
    "Rock",
    "Bug",
    "Ghost",
    "Steel",
    "Fire",
    "Water",
    "Grass",
    "Electric",
    "Psychic",
    "Ice",
    "Dragon",
    "Dark",
    "Fairy",
    "Stellar",
    "Unknown",
  ];
  let searchTerm = "";
  let botonItem = "";
  let paginaActual = 1;
  let cantidadPorPagina = 28;
  let tiposCache = {};

  //<!--Fetching-->

  //{name, url}
  export async function fetchPokemons() {
    const result = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const data = await result.json();

    const detallesPokemon = await Promise.all(
      data["results"].map(async (pokemon) => {
        const pokemonInfo = await fetchInfoPokemon(pokemon.url);
        return { ...pokemon, ...pokemonInfo };
      })
    );
    return detallesPokemon;
  }

  //{id,name,attack,defense,image,...}
  export async function fetchInfoPokemon(url) {
    const result = await fetch(url);
    if (!result.ok) {
      throw new Error(`Error: ${result.status} ${result.statusText}`);
    }
    const data = await result.json();
    return data;
  }

  export async function fetchTipoEspecifico(tipo) {
    if (!tiposCache[tipo]) {
      const result = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
      if (!result.ok) {
        throw new Error(`Error: ${result.status} ${result.statusText}`);
      }
      const data = await result.json();
      tiposCache[tipo] = data.pokemon;
    }
    return tiposCache[tipo];
  }

  //<!--Functions-->
  function filtrarPokemonNombre(nombre) {
    if (searchTerm.trim() !== "") {
      pokemonsFiltrados = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(nombre.toLowerCase())
      );
    } else {
      pokemonsFiltrados = [...pokemons];
    }
    paginaActual = 1;
  }

  $: filtrarPokemonNombre(searchTerm);

  async function seleccionarTipo(tipo) {
    botonItem = tipo;
    infoTipo = await fetchTipoEspecifico(tipo);
    const nombres = infoTipo.map((p) => p.pokemon.name);
    pokemonsFiltrados = pokemons.filter((pokemon) =>
      nombres.includes(pokemon.name)
    );
  }

  function cambiarPagina(direccion) {
    if (
      direccion === "next" &&
      paginaActual * cantidadPorPagina < pokemonsFiltrados.length
    ) {
      paginaActual += 1;
    } else if (direccion === "prev" && paginaActual > 1) {
      paginaActual -= 1;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  $: pokemonsPagina = pokemonsFiltrados.slice(
    (paginaActual - 1) * cantidadPorPagina,
    paginaActual * cantidadPorPagina
  );

  onMount(async () => {
    pokemons = await fetchPokemons();
    pokemonsFiltrados = [...pokemons];
  });
</script>

<svelte:head>
  <title>POKEDEX</title>
</svelte:head>

<section class="max-w-4xl mx-auto py-4 px-2 flex flex-col gap-2">
  <div class="flex justify-between items-center">
    <h1 class="text-4xl font-bold flex gap-3 justify-center items-center">
      <img src="pokemon.webp" alt="pokemon" width="64" />
      POKEDEX
    </h1>
    <label class="swap swap-rotate">
      <!-- this hidden checkbox controls the state -->
      <input type="checkbox" class="theme-controller" value="nord" />

      <!-- sun icon -->
      <svg
        class="swap-off h-10 w-10 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"
        />
      </svg>

      <!-- moon icon -->
      <svg
        class="swap-on h-10 w-10 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"
        />
      </svg>
    </label>
  </div>
  <div class="flex items-center gap-2 sticky top-0 bg-base-100 opacity-1 z-50">
    <label
      for="busqueda"
      class="input input-bordered flex items-center gap-2 w-full"
    >
      <i class="bi bi-search" />
      <input
        id="busqueda"
        type="text"
        bind:value={searchTerm}
        class="grow"
        placeholder="Buscar por nombre de Pokémon"
      />
    </label>
    <button
      class="btn btn-secondary"
      on:click={() => {
        paginaActual = 1;
        searchTerm = "";
        botonItem = "";
        pokemonsFiltrados = [...pokemons];
      }}><i class="bi bi-arrow-clockwise text-l" /></button
    >

    <details class="dropdown dropdown-bottom dropdown-end">
      <summary class="btn btn-primary m-1">
        <i class="bi bi-funnel-fill text-l" />
      </summary>
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <div
        class="dropdown-content card card-compact bg-neutral text-neutral-content z-[1] w-96 px-2 py-2 shadow"
      >
        <div class="card-body grid md:grid-cols-4 grid-cols-2 gap-5">
          {#each tipos as tipo}
            <button
              on:click={() => {
                seleccionarTipo(tipo.toLowerCase());
                paginaActual = 1;
              }}>{tipo}</button
            >
          {/each}
        </div>
      </div>
    </details>
  </div>
  {#if pokemons}
    <main class="grid md:grid-cols-4 grid-cols-2 gap-3 mt-3">
      {#each pokemonsPagina as pokemon}
        <PokemonCard {pokemon} />
      {/each}
    </main>
  {:else}
    <div class="flex justify-center items-center h-96">
      <span class="loading loading-ring loading-lg"></span>
    </div>
  {/if}
  <div class="join justify-center">
    <button
      class="join-item btn"
      on:click={() => cambiarPagina("prev")}
      disabled={paginaActual === 1}>«</button
    >
    <button class="join-item btn">Pagina {paginaActual}</button>
    <button
      class="join-item btn"
      on:click={() => cambiarPagina("next")}
      disabled={paginaActual * cantidadPorPagina >= pokemonsFiltrados.length}
      >»</button
    >
  </div>
</section>
