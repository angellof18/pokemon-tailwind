<script>
  import { onMount } from "svelte";

  export let data;
  const { pokemon } = data;

  let locations = [];
  let especie = [];
  let sprites = [];

  async function fetchLocations() {
    const result = await fetch(pokemon.location_area_encounters);
    const data = await result.json();
    return data;
  }

  async function fetchEspecie() {
    const result = await fetch(pokemon.species.url);
    const data = await result.json();
    return data;
  }

  async function fetchSprites() {
    const result = await fetch(pokemon.forms[0].url);
    const data = await result.json();
    return data;
  }

  function splitLocations(x) {
    const locationParts = x.replace(/-/g, " ");
    return locationParts;
  }

  onMount(async () => {
    sprites = await fetchSprites();
    locations = await fetchLocations();
    especie = await fetchEspecie();
  });
</script>

<div class="hero bg-base-200 min-h-screen">
  <div class="hero-content text-center">
    <div class="flex flex-col">
      <h1 class="text-5xl font-bold">
        {pokemon.name.toUpperCase()} - No. {pokemon.id}
      </h1>
      <div class="flex w-full justify-center gap-5 py-6">
        {#if sprites && sprites.sprites}
          <img src={sprites.sprites.front_default} alt={pokemon.name} />
          <img src={sprites.sprites.back_default} alt={pokemon.name} />
        {/if}
      </div>
      <div class="stats stats-vertical lg:stats-horizontal shadow">
        <div class="stat">
          <div class="stat-title text-xl">Grupo</div>
          <div class="stat-desc">
            {#if especie.egg_groups}
              <ul>
                {#each especie.egg_groups as egg}
                  <li>{egg.name}</li>
                {/each}
              </ul>
            {/if}
          </div>
        </div>

        <div class="stat">
          <div class="stat-title text-xl">Abilities</div>
          <div class="stat-desc">
            {#if pokemon.abilities}
              <ul>
                {#each pokemon.abilities as hability}
                  <li>{hability.ability.name}</li>
                {/each}
              </ul>
            {/if}
          </div>
        </div>

        <div class="stat">
          <div class="stat-title text-xl">Color</div>
          <div class="stat-desc">
            {#if especie.color}
              <p>{especie.color.name}</p>
            {/if}
          </div>
        </div>
      </div>

      <!--lsacbalsck-->
      <div class="stats stats-vertical lg:stats-horizontal shadow mt-4">
        <div class="stat">
          <div class="stat-title text-xl">Experiencia base</div>
          <div class="stat-desc">
            <p>{pokemon.base_experience}</p>
          </div>
        </div>

        <div class="stat">
          <div class="stat-title text-xl">Felicidad base</div>
          <div class="stat-desc">
            <p>{especie.base_happiness}</p>
          </div>
        </div>

        <div class="stat">
          <div class="stat-title text-xl">Ratio de captura</div>
          <div class="stat-desc">
            <p>{especie.capture_rate}</p>
          </div>
        </div>

        <div class="stat">
          <div class="stat-title text-xl">Peso</div>
          <div class="stat-desc">
            <p>{pokemon.height}</p>
          </div>
        </div>
      </div>

      {#if locations.length > 0}
        <div class="mt-5 w-full h-96 overflow-x-auto">
          <table class="table table-pin-rows">
            <thead>
              <tr>
                <th>Lugar de aparición</th>
              </tr>
            </thead>
            <tbody>
              {#each locations as location}
                <tr><td>{splitLocations(location.location_area.name)}</td></tr>
              {/each}
            </tbody>
          </table>
        </div>
      {/if}
    </div>
  </div>
</div>
