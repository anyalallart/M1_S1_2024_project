'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Book {
    id: number;
    title: string;
    publicationDate: string;
    author: string;
}

const BooksPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newBook, setNewBook] = useState({ title: '', publicationDate: '', author: '' });

    const fetchBooks = async () => {
        const response = await fetch('http://localhost:3001/api/books');
        const data = await response.json();
        setBooks(data);
        setFilteredBooks(data); // Initialement, on affiche tous les livres
    };


    // Charger la liste des livres
    useEffect(() => {
        fetchBooks();
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Fonction pour exécuter la recherche lorsque l'on clique sur le bouton
    const handleSearchClick = () => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = books.filter(book =>
            book.title.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredBooks(filtered);
    };



    // Afficher la modale pour ajouter un livre
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    // Gérer l'ajout de nouveaux livres
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewBook({ ...newBook, [e.target.name]: e.target.value });
    };

    const handleAddBook = async () => {
        try {
            await axios.post('/api/books', newBook);
            fetchBooks(); // Recharger la liste des livres
            closeModal(); // Fermer la modale
        } catch (error) {
            console.error('Erreur lors de l’ajout du livre:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Liste des Livres</h1>

            {/* Barre de recherche */}
            <div style={{display: 'flex', alignItems: 'center'}}>
                <input
                    type="text"
                    placeholder="Rechercher un livre par titre"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{marginRight: '10px', padding: '5px'}}
                />
                <button onClick={handleSearchClick} style={{padding: '5px 10px'}}>
                    Rechercher
                </button>
            </div>

            {/* Liste des livres */}
            <ul>
                {filteredBooks.map(book => (
                    <li key={book.id}>
                        <h2>{book.title}</h2>
                        <p>Date de publication : {book.publicationDate}</p>
                        <p>Auteur : {book.author}</p>
                    </li>
                ))}
            </ul>

            {/* Bouton pour ajouter un nouveau livre */}
            <button onClick={openModal} className="mt-4 p-2 bg-blue-500 text-white rounded">
                Ajouter un Livre
            </button>

            {/* Modale d'ajout de livre */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-md w-1/2">
                        <h2 className="text-lg font-bold mb-4">Ajouter un nouveau livre</h2>
                        <input
                            type="text"
                            name="title"
                            placeholder="Titre"
                            value={newBook.title}
                            onChange={handleInputChange}
                            className="border p-2 rounded mb-2 w-full"
                        />
                        <input
                            type="text"
                            name="publicationDate"
                            placeholder="Date de publication"
                            value={newBook.publicationDate}
                            onChange={handleInputChange}
                            className="border p-2 rounded mb-2 w-full"
                        />
                        <input
                            type="text"
                            name="author"
                            placeholder="Auteur"
                            value={newBook.author}
                            onChange={handleInputChange}
                            className="border p-2 rounded mb-2 w-full"
                        />
                        <div className="flex justify-end gap-2 mt-4">
                            <button onClick={closeModal} className="p-2 bg-gray-300 rounded">
                                Annuler
                            </button>
                            <button onClick={handleAddBook} className="p-2 bg-blue-500 text-white rounded">
                                Ajouter
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BooksPage;
