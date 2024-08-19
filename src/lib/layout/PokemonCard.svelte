<script>
  export let pokemon;

  function extraerPokemonId(link) {
    const idImage = link.toString().padStart(3, "0");
    return idImage;
  }
</script>

<article class="card w-auto shadow-md px-2 py-2">
  <figure class="aspect-square w-full">
    <img
      src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${extraerPokemonId(pokemon.id)}.png`}
      loading="lazy"
      alt={pokemon.name}
    />
  </figure>
  <div class="card-body">
    {#if pokemon.types}
      <div class="flex gap-2 w-full justify-center items-center">
        {#each pokemon.types as type}
          <div class="badge badge-primary capitalize">
            {type.type.name}
          </div>
        {/each}
      </div>
    {/if}
    <div class="flex flex-col items-center">
      <h2 class="font-bold capitalize">{pokemon.name}</h2>
      <p class="m-auto text-slate-400">
        {extraerPokemonId(pokemon.id.toString())}
      </p>
    </div>

    <div class="card-actions justify-center mt-2">
      <a class="btn btn-secondary btn-sm" href={`/${pokemon.name}`}
        >Mas detalles</a
      >
    </div>
  </div>
</article>
