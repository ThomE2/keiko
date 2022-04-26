interface Props {
  name: string
  id: number
  key: number
}

export const Pokemon = ({ name, id }: Props) => {
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
  return (
    <div>
      <img src={imgUrl}></img>
      <p>Nom : {name}</p>
      <p>Numéro : {id}</p>
    </div>
  )
}
