export const scriptsText = `
const searchBox = document.getElementById('search-box');
const resultsContainer = document.getElementById('results');
let activeIndex = -1;

function normalizeString(str) {
    return str
        .normalize('NFD')                       // Decompose diacritics
        .replace(/[\u0300-\u036f]/g, '')        // Remove diacritics
        .replace(/[\\s,;.“”'"’/()]/g, '')        // Remove spaces and punctuation
        .toLowerCase();
}

function renderResults({query, firstOnly}) {
    resultsContainer.innerHTML = '';
    if (!query) return;

    const startsWith = [];
    const contains = [];

    const normalizedQuery = normalizeString(query);

    headwordsArray.forEach(item => {
        const normalizedItem = normalizeString(item);
        if (normalizedItem.startsWith(normalizedQuery)) {
            startsWith.push(item);
        } else if (normalizedItem.includes(normalizedQuery)&&!firstOnly) {
            contains.push(item);
        }
    });

    startsWith.forEach(item => createResultItem(item, query, firstOnly));
    if (startsWith.length && contains.length) {
        const separator = document.createElement('div');
        separator.className = 'separator';
        resultsContainer.appendChild(separator);
    }
    contains.forEach(item => createResultItem(item, query, firstOnly));
    resultsContainer.scrollTop = 0
}

function makeNormalizedId(text) {
    return text
        .trim()
        .replace("ā", "aa")
        .replace("ī", "ii")
        .replace("ū", "uu")
        .replace("Ā", "Aa")
        .replace("xref ", "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ /g, "-")
        .replace(/[,;.“”'"’/()]/g, "");
}

function createResultItem(item, query, firstOnly) {
    const resultItem = document.createElement('div');
    resultItem.className = 'menu-item search-result';

    const normalizedQuery = normalizeString(query);
    const lowerItem = normalizeString(item);

    // Use a regular expression to find matches
    const escapedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
const regex = new RegExp('(' + escapedQuery + ')', 'gi');

    let highlightedItem;

    if (firstOnly){
    highlightedItem = item;
    } else {
     highlightedItem = item.replace(regex, '<strong>$1</strong>');}

    resultItem.innerHTML = highlightedItem;

    resultItem.addEventListener('click', () => {
        searchBox.value = '';
        resultsContainer.innerHTML = '';
        document.getElementById(makeNormalizedId(item)).scrollIntoView({ behavior: 'smooth' });
    });

    resultsContainer.appendChild(resultItem);
}

function clearResults() {
    resultsContainer.innerHTML = '';
    activeIndex = -1;
}

function handleKeyboardNavigation(e) {
    const items = resultsContainer.querySelectorAll('.search-result');
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = (activeIndex + 1) % items.length;
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = (activeIndex - 1 + items.length) % items.length;
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeIndex > -1) {
            items[activeIndex].click();
        } else if (items.length > 0) {
            items[0].click(); // Click the first item if no item is active
        }
    } else if (e.key === 'Escape') {
        searchBox.value = '';
        clearResults();
        searchBox.focus();
    }
    items.forEach((item, index) => {
        item.classList.toggle('active', index === activeIndex);
    });
}

searchBox.addEventListener('input', () => renderResults({query: searchBox.value, firstOnly: false}));
searchBox.addEventListener('keydown', handleKeyboardNavigation);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.activeElement !== searchBox) {
        searchBox.value = '';
        clearResults();
        searchBox.focus();
    }
});


// Function to focus on search box and select all its content
        function focusAndSelectSearchBox() {
            const searchBox = document.getElementById('search-box');
            searchBox.focus();
            searchBox.setSelectionRange(searchBox.value.length, searchBox.value.length);
            searchBox.select();
        }

// Add event listener for window focus
window.addEventListener('focus', focusAndSelectSearchBox);

        
// Function to handle letter button clicks
function handleLetterClick(event) {
    const clickedLetter = event.target.textContent.trim();
    renderResults({query: clickedLetter, firstOnly: true});
}

// Attach event listeners to all letter buttons
document.querySelectorAll('.letter').forEach(button => {
    button.addEventListener('click', handleLetterClick);
});


function handleBodyClick(event) {
    const settingsBar = document.getElementById('settings-bar');
    if (settingsBar.contains(event.target)) {
        // If the click is inside the settings-bar, do nothing
        return;
    }
    clearResults();
}

document.body.addEventListener('click', handleBodyClick);

// ---------------------------------

function copyElementDOMToClipboard(elementId) {
    // Get the element by its ID
    const element = document.getElementById(elementId);

    if (!element) {
        console.error('Element not found');
        return;
    }

    // Convert the element's outer HTML to a string
    let elementHTML = element.outerHTML;

    elementHTML=elementHTML.replace(/ target="_blank" rel="noreferrer"/g,"")
        .replace(/ (class|title|id)=".+?"/g, "")
        .replace(/<img.+?>/g,"")
        .replace(/<small>(.+?)<\\/small>/g, "$1")

  //console.log(elementHTML)
}

// Usage
copyElementDOMToClipboard('wrong-path-kummagga');


`;
