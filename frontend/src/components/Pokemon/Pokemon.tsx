import { Animate } from "../Animate"
import styles from "./Pokemon.module.css"

interface Props {
  name: string
  id: number
  key: number
  height: number
  weight: number
}

const PokemonComponent = ({ name, id, height, weight }: Props) => {
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  const link = `/pokemon/${id}`
  return (
    <div className={styles.pokemonCard}>
      <a className={styles.pokemonCardLink} href={link}>
        <p>{name[0].toUpperCase() + name.substring(1)}</p>
        <img src={imgUrl}></img>
        <p>Number: {id}</p>
        <p>Height: {height * 10} cm</p>
        <p>Weight: {weight / 10} kg</p>
      </a>
    </div>
  )
}

export const Pokemon = Animate<Props>("tada")(PokemonComponent)
