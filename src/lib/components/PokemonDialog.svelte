<script>
  export let pokemon;

  function extraerIdType(url) {
    const urlSplit = url.split("/");
    return urlSplit[urlSplit.length - 2];
  }
</script>

<!-- Put this part before </body> tag -->
<input type="checkbox" id={`"my_modal_${pokemon.id}"`} class="modal-toggle" />
<div class="modal modal-bottom sm:modal-middle" role="dialog">
  <div class="modal-box px-6 py-10">
    <div class="flex flex-col items-center gap-5">
      <div class="flex items-center justify-center gap-3">
        {#if pokemon.name}
          <h1 class="text-2xl md:text-3xl font-bold capitalize">
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
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/${extraerIdType(type.type.url)}.png`}
                alt={type.type.name}
                width="80"
              />
            </div>
          {/each}
        </div>
      {/if}
      {#if pokemon.stats}
        <div class="tooltip" data-tip={pokemon.stats[0].base_stat}>
          <strong class="w-24">HP</strong>
          <progress
            class="progress w-56"
            value={pokemon.stats[0].base_stat}
            max="150"
          ></progress>
        </div>
        <div class="tooltip" data-tip={pokemon.stats[1].base_stat}>
          <strong class="w-24">Attack</strong>
          <progress
            class="progress w-56"
            value={pokemon.stats[1].base_stat}
            max="150"
          ></progress>
        </div>
        <div class="tooltip" data-tip={pokemon.stats[2].base_stat}>
          <strong class="w-24">Defense</strong>
          <progress
            class="progress w-56"
            value={pokemon.stats[2].base_stat}
            max="150"
          ></progress>
        </div>
        <div class="tooltip" data-tip={pokemon.stats[5].base_stat}>
          <strong class="w-24">Speed</strong>
          <progress
            class="progress w-56"
            value={pokemon.stats[5].base_stat}
            max="150"
          ></progress>
        </div>
        <div class="tooltip" data-tip={pokemon.stats[3].base_stat}>
          <strong class="w-24">Special attack</strong>
          <progress
            class="progress w-56"
            value={pokemon.stats[3].base_stat}
            max="150"
          ></progress>
        </div>
        <div class="tooltip" data-tip={pokemon.stats[4].base_stat}>
          <strong class="w-24">Special defense</strong>
          <progress
            class="progress w-56"
            value={pokemon.stats[4].base_stat}
            max="150"
          ></progress>
        </div>
      {/if}
    </div>
  </div>
  <label class="modal-backdrop" for={`"my_modal_${pokemon.id}"`}>Close</label>
</div>
