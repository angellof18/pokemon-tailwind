<script>
  import { onMount } from "svelte";
  import PokemonCard from "../lib/layout/PokemonCard.svelte";

  let pokemons = "";
  let pokemonsFiltrados = [];
  let searchTerm = "";

  function handleSubmit(e) {
    const form = new FormData(e.target);
    searchTerm = form.get("searchTerm");
    filterPokemons(searchTerm);
  }

  function filterPokemons(x) {
    if (searchTerm.trim() !== "") {
      pokemonsFiltrados = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(x.toLowerCase())
      );
      return;
    }
    pokemonsFiltrados = [...pokemons]; // Restablece la lista original para volver a mostrar todos los pokemones.
  }

  async function fetchPokemons() {
    const result = await fetch("https://pokeapi.co/api/v2/pokemon");
    const data = await result.json();
    return data["results"];
  }

  async function fetchPokemonData(x) {
    const result = await fetch(x);
    const data = await result.json();
    return data;
  }

  onMount(async () => {
    pokemons = await fetchPokemons();
    pokemonsFiltrados = [...pokemons]; // Copia de seguridad de la lista original para evitar mutaciones al filtrar los pokemones.
  });
</script>

<svelte:head>
  <title>POKEDEX</title>
</svelte:head>

<section class="max-w-4xl mx-auto py-4">
  <div class="flex gap-2">
    <form
      class="flex gap-2 w-full"
      on:submit|preventDefault={(e) => handleSubmit(e)}
    >
      <input
        type="text"
        name="searchTerm"
        class="input input-bordered grow"
        placeholder="Buscar por nombre de Pokémon"
      />
      <button class="btn" type="submit">Buscar</button>
    </form>
  </div>

  <main class="grid md:grid-cols-4 grid-cols-2 gap-5 mt-3">
    {#each pokemonsFiltrados as pokemon, index}
      {#await fetchPokemonData(pokemon.url)}
        <p>cargando...</p>
      {:then imagen}
        <PokemonCard {pokemon} {index} imagen={imagen.id} />
      {/await}
    {/each}
  </main>
</section>
