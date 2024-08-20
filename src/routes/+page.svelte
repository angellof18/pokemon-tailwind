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

<section class="max-w-4xl mx-auto py-4 px-1 flex flex-col gap-2 justify-center">
  <h1 class="text-4xl font-bold flex gap-3 items-center">
    <img src="pokemon.webp" alt="pokemon" width="64" />
    POKEDEX
  </h1>
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

    <div class="dropdown dropdown-bottom dropdown-end">
      <div tabindex="0" role="button" class="btn btn-primary m-1">
        <i class="bi bi-funnel-fill text-l" />
      </div>
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <div
        tabindex="0"
        class="dropdown-content card card-compact bg-neutral text-primary-content z-[1] w-96 px-2 py-2 shadow"
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
    </div>
  </div>
  {#if pokemons}
    <main class="grid md:grid-cols-4 grid-cols-2 gap-5 mt-3">
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
