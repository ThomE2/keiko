import styles from "./Home.module.css"
import { Pokemon } from "../../components/Pokemon"
import React from "react"

interface Pokemon {
  name: string
  id: number
}

interface PokemonInfo {
  id: number
  name: string
  height: number
  weight: number
}

function filterPokemonsByName(pokemons: Pokemon[], filterName: string) {
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
        <div>Bienvenue sur ton futur pokédex !</div>
        <div>Tu vas pouvoir apprendre tout ce qu'il faut sur React et attraper des pokemons !</div>
      </div>
      <input className={styles.input} onChange={onInputChange} value={filterValue} />
      {displayedList.map(({ name, id }) => {
        return <Pokemon name={name} id={id} key={id} />
      })}
    </div>
  )
}
