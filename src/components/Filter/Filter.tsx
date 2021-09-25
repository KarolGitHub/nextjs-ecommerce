import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import filterSearch from '../../utils/filterSearch';

type Props = {
  categories: Category[];
};

const Filter: React.FC<Props> = ({ categories }) => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');

  const router = useRouter();

  const categoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    filterSearch({ router, category: e.target.value });
  };

  const sortHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    filterSearch({ router, sort: e.target.value });
  };

  useEffect(
    () => {
      filterSearch({ router, search: search ? search.toLowerCase() : 'all' });
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [search]
  );

  return (
    <div className="input-group">
      <div className="col-md-2 px-0 mt-2">
        <select
          className="form-select text-capitalize"
          value={category}
          onChange={categoryHandler}>
          <option value="all">All Products</option>

          {categories.map((item: Category) => (
            <option key={item.id} value={item.title}>
              {item.title}
            </option>
          ))}
        </select>
      </div>

      <form autoComplete="off" className="mt-2 col-md-8 px-0">
        <input
          type="text"
          className="form-control"
          list="title_product"
          value={search.toLowerCase()}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <div className="col-md-2 px-0 mt-2">
        <select
          className="form-select text-capitalize"
          value={sort}
          onChange={sortHandler}>
          <option value="-createdAt">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="-sold">Best sales</option>
          <option value="-price">Price: descending</option>
          <option value="price">Price: ascending</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
