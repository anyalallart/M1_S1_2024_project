import React, { useEffect, useState } from 'react';
import axios from 'axios';

// The Author component fetches a list of authors from the server and displays them in a list.

//print "authors"

<h1>Authors</h1>

const Author = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/authors')
      .then(response => {
        setAuthors(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the authors!', error);
      });
  }, []);

  return (
    <div>
      <h1>Authors</h1>
      <ul>
        {authors.map(author => (
          <li key={author.id}>{author.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Author;