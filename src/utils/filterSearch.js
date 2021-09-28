import { breakpoints } from './shared';

const filterSearch = ({ router, width, ...params }) => {
  const path = router.pathname;

  let limit;
  switch (true) {
    case width < breakpoints.md:
      limit = 4;
      break;
    case width < breakpoints.lg:
      limit = 8;
      break;
    case width < breakpoints.xl:
      limit = 12;
      break;
    default:
      limit = 16;
  }

  const query = { ...router.query, ...params, limit };

  router.push(
    {
      pathname: path,
      query: query,
    },
    undefined,
    { scroll: false }
  );
};

export default filterSearch;
