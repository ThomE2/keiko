import styles from "./Home.module.css"
import { Pokemon } from "../../components/Pokemon"

export const Home = () => {
  return (
    <div>
      <div className={styles.intro}>
        <div>Bienvenue sur ton futur pokédex !</div>
        <div>Tu vas pouvoir apprendre tout ce qu'il faut sur React et attraper des pokemons !</div>
      </div>
      <Pokemon name="Bulbizarre" id="1" />
      <Pokemon name="Herbizarre" id="2" />
      <Pokemon name="Florizarre" id="3" />
    </div>
  )
}
