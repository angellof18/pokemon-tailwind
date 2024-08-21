<script>
  export let pokemon;

  function extraerPokemonId(link) {
    const idImage = link.toString().padStart(3, "0");
    return idImage;
  }
</script>

<a
  class="card w-auto shadow-md px-2 py-2 transition-all duration-300 hover:scale-[1.05]"
  href={`/${pokemon.name}`}
>
  <figure class="aspect-square w-full">
    <img
      src={`https://img.pokemondb.net/sprites/home/normal/${pokemon.name}.png`}
      loading="lazy"
      width="150"
      alt={pokemon.name}
    />
  </figure>
  <div class="card-body">
    {#if pokemon.types}
      <div class="flex gap-2 w-full justify-center items-center">
        {#each pokemon.types as type}
          <img
            src={`https://pokedex.gabrielrapucci.com.br/images/types/${type.type.name}.svg`}
            alt={type.type.name}
            width="32"
          />
        {/each}
      </div>
    {/if}
    <div class="flex flex-col items-center">
      <h2 class="font-bold capitalize">{pokemon.name}</h2>
      <p class="m-auto text-slate-400">
        #{extraerPokemonId(pokemon.id.toString())}
      </p>
    </div>
  </div>
</a>
