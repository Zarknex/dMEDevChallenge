import axios from 'axios'

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/'

const PokeApiService = {
  async getPokemonTypes(): Promise<{ type: string; url: string }[]> {
    try {
      const generationResponse = await axios.get(`${POKEAPI_BASE_URL}generation/1`)
      const types = generationResponse.data.types

      const typeDetails = await Promise.all(
        types.map(async (type: any) => {
          const typeData = await axios.get(type.url)

          const spriteUrl = typeData.data.sprites?.['generation-ix']?.['scarlet-violet']?.name_icon

          return {
            type: type.name,
            url: spriteUrl || ''
          }
        })
      )

      return typeDetails
    } catch (error) {
      console.error('Error fetching Pokémon types:', error)
      throw new Error('Failed to fetch Pokémon types')
    }
  },

  async getRandomPokemonByType(typeName: string): Promise<any | null> {
    try {
      const typeResponse = await axios.get(`${POKEAPI_BASE_URL}type/${typeName}`)
      const pokemonList = typeResponse.data.pokemon

      const validPokemons = pokemonList.filter((pokemonObj: any) => {
        const urlParts = pokemonObj.pokemon.url.split('/')
        const id = parseInt(urlParts[urlParts.length - 2], 10)
        return id >= 1 && id <= 151
      })

      if (validPokemons.length > 0) {
        const randomIndex = Math.floor(Math.random() * validPokemons.length)
        const randomPokemon = validPokemons[randomIndex]

        const pokemonDetailsResponse = await axios.get(randomPokemon.pokemon.url)
        const pokemonDetails = pokemonDetailsResponse.data

        const speciesResponse = await axios.get(
          `${POKEAPI_BASE_URL}pokemon-species/${pokemonDetails.name}`
        )
        const flavorTextEntries = speciesResponse.data.flavor_text_entries
        const englishEntry = flavorTextEntries.find((entry: any) => entry.language.name === 'en')
        let description = englishEntry ? englishEntry.flavor_text : flavorTextEntries[0].flavor_text

        description = description.replace(/[\n\f]/g, ' ').replace(/\s\s+/g, ' ')

        return {
          ...pokemonDetails,
          description
        }
      } else {
        console.error('No valid Pokémon found for this type.')
        return null
      }
    } catch (error) {
      console.error('Error fetching Pokémon by type:', error)
      return null
    }
  }
}

export default PokeApiService
