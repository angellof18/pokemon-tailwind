<script>
  import PokemonCard from "../lib/layout/PokemonCard.svelte";

  export let data;
  let pokemons = data.pokemons;
</script>

<main class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
  {#each pokemons as pokemon, index}
    <PokemonCard {pokemon}/>
  {/each}
</main>
