'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; 
import axios from 'axios';
import '../../App.css';
//import DeleteAuthorButton from '../../../components/DeleteAuthorButton';
import { CircularProgress, Button, Modal, Box } from '@mui/material';

interface Author {
    id: number;
    name: string;
    photo: string;
    biography: string;
    books: Book[];
}

interface Book {
    id: number;
    title: string;
}

const AuthorDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchAuthorDetails(id as string);
    }
  }, [id]);

  const fetchAuthorDetails = async (authorId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/api/authors/${authorId}`);
      setAuthor(response.data);
    } catch (err) {
      setError("Erreur lors de la récupération des détails de l'auteur.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/authors/${id}`);
      router.push('/authors');
    } catch (error) {
      setError("Erreur lors de la suppression de l'auteur.");
    }
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <CircularProgress color="inherit" />
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  return (
    <div className="w-full bg-bgLight dark:bg-text text-text dark:text-bgLight rounded-lg shadow-xl p-8 max-w-4xl mx-auto">
      <div className="flex items-center space-x-8">
        <img src={author?.photo} alt={author?.name} className="w-48 h-64 object-cover rounded-lg" />
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold text-center md:text-left">{author?.name}</h1>
          <p className="text-lg text-center md:text-left">Biographie: {author?.biography}</p>
          <h2 className="text-2xl font-bold text-center md:text-left mt-4">Livres:</h2>
          <ul>
            {author?.books.map(book => (
              <li key={book.id}>
                <a href={`/books/${book.id}`} className="text-blue-500 hover:underline">{book.title}</a>
              </li>
            ))}
          </ul>
          <Button variant="contained" color="secondary" onClick={handleOpen}>Supprimer l'auteur</Button>
          <Modal open={open} onClose={handleClose}>
            <Box className="p-4 bg-white rounded-lg shadow-lg">
              <h2>Confirmer la suppression</h2>
              <p>Êtes-vous sûr de vouloir supprimer cet auteur ?</p>
              <Button variant="contained" color="secondary" onClick={handleDelete}>Confirmer</Button>
              <Button variant="contained" onClick={handleClose}>Annuler</Button>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetailPage;