import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import Link from 'next/link';
import DeleteButton from '../../components/DeleteBookButton';
import CommentsDrawer from '../../components/CommentDrawer';

const BookDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  // Informations sur le livre
  const book = {
    id,
    title: 'Exemple de Livre',
    price: '19.99€',
    publicationYear: 2021,
    author: { id: '1', name: 'Auteur Exemple' },
  };

  // État des avis/commentaires
  const [reviews, setReviews] = useState([
    { id: '1', rating: 5, text: 'Excellent livre !', createdAt: new Date().toISOString() },
    { id: '2', rating: 3, text: 'Intéressant mais un peu long.', createdAt: new Date().toISOString() },
  ]);

  // Fonction de suppression
  const handleDelete = () => {
    // Remplacez cette logique par un appel API pour supprimer le livre dans une base de données réelle
    router.push('/');
  };

  // Fonction pour ajouter un nouvel avis
  const handleAddComment = (rating: number, text: string) => {
    const newComment = {
      id: `${reviews.length + 1}`,
      rating,
      text,
      createdAt: new Date().toISOString(),
    };
    setReviews((prevReviews) => [newComment, ...prevReviews]);
  };

  return (
    <div className="p-6 max-w-screen-md mx-auto">
      <Typography variant="h4" component="h1" gutterBottom>
        {book.title}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Prix : {book.price}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Année de publication : {book.publicationYear}
      </Typography>
      <Link href={`/authors/${book.author.id}`} passHref>
        <Typography variant="subtitle1" color="primary">
          Auteur : {book.author.name}
        </Typography>
      </Link>

      {/* Bouton de suppression */}
      <DeleteButton onDelete={handleDelete} />

      {/* Drawer des avis */}
      <CommentsDrawer comments={reviews} onAddComment={handleAddComment} />
    </div>
  );
};

export default BookDetail;
