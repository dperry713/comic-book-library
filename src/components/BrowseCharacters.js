import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import md5 from 'md5';

const BrowseCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      const publicKey = '19736d4704c205617e9aed5b69bffddc';
      const privateKey = '2f2ee7a697932ecbde8f7d84059e10a6f95c5838';
      const ts = new Date().getTime();
      const hash = md5(ts + privateKey + publicKey);
      
      const response = await fetch(
        `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=20`
      );
      const data = await response.json();
      setCharacters(data.data.results);
      setLoading(false);
    };

    fetchCharacters();
  }, []);

  if (loading) return <div>Loading characters...</div>;

  return (
    <div>
      <h2>Marvel Characters</h2>
      <div className="characters-grid">
        {characters.map(character => (
          <Link to={`/characters/${character.id}`} key={character.id}>
            <div className="character-card">
              <img 
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`} 
                alt={character.name}
                style={{ width: '100%', height: 'auto' }}
              />
              <h3>{character.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrowseCharacters;