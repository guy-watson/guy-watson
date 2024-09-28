// Library array to store books
let library = [];

// Load books from localStorage on page load
window.onload = function() {
    library = JSON.parse(localStorage.getItem('library')) || [];
    displayBooks();
};

// Function to display books
function displayBooks() {
    const bookGrid = document.getElementById('book-grid');
    bookGrid.innerHTML = '';

    library.forEach((book, index) => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';

        bookItem.innerHTML = `
            <img class="book-cover" src="${book.thumbnail}" alt="Book cover">
            <div class="book-details">
                <div class="book-title">${book.title}</div>
                <div class="book-author">by ${book.author}</div>
                <div class="book-tags">
                    <span class="tag">${book.predefinedTag}</span>
                    <span class="tag">${book.customTag}</span>
                </div>
            </div>
            <button class="remove-book" onclick="removeBook(${index})">Remove</button>
            <div class="add-tag">
                <label>Add Tag: </label>
                <input type="text" id="customTag-${index}" placeholder="Add a tag">
                <button onclick="addCustomTag(${index})">Add</button>
            </div>
        `;

        bookGrid.appendChild(bookItem);
    });
}

// Function to remove a book
function removeBook(index) {
    library.splice(index, 1);
    updateLibrary();
}

// Function to add custom tag
function addCustomTag(index) {
    const customTagInput = document.getElementById(`customTag-${index}`);
    const newTag = customTagInput.value;

    if (newTag) {
        library[index].customTag = newTag;
        customTagInput.value = ''; // Clear the input
        updateLibrary();
    }
}

// Function to update localStorage and re-render the library
function updateLibrary() {
    localStorage.setItem('library', JSON.stringify(library));
    displayBooks();
}

// Sorting functionality
document.getElementById('sort-options').addEventListener('change', function() {
    const sortBy = this.value;

    if (sortBy === 'author') {
        library.sort((a, b) => a.author.localeCompare(b.author));
    } else if (sortBy === 'alphabetically') {
        library.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'date-added') {
        library.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    }

    updateLibrary();
});
