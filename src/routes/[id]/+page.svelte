<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  let pokemon = [];

  async function pokemonInfo(id) {
    const resultData = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await resultData.json();

    const resultUbicacion = await fetch(data.location_area_encounters);
    const ubicacion = await resultUbicacion.json();

    return {
      ...data,
      ubicaciones: ubicacion,
    };
  }

  function split(x) {
    const locationParts = x.replace(/-/g, " ");
    return locationParts;
  }

  onMount(async () => {
    const id = $page.params.id;
    pokemon = await pokemonInfo(id);
    console.log(pokemon.ubicaciones);
  });
</script>

<svelte:head>
  <title>{pokemon?.name ? pokemon.name.toUpperCase() : "Loading..."}</title>
</svelte:head>

<div class="hero bg-base-200 min-h-screen">
  <div class="hero-content text-center">
    <div class="flex flex-col">
      <div class="flex items-center gap-3">
        <a href="/" class="btn btn-secondary m-1"
          ><i class="bi bi-arrow-left text-l"></i></a
        >
        <h1 class="text-2xl md:text-5xl font-bold">
          {pokemon?.name
            ? `${pokemon.name.toUpperCase()} - No. ${pokemon.id}`
            : "Loading..."}
        </h1>
      </div>
      <div class="flex w-full justify-center gap-5 py-6">
        {#if pokemon.sprites}
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width="128"
          />
          <img
            src={pokemon.sprites.back_default}
            alt={pokemon.name}
            width="128"
          />
        {/if}
      </div>

      {#if pokemon.types}
        <div class="flex gap-2 w-full justify-center items-center">
          {#each pokemon.types as type}
            <div class="badge badge-primary badge-lg capitalize">
              {type.type.name}
            </div>
          {/each}
        </div>
      {/if}

      {#if pokemon.stats}
        <div class="stats stats-vertical lg:stats-horizontal shadow mt-5">
            <div class="stat">
              <div class="stat-title text-xl capitalize">Hp</div>
              <div class="stat-desc">{pokemon.stats[0].base_stat}</div>
            </div>
            <div class="stat">
              <div class="stat-title text-xl capitalize">Attack</div>
              <div class="stat-desc">{pokemon.stats[1].base_stat}</div>
            </div>
            <div class="stat">
              <div class="stat-title text-xl capitalize">Defense</div>
              <div class="stat-desc">{pokemon.stats[2].base_stat}</div>
            </div>
            
        </div>
      {/if}
      {#if pokemon.stats}
        <div class="stats stats-vertical lg:stats-horizontal shadow mt-5">
            <div class="stat">
              <div class="stat-title text-xl capitalize">Special attack</div>
              <div class="stat-desc">{pokemon.stats[3].base_stat}</div>
            </div>
            <div class="stat">
              <div class="stat-title text-xl capitalize">Special defense</div>
              <div class="stat-desc">{pokemon.stats[4].base_stat}</div>
            </div>
            <div class="stat">
              <div class="stat-title text-xl capitalize">Speed</div>
              <div class="stat-desc">{pokemon.stats[5].base_stat}</div>
            </div>
            
        </div>
      {/if}

      <!--lsacbalsck-->
      <div class="stats stats-vertical lg:stats-horizontal shadow mt-4">
        <div class="stat">
          <div class="stat-title text-xl">Experiencia base</div>
          <div class="stat-desc">
            <p>{pokemon.base_experience}</p>
          </div>
        </div>

        <div class="stat">
          <div class="stat-title text-xl">Peso</div>
          <div class="stat-desc">
            <p>{pokemon.height}</p>
          </div>
        </div>
      </div>

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
