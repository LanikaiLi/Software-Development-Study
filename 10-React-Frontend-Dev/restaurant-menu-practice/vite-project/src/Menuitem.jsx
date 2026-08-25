function Menuitem({menu_item}) {
    return (
        <li key={menu_item.name}>{menu_item.name} - {menu_item.price}</li>
    )
}

export default Menuitem