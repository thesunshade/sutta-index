export const scriptsText = `
const searchBox = document.getElementById('search-box');
const resultsContainer = document.getElementById('results');
let activeIndex = -1;

function renderResults(query) {
    resultsContainer.innerHTML = '';
    if (!query) return;

    const startsWith = [];
    const contains = [];

    headwordsArray.forEach(item => {
        const lowerItem = item.toLowerCase();
        const lowerQuery = query.toLowerCase();
        if (lowerItem.startsWith(lowerQuery)) {
            startsWith.push(item);
        } else if (lowerItem.includes(lowerQuery)) {
            contains.push(item);
        }
    });

    startsWith.forEach(item => createResultItem(item));
    if (startsWith.length && contains.length) {
        const separator = document.createElement('div');
        separator.className = 'separator';
        resultsContainer.appendChild(separator);
    }
    contains.forEach(item => createResultItem(item));
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

function createResultItem(item) {
    const resultItem = document.createElement('div');
    resultItem.className = 'menu-item search-result';
    resultItem.textContent = item;
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
    const items = resultsContainer.querySelectorAll('.result-item');
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

`;
