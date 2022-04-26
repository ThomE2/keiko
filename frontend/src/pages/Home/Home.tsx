import styles from "./Home.module.css"
import { Pokemon } from "../../components/Pokemon"
import React from "react"

interface PokemonInfo {
  id: number
  name: string
  height: number
  weight: number
}

function filterPokemonsByName(pokemons: PokemonInfo[], filterName: string) {
  return pokemons.filter(({ name }) => name.includes(filterName))
}

export const Home = () => {
  const [filterValue, setFilterValue] = React.useState("")
  const [pokemonList, updatePokemonList] = React.useState<PokemonInfo[]>([])

  React.useEffect(() => {
    fetchPokemon().then(pokemonData => updatePokemonList(pokemonData))
  }, [])

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value)
  }

  function fetchPokemon() {
    return fetch("http://localhost:8000/pokemons", { headers: { accept: "application/json" } }).then(response =>
      response.json(),
    )
  }

  const displayedList = filterPokemonsByName(pokemonList, filterValue)

  return (
    <div>
      <div className={styles.intro}>
        <div>Pokedex</div>
      </div>
      <input className={styles.input} onChange={onInputChange} value={filterValue} />
      <div className={styles.pokemonList}>
        {displayedList.map(({ name, id, height, weight }) => {
          return <Pokemon name={name} id={id} key={id} height={height} weight={weight} />
        })}
      </div>
    </div>
  )
}
