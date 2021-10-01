import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';

import { filterSearch } from '../../utils';

type Props = {
  categories: Category[];
  limit?: number;
};

const Filter: React.FC<Props> = ({ categories, limit }) => {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const throttling = useRef(false);

  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');

  const router = useRouter();

  const categoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    filterSearch({ router, limit, category: e.target.value });
  };

  const sortHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    filterSearch({ router, limit, sort: e.target.value });
  };

  const throttleSearchHandler = () => {
    if (!throttling.current && searchInputRef.current?.value.trim())
      throttling.current = true;
    setTimeout(() => {
      throttling.current = false;
      filterSearch({
        router,
        limit,
        search: searchInputRef.current
          ? searchInputRef.current.value.toLowerCase()
          : 'all',
      });
    }, 1000);
  };

  return (
    <div className="input-group gap-1 flex-nowrap">
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
          ref={(el) => (searchInputRef.current = el)}
          onChange={throttleSearchHandler}
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
