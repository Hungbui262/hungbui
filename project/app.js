
const card_displayed = new Map()
const user_chosen_card = new Map()
const computer_chosen_card = new Map()
// CLICK TO SEARCH POKEMON
function searchPok() {
  const cardContainer = document.getElementById("card-container")
  const pokName = document.getElementById(`pokName`).value
  getPokemonByName(pokName)
}
// RANDOM A POKEMON
function randomPok(){
  const id = Math.floor(Math.random()*(151-1) + 1);
  getPokemonById(id)
}
function clearCard(){
  const cardContainer = document.getElementById("card-container")
  cardContainer.innerHTML = " "
}
async function getPokemonById(id){
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  if(!response){
    console.log(`cannot fet pokemon with id ${id}`)
  } else {
    result = await response.json()
    card_displayed.set(result.id, result.name)
    pokemonCard(
      result.name,
      result.id,
      result.types,
      result.weight,
      result.height,
      result.stats[0].base_stat,
      result.stats[1].base_stat,
      result.stats[2].base_stat,
      result.stats[3].base_stat,
      result.stats[4].base_stat,
      result.stats[4].base_stat,
      result.abilities,
      result.sprites.front_default
    )
  }
}

// FET API TO GET SPECIFIC POKEMON
async function getPokemonByName(pokName){
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokName}`)
  if(!response){
    console.log(`cannot fetch pokemon: ${pokName}`)
  } else {
    result = await response.json()
    pokemonCard(
      result.name,
      result.id,
      result.types,
      result.weight,
      result.height,
      result.stats[0].base_stat,
      result.stats[1].base_stat,
      result.stats[2].base_stat,
      result.stats[3].base_stat,
      result.stats[4].base_stat,
      result.stats[4].base_stat,
      result.abilities,
      result.sprites.front_default
    )
  }
}
//provide name, type, and decription of a function parameter
/**
 *@param {string} name - the name of the Pokemon
 *@param {number} id - the id of the Pokemon
 *@param {array} types - the type of the Pokemon
 *@param {number} weight - the weight of the Pokemon
 *@param {number} height - the height of the Pokemon
 *@param {number} hp - base Health point
 *@param {number} attack - base attack damage
 *@param {number} defense - base defense 
 *@param {number} special_attack
 *@param {number} special_defense 
 *@param {number} speed
 *@param {array} abilities
 *@param {string} image_url - picture of Pokemon
 */

// GENERATE POKEMON CARD WITH BASIC 
function pokemonCard(
  name,
  id,
  types,
  weight,
  height,
  hp,
  attack,
  defense,
  special_attack,
  special_defense,
  speed,
  abilities,
  image_url,
  ){
const card = document.createElement("div")
card.className = "card"
//------------NAME AND ID-----------------------
const name_id_container = document.createElement("div")
name_id_container.className = "name_id_container"
const cardName = document.createElement("h1")
cardName.innerHTML = name.toUpperCase()
name_id_container.appendChild(cardName)
const cardId = document.createElement("h1")
cardId.innerHTML = "ID: " + id
name_id_container.appendChild(cardId)
card.appendChild(name_id_container)

//---------IMAGE---------------------------
const cardImage = document.createElement("img");
cardImage.src = image_url
card.appendChild(cardImage)

//-----------TYPE----------------------------------
const typeTitle = document.createElement("h1")
typeTitle.innerHTML = "Types"
card.appendChild(typeTitle)
const cardTypeList =  document.createElement("ul")
for(i = 0; i < types.length; i++){
  const eachType = document.createElement("li")
  eachType.innerHTML = `<strong> ${types[i].type.name} </strong>`
  cardTypeList.appendChild(eachType)
}
card.appendChild(cardTypeList)

//--------BASE STATS: Hp, attack, defense, special attack, special defense, speed--------

const tableStats = document.createElement("table")

const tr1 = document.createElement("tr")
tr1.innerHTML = `<td><strong> Hp: ${hp} Speed: ${speed} </strong></td>`
tableStats.appendChild(tr1)

const tr2 = document.createElement("tr")
tr2.innerHTML = `<td><strong> Attack: ${attack} Defense: ${defense} </strong></td>`
tableStats.appendChild(tr2) 

const tr3 = document.createElement("tr")
tr3.innerHTML = `<td><strong> Sp. Atk: ${special_attack} Sp. Def: ${special_defense} </strong></td>`
tableStats.appendChild(tr3)

card.appendChild(tableStats)

//----------ABILITIES-----------------------
const abilityTitle = document.createElement("h2")
abilityTitle.innerHTML = "ABILITIES"
card.appendChild(abilityTitle)
const abilitiesList = document.createElement("ul")
for(i = 0; i < abilities.length; i++){
  const eachAbility = document.createElement("li")
  eachAbility.innerHTML = `<strong> ${abilities[i].ability.name} </strong>`
  abilitiesList.appendChild(eachAbility)
}
card.appendChild(abilitiesList)
//------WEIGHT, HEIGHT-----------
const weight_height_table = document.createElement("table")

const weight_height_row = document.createElement("tr")
weight_height_row.innerHTML = `<tr> <strong> WEGHT: ${weight}lb HEIGHT: ${height}ft </strong></tr>`
card.appendChild(weight_height_row)

//-------CHOSE CARD---------------
const cardPickedContainer = document.createElement("div")
const buttonForCardPick = document.createElement("button")
buttonForCardPick.innerText = "PICK"
cardPickedContainer.appendChild(buttonForCardPick)
card.appendChild(cardPickedContainer)

const pickCard = () => {
  cardChosen(id, name)
}
buttonForCardPick.onclick = pickCard;

const cardContainer = document.getElementById("card-container")
cardContainer.append(card)
}
// USER WILL PICK 3 CARDS FROM DISPLAYED CARDS
function cardChosen(id, name){
  if(user_chosen_card.size > 2){
    alert("cannot add more than 3 pokemon to fight")
  } else{
    user_chosen_card.set(id, name)
    const table_chosen_card = document.createElement("table")
      const tr1 = document.createElement("tr")
    tr1.innerHTML = name
    table_chosen_card.appendChild(tr1)
    const chosen_card_container = document.getElementById("chosen-card-container")
    chosen_card_container.append(table_chosen_card)
  }
}

function comPickCard() {
  user_chosen_card.forEach((chosen_name, chosen_id)=>{
    card_displayed.delete(chosen_id)
  })
  const randomPok = []
  card_displayed.forEach((name, id) => {
    randomPok.push(id)
  })
  const randomId1 = Math.floor(Math.random()*(randomPok.length-1) + 1);
  const randomId2 = Math.floor(Math.random()*(randomPok.length-1) + 1);
    while(randomId2 == randomId1){
      Math.floor(Math.random()*(randomPok.length-1) + 1);
    }
  const randomId3 = Math.floor(Math.random()*(randomPok.length-1) + 1);
  while(randomId3 == randomId1 && randomId3 == randomId2 ){
    Math.floor(Math.random()*(randomPok.length-1) + 1);
  }
  computer_chosen_card.set(randomPok[randomId1], card_displayed.get(randomPok[randomId1]))
  computer_chosen_card.set(randomPok[randomId2], card_displayed.get(randomPok[randomId2]))
  computer_chosen_card.set(randomPok[randomId3], card_displayed.get(randomPok[randomId3]))

  
  const table_chosen_card = document.createElement("table")
  const tr1 = document.createElement("tr")
  const tr2 = document.createElement("tr")
  const tr3 = document.createElement("tr")
  alert("test value " + randomId1)
  tr1.innerHTML = computer_chosen_card.get(randomPok[randomId1])
  tr2.innerHTML = computer_chosen_card.get(randomPok[randomId2])
  tr3.innerHTML = computer_chosen_card.get(randomPok[randomId3])
table_chosen_card.appendChild(tr1)
table_chosen_card.appendChild(tr2)
table_chosen_card.appendChild(tr3)
const chosen_card_container = document.getElementById("chosen-card-container")
chosen_card_container.append(table_chosen_card)
  
}











