function Mains({mains}) {
    return (
    <ul>
      {
        mains.map((main_item) => (
          <li key={main_item.name}>{main_item.name} - {main_item.price}</li>
        ))
      }
    </ul>
    )
}

export default Mains