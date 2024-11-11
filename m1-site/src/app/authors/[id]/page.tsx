import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/router';
import axios from 'axios';
import { Button, Modal, TextField, Typography, Box, Avatar } from '@mui/material';
import '../../App.css';

const AuthorDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', publicationDate: '' });
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    if (id) {
      fetchAuthorDetails(id);
    }
  }, [id]);

  const fetchAuthorDetails = async (authorId) => {
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
  };

  const handleEdit = async () => {
    try {
      await axios.put(`http://localhost:3001/api/authors/${id}`, author);
      setEditMode(false);
      fetchAuthorDetails(id);
    } catch (error) {
      setError("Erreur lors de la modification de l'auteur.");
    }
  };

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/books', { ...newBook, authorId: id });
      fetchAuthorDetails(id);
    } catch (error) {
      setError("Erreur lors de l'ajout du livre.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {editMode ? (
        <form onSubmit={handleEdit} className="space-y-4">
          <TextField
            label="Nom"
            value={author.name}
            onChange={(e) => setAuthor({ ...author, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Biographie"
            value={author.biography}
            onChange={(e) => setAuthor({ ...author, biography: e.target.value })}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Enregistrer
          </Button>
        </form>
      ) : (
        <div className="space-y-4">
          <Typography variant="h4" className="text-3xl font-bold">
            {author.name}
          </Typography>
          <Avatar src={author.photo} alt={author.name} className="w-32 h-32" />
          <Typography variant="body1" className="text-lg">
            {author.biography}
          </Typography>
          <Button variant="contained" color="primary" onClick={() => setEditMode(true)}>
            Modifier
          </Button>
        </div>
      )}
      <Typography variant="h5" className="text-2xl font-bold mt-6">
        Livres:
      </Typography>
      <ul className="list-disc pl-5">
        {author.books.map((book) => (
          <li key={book.id} className="text-lg">
            <a href={`/books/${book.id}`} className="text-blue-500 hover:underline">
              {book.title}
            </a>
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddBook} className="space-y-4 mt-6">
        <TextField
          label="Titre du livre"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Date de publication"
          type="date"
          value={newBook.publicationDate}
          onChange={(e) => setNewBook({ ...newBook, publicationDate: e.target.value })}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit" variant="contained" color="primary">
          Ajouter un livre
        </Button>
      </form>
      <Button variant="contained" color="secondary" onClick={() => setOpenDeleteModal(true)} className="mt-6">
        Supprimer l'auteur
      </Button>
      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <Box className="p-4 bg-white mx-auto mt-20 w-80 text-center">
          <Typography variant="h6">Confirmer la suppression</Typography>
          <Typography variant="body1">Êtes-vous sûr de vouloir supprimer cet auteur ?</Typography>
          <Button variant="contained" color="secondary" onClick={handleDelete} className="mt-4">
            Supprimer
          </Button>
          <Button variant="contained" onClick={() => setOpenDeleteModal(false)} className="mt-4">
            Annuler
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AuthorDetailPage;