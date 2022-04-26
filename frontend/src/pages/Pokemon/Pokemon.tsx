import React from "react"
import { useParams } from "react-router-dom"
import { Loader } from "../../components/Loader"
import styles from "./Pokemon.module.css"

interface PokemonInfo {
  id: number
  name: string
  height: number
  weight: number
}

export const Pokemon = () => {
  const [pokemonData, updatePokemonData] = React.useState<PokemonInfo>({ id: 0, name: "", height: 0, weight: 0 })
  const [isLoading, setLoading] = React.useState(true)
  const [isSuccess, setSuccess] = React.useState(false)
  const [isError, setError] = React.useState(false)
  const { id } = useParams()

  function fetchPokemon() {
    return fetch(`http://localhost:8000/pokemon/${id}`, { headers: { accept: "application/json" } }).then(response =>
      response.json(),
    )
  }

  React.useEffect(() => {
    fetchPokemon()
      .then(pokemonData => {
        updatePokemonData(pokemonData)
        setLoading(false)
        setSuccess(true)
      })
      .catch(() => {
        setLoading(false)
        setError(true)
      })
  }, [])

  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  const imgBackUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
  const imgShinyUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${id}.png`
  const imgShinyBackUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/${id}.png`

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <div>An error occured, please, bring me a sandwich</div>}
      {isSuccess && (
        <div className={styles.Pokemon}>
          <div>{pokemonData.name[0].toUpperCase() + pokemonData.name.substring(1)}</div>
          <div>
            <img src={imgUrl}></img>
            <img src={imgBackUrl}></img>
          </div>
          <div>
            <img src={imgShinyUrl}></img>
            <img src={imgShinyBackUrl}></img>
          </div>
          <div>Height: {pokemonData.height * 10} cm</div>
          <div>Weight: {pokemonData.weight / 10} kg</div>
          <div>Id: {pokemonData.id}</div>
        </div>
      )}
    </div>
  )
}
