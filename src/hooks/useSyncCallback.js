function useSyncCallback(cb) {
  const [state, setState] = useState(false);
  useEffect(() => {
    if (state) setState(false);
  }, [state]);
  useEffect(() => {
    state && cb();
  });
  const fn = useCallback(() => {
    setState(true);
  });

  return fn;
}
