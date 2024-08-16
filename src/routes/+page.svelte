<script>
  import { onMount } from "svelte";
  import PokemonCard from "../lib/layout/PokemonCard.svelte";

  let pokemons = "";
  let pokemonsFiltrados = [];
  let pokemonTipos = [];
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

  function filterPokemons(x) {
    if (searchTerm.trim() !== "") {
      pokemonsFiltrados = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(x.toLowerCase())
      );
      return;
    }
    pokemonsFiltrados = [...pokemons]; // Restablece la lista original para volver a mostrar todos los pokemones.
  }
  $: filterPokemons(searchTerm);

  async function fetchPokemons() {
    const result = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const data = await result.json();
    return data["results"];
  }

  async function fetchInfoPokemon(url) {
    const result = await fetch(url);
    const data = await result.json();
    return data;
  }

  async function fetchTipoEspecifico(tipo) {
    const result = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
    const data = await result.json();
    return data.pokemon;
  }

  async function seleccionarTipo(tipo) {
    botonItem = tipo;
    infoTipo = await fetchTipoEspecifico(tipo);
    const nombres = infoTipo.map((p) => p.pokemon.name);
    pokemonsFiltrados = pokemons.filter((pokemon) =>
      nombres.includes(pokemon.name)
    );
  }

  onMount(async () => {
    pokemons = await fetchPokemons();
    pokemonsFiltrados = [...pokemons];
  });
</script>

<svelte:head>
  <title>POKEDEX</title>
</svelte:head>

<section class="max-w-4xl mx-auto py-4">
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
        pokemonsFiltrados = [...pokemons];
      }}><i class="bi bi-arrow-clockwise text-l" /></button
    >
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-accent m-1">
        <i class="bi bi-funnel-fill text-l" />
      </div>
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <ul
        tabindex="0"
        class="dropdown-content menu bg-base-300 rounded-box z-[1] w-52 p-2 shadow"
      >
        {#each tipos as tipo, index}
          <li>
            <button on:click={() => seleccionarTipo(tipo.toLowerCase())}
              >{tipo}</button
            >
          </li>
        {/each}
      </ul>
    </div>
  </div>
  <main class="grid md:grid-cols-4 grid-cols-2 gap-5 mt-3">
    {#each pokemonsFiltrados as pokemon, index}
      {#await fetchInfoPokemon(pokemon.url) then imagen}
        <PokemonCard {pokemon} {index} imagen={imagen.id} />
      {/await}
    {/each}
  </main>
</section>
