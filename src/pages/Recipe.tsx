import { useParams } from 'react-router-dom';

const Recipe = () => {
  const { id } = useParams();
  return <div>Recipe: {id}</div>;
};

export default Recipe;
