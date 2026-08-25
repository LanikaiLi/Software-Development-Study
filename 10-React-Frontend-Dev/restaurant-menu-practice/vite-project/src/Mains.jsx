import Menuitem from './Menuitem'

function Mains({mains}) {
    return (
    <ul>
      {
        mains.map((main_item) => (
          <Menuitem menu_item={main_item} />
        ))
      }
    </ul>
    )
}

export default Mains