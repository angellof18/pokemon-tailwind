<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  let pokemon = [];

  async function pokemonInfo(id) {
    const resultData = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await resultData.json();

    const resultUbicacion = await fetch(data.location_area_encounters);
    const ubicacion = await resultUbicacion.json();

    const resultDescription = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
    const description = await resultDescription.json();

    return {
      ...data,
      ubicaciones: ubicacion,
      descripcion: description.flavor_text_entries
        .find((entry) => entry.language.name === "es")
        .flavor_text.replace(/(\r\n|\n|\r|\f)/gm, " "),
    };
  }

  function split(x) {
    const locationParts = x.replace(/-/g, " ");
    return locationParts;
  }

  onMount(async () => {
    const id = $page.params.id;
    pokemon = await pokemonInfo(id);
    console.log(pokemon);
  });
</script>

<svelte:head>
  <title>{pokemon?.name ? pokemon.name.toUpperCase() : "Loading..."}</title>
</svelte:head>

<div class="hero bg-base-200 min-h-screen">
  <div class="hero-content text-center">
    <div class="flex flex-col gap-5">
      <div class="flex items-center gap-3">
        <a href="/" class="btn btn-secondary m-1"
          ><i class="bi bi-arrow-left text-l"></i></a
        >
        {#if pokemon.name}
          <h1 class="text-2xl md:text-5xl font-bold capitalize">
            {pokemon.name} - No. {pokemon.id}
          </h1>
        {:else}
          <div class="flex justify-center items-center w-full">
            <span class="loading loading-ring loading-lg"></span>
          </div>
        {/if}
      </div>
      <div class="flex w-full justify-center gap-5 py-6">
        {#if pokemon.sprites}
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
            alt={pokemon.name}
            width="96"
          />
        {/if}
      </div>

      {#if pokemon.types}
        <div class="flex gap-2 w-full justify-center items-center">
          {#each pokemon.types as type}
            <div class="tooltip capitalize" data-tip={type.type.name}>
              <img
                src={`https://pokedex.gabrielrapucci.com.br/images/types/${type.type.name}.svg`}
                alt={type.type.name}
                width="32"
              />
            </div>
          {/each}
        </div>
      {/if}

      <p class="max-w-md">{pokemon.descripcion}</p>
      {#if pokemon.stats}
        <div class="tooltip" data-tip={pokemon.stats[0].base_stat}>
          <strong class="w-24">HP</strong>
          <progress
            class="progress w-56"
            value={pokemon.stats[0].base_stat}
            max="255"
          ></progress>
        </div>
        <div class="tooltip" data-tip={pokemon.stats[1].base_stat}>
          <strong class="w-24">Attack</strong>
          <progress
            class="progress w-56"
            value={pokemon.stats[1].base_stat}
            max="255"
          ></progress>
        </div>
        <div class="tooltip" data-tip={pokemon.stats[2].base_stat}>
          <strong class="w-24">Defense</strong>
          <progress
            class="progress w-56"
            value={pokemon.stats[2].base_stat}
            max="255"
          ></progress>
        </div>
        <div class="tooltip" data-tip={pokemon.stats[3].base_stat}>
          <strong class="w-24">Special attack</strong>
          <progress
            class="progress w-56"
            value={pokemon.stats[3].base_stat}
            max="255"
          ></progress>
        </div>
        <div class="tooltip" data-tip={pokemon.stats[4].base_stat}>
          <strong class="w-24">Special defense</strong>
          <progress
            class="progress w-56"
            value={pokemon.stats[4].base_stat}
            max="255"
          ></progress>
        </div>
        <div class="tooltip" data-tip={pokemon.stats[5].base_stat}>
          <strong class="w-24">Speed</strong>
          <progress
            class="progress w-56"
            value={pokemon.stats[5].base_stat}
            max="255"
          ></progress>
        </div>
      {/if}

      {#if pokemon.ubicaciones}
        <div class="mt-5 w-full h-96 overflow-x-auto">
          <table class="table table-pin-rows">
            <thead>
              <tr>
                <th>Lugar de aparición</th>
              </tr>
            </thead>
            <tbody>
              {#each pokemon.ubicaciones as location}
                <tr><td>{split(location.location_area.name)}</td></tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </div>
  </div>
</div>
