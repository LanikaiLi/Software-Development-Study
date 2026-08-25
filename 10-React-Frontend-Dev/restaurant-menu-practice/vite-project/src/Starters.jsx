function Starters({starters}) {
    return (
        <ul>
            {starters.map((starter) => (
                <li key={starter.name}>{starter.name} - {starter.price}</li>
            ))}
        </ul>
    )
}

export default Starters