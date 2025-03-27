const API_URL = 'http://localhost:3000/books';

const bookModal = document.getElementById('bookModal');
const bookForm = document.getElementById('bookForm');
const addBookBtn = document.getElementById("addBookBtn")
const closeBtn = document.querySelector('.close');
const searchInput = document.getElementById('searchInput');

addBookBtn.addEventListener('click', (e) => {
   bookModal.style.display = "block";
});

closeBtn.addEventListener('click', () => {
   bookModal.style.display = 'none';
 });
 
 window.addEventListener('click', (e) => {
   if (e.target === bookModal) {
     bookModal.style.display = 'none';
   }
 });
//1 Fetch all books and display them
async function fetchBooks() {
   const response = await fetch(API_URL);
   const books = await response.json();
   const bookTableBody = document.querySelector('#bookTable tbody');
   bookTableBody.innerHTML = ''; // Clear existing rows

   books.forEach(book => {
      const row = document.createElement('tr');

      row.innerHTML = `
         <td>${book.title}</td>
         <td>${book.author}</td>
         <td>${book.category}</td>
         <td>${book.ISBN}</td>
         <td>${book.totalCopies}</td>
         <td>${book.availableCopies}</td>
         <td class="actions">
            <button class="update" onclick="updateBook('${book._id}')">Update</button>
            <button class="delete" onclick="deleteBook('${book._id}')">Delete</button>
         </td>
      `;

      bookTableBody.appendChild(row);
   });
}

// Add a new book
document.getElementById('addBookForm').addEventListener('submit', async (e) => {
   e.preventDefault();

   const book = {
      title: document.getElementById('title').value,
      author: document.getElementById('author').value,
      category: document.getElementById('category').value,
      ISBN: document.getElementById('isbn').value,
      totalCopies: parseInt(document.getElementById('totalCopies').value),
      availableCopies: parseInt(document.getElementById('availableCopies').value),
   };

   const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
   });

   if (response.ok) {
      alert('Book added successfully!');
      document.getElementById('addBookForm').reset(); // Clear the form
      fetchBooks(); // Refresh the book list
   } else {
      alert('Failed to add book.');
   }
});

// Update a book
async function updateBook(id) {
   const availableCopies = prompt('Enter new available copies:');
   if (availableCopies !== null) {
      const response = await fetch(`${API_URL}/${id}`, {
         method: 'PATCH',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ availableCopies: parseInt(availableCopies) }),
      });

      if (response.ok) {
         alert('Book updated successfully!');
         fetchBooks(); // Refresh the book list
      } else {
         alert('Failed to update book.');
      }
   }
}

// Delete a book
async function deleteBook(id) {
   if (confirm('Are you sure you want to delete this book?')) {
      const response = await fetch(`${API_URL}/${id}`, {
         method: 'DELETE',
      });

      if (response.ok) {
         alert('Book deleted successfully!');
         fetchBooks(); // Refresh the book list
      } else {
         alert('Failed to delete book.');
      }
   }
}

// Load books when the page loads
window.onload = fetchBooks;

// search 

searchInput.addEventListener('input', filterBooks);

function filterBooks() {
   const searchTerm = searchInput.value.toLowerCase();
   const statusValue = statusFilter.value;
 
   const filteredBooks = books.filter(book => {
     const matchesSearch = 
       book.title.toLowerCase().includes(searchTerm) ||
       book.author.toLowerCase().includes(searchTerm) ||
       book.category.toLowerCase().includes(searchTerm) ||
       book.isbn.toLowerCase().includes(searchTerm);
 
     const matchesStatus = statusValue === 'all' || book.status === statusValue;
 
     return matchesSearch && matchesStatus;
   });
 
   renderBooks(filteredBooks);
 }





