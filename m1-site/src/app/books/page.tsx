'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookOfDay from '../../components/BookOfDay';
import '../App.css';

interface Book {
    id: number;
    title: string;
    publicationDate: string;
    author: string;
    price: number;
}

const BooksPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newBook, setNewBook] = useState({ title: '', publicationDate: '', author: '' , price: 0});
    const [sortOption, setSortOption] = useState(''); // État pour le critère de tri

    const fetchBooks = async () => {
        const response = await fetch('http://localhost:3001/api/books');
        const data = await response.json();
        setBooks(data);
        setFilteredBooks(data); // Initialement, on affiche tous les livres
    };


    // Charger la liste des livres
    useEffect(() => {
        fetchBooks()
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


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewBook(prevBook => ({ ...prevBook, [name]: value }));
    };

    const handleAddBook = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3001/api/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBook),
        });
        if (response.ok) {
            fetchBooks(); // Actualiser la liste des livres
            closeModal(); // Fermer la modale après ajout
        } else {
            console.error("Erreur lors de l'ajout du livre");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-semibold mb-4 p-8 text-center text-text dark:text-bgLight" >Liste des Livres</h1>

            {/* Barre de recherche */}
            <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-md overflow-hidden w-full max-w-md">
                <input
                    type="text"
                    placeholder="Rechercher un livre par titre"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full px-4 py-2 text-gray-700 focus:outline-none"
                />
                <button onClick={handleSearchClick}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 4a7 7 0 017 7c0 1.657-.48 3.205-1.292 4.51l4.292 4.292-1.414 1.414-4.292-4.292A7 7 0 1111 4z"
                        />
                    </svg>

                </button>
            </div>

            {/* Bouton pour ajouter un nouveau livre */}
            <button onClick={openModal} className="mt-4 p-2 bg-bgLight  text-text rounded">
                Ajouter un Livre
            </button>

            {/* Liste des livres */}
            <ul className="flex flex-wrap justify-center gap-8">
                {filteredBooks.map(book => (
                    <BookOfDay
                        key={book.id}
                        id={book.id}
                        title={book.title}
                        author={book.author}
                        //image={book.image}
                        //rating={book.rating}
                    />
                ))}
            </ul>


            {/* Modale pour ajouter un livre */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-100" >Ajouter un livre</h2>
                        <form onSubmit={handleAddBook}>
                            <div>
                                <label>Titre:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newBook.title}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
                                />
                            </div>
                            <div>
                                <label>Date de publication:</label>
                                <input
                                    type="date"
                                    name="publicationDate"
                                    value={newBook.publicationDate}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"

                                />
                            </div>
                            <div>
                                <label>Auteur:</label>
                                <input
                                    type="text"
                                    name="author"
                                    value={newBook.author}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"

                                />
                            </div>
                            <div>
                                <label>Prix:</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={newBook.price}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100"
                                />
                            </div>
                            <button onClick={closeModal}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">

                                Annuler
                            </button>
                            <button type="submit"
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">
                                Ajouter
                            </button>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BooksPage;
