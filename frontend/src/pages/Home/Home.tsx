import styles from "./Home.module.css"
import { Pokemon } from "../../components/Pokemon"
import React from "react"

interface Pokemon {
  name: string
  id: number
}

const pokemonList: Pokemon[] = [
  {
    name: "Bulbizarre",
    id: 1,
  },
  {
    name: "Herbizarre",
    id: 2,
  },
  {
    name: "Florizarre",
    id: 3,
  },
]

function filterPokemonsByName(pokemons: Pokemon[], filterName: string) {
  return pokemons.filter(({ name }) => name.includes(filterName))
}

export const Home = () => {
  const [filterValue, setFilterValue] = React.useState("")

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value)
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
