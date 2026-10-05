import { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  // 1. 用 useState 建一个 city，初始值是 ''
  const [city, setCity] = useState('')

  // 2. 写一个函数 handleSubmit(event)：
  //    - 第 1 行：event.preventDefault();
  //    - 调用 onSearch(city)
  //    - 把 city 清空：setCity('')
  function handleSubmit(event) {
    event.preventDefault();
    onSearch(city);
    setCity('');
  }

  return (
    <section className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a city, e.g. Paris"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </section>
  );
}

export default SearchBar;