import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

const appSettings = {
    databaseURL: "https://realtime-database-a5bc0-default-rtdb.firebaseio.com//"
}

const app = initializeApp(appSettings)
const database = getDatabase(app) 
const InDB = shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")
addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)

    clearInputField()

    appendItemToShoppingListEl(itemValue)
    
})

onValue(shoppingListInDB, function(snapshot) {
    let itemsArray = Object.values(snapshot.val())

    clearShoppingListEl()

    for (let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]

        appendItemToShoppingListEl(itemsArray[i])
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = "" 
}

function clearInputField() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(itemValue) {
    shoppingListEl.innerHTML += '<li>${itemValue}</li>'
}