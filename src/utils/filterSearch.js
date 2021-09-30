const filterSearch = ({ router, ...params }) => {
  const path = router.pathname;
  const query = { ...router.query, ...params };

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
