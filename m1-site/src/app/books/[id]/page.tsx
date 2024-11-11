'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; // pour remplacer useRouter dans app
import axios from 'axios';
import '../../App.css';
import DeleteBookButton from '../../../components/DeleteBookButton';

interface Book {
    id: number;
    title: string;
    publicationDate: string;
    author: string;
    price?: number;
}

const BookDetailPage = () => {
  const { id } = useParams(); // Capture l'ID dynamique de l'URL
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchBookDetails(id as string);
    }
  }, [id]);

  const fetchBookDetails = async (bookId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/api/books/${bookId}`);
      setBook(response.data);
    } catch (err) {
      setError("Erreur lors de la récupération des détails du livre.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async () => {
    if (book) {
      try {
        await axios.delete(`http://localhost:3001/api/books/${book.id}`);
        alert('Livre supprimé avec succès');

        router.push('/books');
      } catch (err) {
        alert('Erreur lors de la suppression du livre');
      }
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{book?.title}</h1>
      <p className="mb-2">Auteur : {book?.author}</p>
      <p className="mb-2">Date de publication : {book?.publicationDate}</p>
      {book?.price && <p className="mb-2">Prix : {book.price} €</p>}

      <DeleteBookButton onDelete={handleDeleteBook} />
    </div>
  );
};

export default BookDetailPage;
