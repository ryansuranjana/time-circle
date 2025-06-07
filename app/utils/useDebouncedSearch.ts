export default function useDebouncedSearch<T>(initialSearch: T, delay = 500) {
  const search = ref<T>(initialSearch);
  const debouncedSearch = ref<T>(initialSearch);
  let timeout: ReturnType<typeof setTimeout>;

  watch(
    () => search.value,
    (val) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        debouncedSearch.value = val;
      }, delay);
    }
  );

  return [search, debouncedSearch];
}
