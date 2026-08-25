import Menuitem from './Menuitem'

function Desserts({desserts}) {
    return (
        <ul>
        {
          desserts.map((dessert_item) => (
            <Menuitem menu_item={dessert_item} />
          ))
        }
      </ul>
    )
}

export default Desserts