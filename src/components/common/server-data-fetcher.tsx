export default async function ServerDataFetcher<T>({
  fetcherFn,
  children,
}: {
  fetcherFn: () => Promise<T>;
  children: (payload: T) => React.ReactNode;
}) {
  const payload = await fetcherFn();

  return <>{children(payload)}</>;
}
