export const scriptsText = `
const searchBox = document.getElementById('search-box');
const resultsContainer = document.getElementById('results');
let activeIndex = -1;

function normalizeString(str) {
    return str
        .normalize('NFD')                       // Decompose diacritics
        .replace(/[\u0300-\u036f]/g, '')        // Remove diacritics
        .replace(/[\s,;.“”'"’/()]/g, '')        // Remove spaces and punctuation
        .toLowerCase();
}

function renderResults(query) {
    resultsContainer.innerHTML = '';
    if (!query) return;

    const startsWith = [];
    const contains = [];

    const normalizedQuery = normalizeString(query);

    headwordsArray.forEach(item => {
        const normalizedItem = normalizeString(item);
        if (normalizedItem.startsWith(normalizedQuery)) {
            startsWith.push(item);
        } else if (normalizedItem.includes(normalizedQuery)) {
            contains.push(item);
        }
    });

    startsWith.forEach(item => createResultItem(item, query));
    if (startsWith.length && contains.length) {
        const separator = document.createElement('div');
        separator.className = 'separator';
        resultsContainer.appendChild(separator);
    }
    contains.forEach(item => createResultItem(item, query));
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

function createResultItem(item, query) {
    const resultItem = document.createElement('div');
    resultItem.className = 'menu-item search-result';

    const normalizedQuery = normalizeString(query);
    const lowerItem = normalizeString(item);

    // Use a regular expression to find matches
    const escapedQuery = query.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
const regex = new RegExp('(' + escapedQuery + ')', 'gi');

    const highlightedItem = item.replace(regex, '<strong>$1</strong>');

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

searchBox.addEventListener('input', () => renderResults(searchBox.value));
searchBox.addEventListener('keydown', handleKeyboardNavigation);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.activeElement !== searchBox) {
        searchBox.value = '';
        clearResults();
        searchBox.focus();
    }
});

function handleBodyClick(event) {
            console.log(event)
            clearResults()
            }
document.body.addEventListener('click', handleBodyClick);


// copy heading to clipboard
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (event) => {
        if (event.target.tagName === 'IMG' && event.target.classList.contains('click-to-copy')) {
            event.preventDefault(); 
            const textToCopy = event.target.getAttribute('data-clipboard-text');
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    toggleSnackBar()
                }).catch(err => {
                    console.error('Failed to copy text:', err);
                });
            }
        }
    });
});

  function toggleSnackBar() {
    const appElement = document.getElementById("app");
    appElement.classList.remove("hide-snack-bar");
    setTimeout(() => {
      appElement.classList.add("hide-snack-bar");
    }, 900);
  }

// Function to apply the theme based on localStorage
        function applyTheme() {
            const theme = localStorage.getItem('theme');
            if (theme === 'dark') {
                document.body.classList.add('dark');
                document.body.classList.remove('light');
            } else {
                document.body.classList.remove('dark');
                document.body.classList.add('light');
            }
        }

        // Function to toggle the theme
        function toggleTheme() {
            if (document.body.classList.contains('dark')) {
                document.body.classList.remove('dark');
                document.body.classList.add('light');
                localStorage.setItem('theme', 'light');
                console.log("toggle")
            } else {
                document.body.classList.remove('light');
                document.body.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
        }

        // Initialize the theme on page load
        document.addEventListener('DOMContentLoaded', applyTheme);

        // Add event listener to the theme button
        document.getElementById('theme-button').addEventListener('click', toggleTheme);

// Function to focus on search box and select all its content
        function focusAndSelectSearchBox() {
            const searchBox = document.getElementById('search-box');
            searchBox.focus();
            searchBox.setSelectionRange(searchBox.value.length, searchBox.value.length);
            searchBox.select();
        }

        // Add event listener for window focus
        window.addEventListener('focus', focusAndSelectSearchBox);
`;
