import styles from "./Home.module.css"
import { Pokemon } from "../../components/Pokemon"
import React from "react"
import { Loader } from "../../components/Loader"

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
  const [isLoading, setLoading] = React.useState(true)
  const [isSuccess, setSuccess] = React.useState(false)
  const [isError, setError] = React.useState(false)

  React.useEffect(() => {
    fetchPokemon()
      .then(pokemonData => {
        setLoading(false)
        setSuccess(true)
        updatePokemonList(pokemonData)
      })
      .catch(() => {
        setLoading(false)
        setError(true)
      })
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
      {isLoading && <Loader />}
      {isError && <div>An error occured, please bring me a sandwich</div>}
      {isSuccess && (
        <div className={styles.pokemonList}>
          {displayedList.map(({ name, id, height, weight }) => {
            return <Pokemon name={name} id={id} key={id} height={height} weight={weight} />
          })}
        </div>
      )}
    </div>
  )
}
