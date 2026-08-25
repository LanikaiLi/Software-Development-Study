function Desserts({desserts}) {
    return (
        <ul>
        {
          desserts.map((dessert_item) => (
            <li key={dessert_item.name}>{dessert_item.name} - {dessert_item.price}</li>
          ))
        }
      </ul>
    )
}

export default Desserts