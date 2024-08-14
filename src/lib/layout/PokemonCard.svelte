<script>
  import { onMount } from "svelte";

  export let pokemon;
  let pokemonData = null;

  function extraerPokemonId(link) {
    const idImage = link.toString().padStart(3, "0");
    return idImage;
  }

  async function fetchPokemon() {
    const result = await fetch(pokemon.url);
    const data = await result.json();
    return data;
  }

  onMount(async () => {
    pokemonData = await fetchPokemon();
  });
</script>

<article class="card w-auto shadow-xl">
  <figure class="aspect-square w-full">
    {#if pokemonData}
      <img
        src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${extraerPokemonId(pokemonData.id)}.png`}
        alt={pokemon.name}
      />
    {/if}
  </figure>
  <div class="card-body">
    <h2 class="card-title">{pokemon.name.toUpperCase()}</h2>
    <div class="card-actions justify-end">
      <a class="btn btn-primary" href={`/${pokemon.name}`}>Mas detalles</a>
    </div>
  </div>
</article>
