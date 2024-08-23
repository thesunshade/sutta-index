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
    hideInfo()
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
    hideInfo()
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
        hideInfo()
        searchBox.focus();
    }
    items.forEach((item, index) => {
        item.classList.toggle('active', index === activeIndex);
    });

    if (activeIndex > -1) {
        const activeItem = items[activeIndex];
        activeItem.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
}

searchBox.addEventListener('input', () => renderResults({query: searchBox.value, firstOnly: false}));
searchBox.addEventListener('keydown', handleKeyboardNavigation);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.activeElement !== searchBox) {
        searchBox.value = '';
        clearResults();
        hideInfo()
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
    hideInfo()
}

document.body.addEventListener('click', handleBodyClick);

// info area

// Add event listener to the info button
    document.getElementById('info-button').addEventListener('click', toggleInfo);
    
    function hideInfo(){
    const infoArea = document.getElementById('info-area')
    infoArea.classList.add('hidden');
    }

    function toggleInfo(){
        const infoArea = document.getElementById('info-area')

        if (infoArea.classList.contains("hidden")){
        clearResults();
        infoArea.classList.remove('hidden');
        } else {
        infoArea.classList.add("hidden") 
        }
    }

      const allDetails = document.querySelectorAll("details");

  allDetails.forEach(details => {
    details.addEventListener("toggle", e => {
      if (details.open) {
        allDetails.forEach(details => {
          if (details !== e.target && details.open) {
            details.open = false;
          }
        });
      }
    });
  });



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
        .replace(/ (title)=".+?"/g, "")
        .replace(/<img.+?>/g,"")
        .replace(/<small class="sutta-name">(.+?)<\\/small>/g, "$1")
        .replace(/>\\s+?</g, "><")
        .replace(/(\\S)\\s+?</g, "$1<")
        .replace(/>\\s+?(\\S.)/g, ">$1")
        .replace(/<div id=".+?">(.+)<\\/div>/, "$1")
        //.replace(/<span/g, "\\n     <span")
        //.replace(/<div/g, "\\n\\n<div")
        .replace(/<div class="head-word-area"><a class="headword-link" href="#(.+?)"><span class="head-word">(.+?)<\\/span><\\/a><\\/div>/,'{\\n  "$2": {\\n    "anchor": "$1",\\n    "subheads": [\\n')
        .replace(/<div class="sub-word">(.+?)<span class="locator-list">/g, '      {\\n        "title": "$1",\\n        "links": [\\n')
        .replace(/<a href="(.+?)" class=".+?">(.+?)<\\/a>,*/g, '\\t{\\n\\t\\t"url": "$1",\\n\\t\\t"location": "$2"\\n\\t},\\n' )
        .replace(/<\\/span><\\/div>/g, "        ]\\n      },\\n")
        .replace(/;<br>/g,"")
        .replace(/,\\s*(}|\\])/g, '$1') // Remove trailing comma before } or ]
        .replace(/(\\{|\\[)\\s*,\\s*(?![\\{\\[])/g, '$1') // Remove trailing comma after { or [
        + "\\n    ]\\n  }\\n}";

        //console.log(elementHTML)
        //console.log(JSON.parse(elementHTML))
}

// Usage
copyElementDOMToClipboard('glorifying-one-self');

`;
