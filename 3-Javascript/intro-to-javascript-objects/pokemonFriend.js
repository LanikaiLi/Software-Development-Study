const pokemonFriend = {
    name: "Charmander",
    nickname: "Scooter",

    evolve: () => {
        console.log(`${pokemonFriend.name} is evolving...`)
        if (pokemonFriend.name === "Charmander") {
            pokemonFriend.name = "Charmeleon"
        } else if (pokemonFriend.name === "Charmeleon") {
            pokemonFriend.name = "Charizard"
        }
        console.log(`It evolved into ${pokemonFriend.name}!`)
    },

    changeNickname: (newName) => {
        pokemonFriend.nickname = newName
    },
}