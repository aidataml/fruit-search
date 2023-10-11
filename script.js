const input = document.querySelector('#fruit');
const unorderedList = document.querySelector(".suggestions ul");
const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
    // Assign an empty array to a variable named results.
	let results = [];

    // Make the text lowercase for an easier comparison to the existing fruit list.
    let searchInput = str.toLowerCase();

    // Loop over the fruit list. Add fruit names that include the search input to the results array. 
    for (let i of fruit) {
        if (i.toLowerCase().includes(searchInput)) {
            results.push(i);
        }
    }
    // Return an array of fruits that match the search input.
	return results;
}

function searchHandler(e) {

    // Assign the text entered into the searchbox to a variable named searchInput.
    let searchInput = input.value.toLowerCase();

    // Assign results from the search function to a variable named results. Pass in the search input.
    let results = search(searchInput);

    // Call the function showSuggestions. Pass in the results array and search input.
    showSuggestions(results, searchInput);
}


function showSuggestions(results, searchInput) {

    // Empty search box and clear previous suggestions.
    unorderedList.innerHTML = "";

	for (let i of results) {
        // Make the fruit list lowercase for an easier comparison to the entered text.
        let lowercaseFruit = i.toLowerCase();
        // Assign the index of the entered text to a variable named startingIndex.
        let startingIndex = lowercaseFruit.indexOf(searchInput);

        if (startingIndex !== -1) {
            // If an index position is found, create a list item.
            let listItem = document.createElement("li");
            // Call the useSuggestion function when a user clicks a suggestion list item and pass in the fruit selected.
            listItem.setAttribute("onclick", `useSuggestion('${i}')`);

            // Add has-suggestions css class to the unordered list.
            unorderedList.classList.add("has-suggestions");
            
            // Find the index of the matching substring and separate the string into substrings around the match.
            let beforeMatch = i.substring(0, startingIndex); // Start at index 0 and end before the starting index of the match.
            let match = i.substring(startingIndex, startingIndex + searchInput.length); // Matched text will start at the starting index and end at the length of the search input.
            let afterMatch = i.substring(startingIndex + searchInput.length); // afterMatch starts after the matched text.
            
            // Change the list item to display bold around the matching text.
            listItem.innerHTML = `${beforeMatch}<b>${match}</b>${afterMatch}`;

            // Add the list item to the end of the suggestion list.
            unorderedList.appendChild(listItem);
        }
    }
}

function useSuggestion(suggestion) {
    // When clicked (see showSuggestions()), change the search input to the suggestion.
    input.value = suggestion;

    // Clear suggestions after one is selected.
    unorderedList.innerHTML = "";

    // Remove formatting for the suggestion list.
    unorderedList.classList.remove("has-suggestions");
}

// Call the searchHandler function when a key is released from the search input box.
input.addEventListener('keyup', searchHandler);