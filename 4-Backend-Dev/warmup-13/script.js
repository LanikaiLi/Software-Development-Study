// GOLD RUSH: log the word "gold" to the console by accessing it from this overly convoluted JSON object:

const matter = [{"compounds":["water","air"],"elements":[{"metals":[{"categoryName":"noble metals","lists":{"liquid":["mercury"],"solid":["silver","platinum","gold"]}}],"nonmetals":["oxygen","carbon","sulfur"]}]}]

console.log(matter[0].elements[0].metals[0].lists.solid[2])