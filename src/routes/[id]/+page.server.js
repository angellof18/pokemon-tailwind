export async function load({ params }) {
  async function pokemonInfo() {
    const result = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${params.id}`
    );
    const pokemon = await result.json();
    return pokemon;
  }
  return {
    pokemon: await pokemonInfo(),
  };
}
