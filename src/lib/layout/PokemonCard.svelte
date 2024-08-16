<script>
  export let pokemon;
  export let index;
  export let imagen;

  function extraerPokemonId(link) {
    const idImage = link.toString().padStart(3, "0");
    return idImage;
  }
</script>

<article class="card w-auto shadow-xl">
  <figure class="aspect-square w-full">
    <img
      src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${extraerPokemonId(imagen)}.png`}
      loading="lazy"
      alt={pokemon.name}
    />
  </figure>
  <div class="card-body">
    <h2 class="card-title">{pokemon.name.toUpperCase()}</h2>
    <p>{`No ${extraerPokemonId((index + 1).toString())}`}</p>
    <div class="card-actions justify-end">
      <a class="btn btn-primary" href={`/${pokemon.name}`}>Mas detalles</a>
    </div>
  </div>
</article>
