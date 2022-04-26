import styles from "./Pokemon.module.css"

interface Props {
  name: string
  id: number
  key: number
  height: number
  weight: number
}

export const Pokemon = ({ name, id, height, weight }: Props) => {
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  return (
    <div className={styles.pokemonCard}>
      <p>{name[0].toUpperCase() + name.substring(1)}</p>
      <img src={imgUrl}></img>
      <p>Number: {id}</p>
      <p>Height: {height * 10} cm</p>
      <p>Weight: {weight / 10} kg</p>
    </div>
  )
}
