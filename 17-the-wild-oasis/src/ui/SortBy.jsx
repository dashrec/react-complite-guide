import { useSearchParams } from 'react-router-dom';
import Select from './Select';

// reusable SortBy Component
function SortBy({ options, id }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || ''; // default value empty string to preventing of being null

  function handleChange(e) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      id={id}
      options={options}
      type="white"
      value={sortBy}
      onChange={handleChange}
    />
  );
}

export default SortBy;
