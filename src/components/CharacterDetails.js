import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import md5 from 'md5';

const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      const publicKey = '19736d4704c205617e9aed5b69bffddc';
      const privateKey = '2f2ee7a697932ecbde8f7d84059e10a6f95c5838';
      const ts = new Date().getTime();
      const hash = md5(ts + privateKey + publicKey);
      
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
      );
      const data = await response.json();
      setCharacter(data.data.results[0]);
      setLoading(false);
    };

    fetchCharacter();
  }, [id]);

  if (loading) return <div>Loading character details...</div>;
  if (!character) return <div>Character not found</div>;

  return (
    <div className="character-details">
      <h2>{character.name}</h2>
      <img 
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`} 
        alt={character.name}
        style={{ maxWidth: '300px' }}
      />
      <p>{character.description || 'No description available.'}</p>
      <h3>Comics appearances: {character.comics.available}</h3>
      <h3>Series appearances: {character.series.available}</h3>
    </div>
  );
};

export default CharacterDetails;
