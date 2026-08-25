import Menuitem from './Menuitem'

function Starters({starters}) {
    return (
        <ul>
            {starters.map((starter) => (
                <Menuitem menu_item={starter} />
            ))}
        </ul>
    )
}

export default Starters