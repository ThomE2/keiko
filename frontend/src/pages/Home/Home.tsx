import styles from "./Home.module.css"
import { Pokemon } from "../../components/Pokemon"
import React from "react"
import { Loader } from "../../components/Loader"
import { useParams } from "react-router-dom"

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
  const { page } = useParams()
  const pageNumber =
    1 <= (page as unknown as number) && (page as unknown as number) <= 6 ? (page as unknown as number) : 1
  const previousPage = ((+pageNumber + 4) % 6) + 1
  const nextPage = (pageNumber % 6) + 1

  React.useEffect(() => {
    fetchPokemon()
      .then(pokemonData => {
        return pokemonData.filter(pokemon => (pageNumber - 1) * 30 < pokemon.id && pokemon.id <= pageNumber * 30)
      })
      .then(pokemonData => {
        updatePokemonList(pokemonData)
        setLoading(false)
        setSuccess(true)
      })
      .catch(() => {
        setLoading(false)
        setError(true)
      })
  }, [])

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value)
  }

  function fetchPokemon(): Promise<PokemonInfo[]> {
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
        <div>
          <div className={styles.slider}>
            <a className={styles.previousLink} href={`/pokedex/${previousPage}`} />
            <a className={styles.nextLink} href={`/pokedex/${nextPage}`} />
          </div>
          <div className={styles.pokemonList}>
            {displayedList.map(({ name, id, height, weight }) => {
              return <Pokemon name={name} id={id} key={id} height={height} weight={weight} />
            })}
          </div>
        </div>
      )}
    </div>
  )
}
