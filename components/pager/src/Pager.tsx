import {JSX, useEffect, useState} from "react";

export enum PagerError {
  FETCH = "FETCH",
}

export interface Page<D> {
  items: D[];
  total: number;
}

export interface ChildrenProps<D> {
  items: D[];
  page: number;
  total: number;
  loading: boolean;
  hasMore: boolean;
  percentage: number;
  loadMore: () => void;
  fetchData: (page: number) => void;
  setItems: (setter: (items: D[]) => D[]) => void;
}

export interface PagerProps<D, P> {
  params?: P;
  onFetch?: (page: Page<D>) => void;
  onError?: (pagerError: PagerError, error: unknown) => void;
  fetcher: (page: number, params?: P) => Promise<Page<D>>;
  children: (props: ChildrenProps<D>) => JSX.Element;
}

export const Pager = <D, P>(
  {
    params,
    fetcher,
    onFetch = () => ({}),
    onError = () => ({}),
    children
  }: PagerProps<D, P>
) => {
  const [items, setItems] = useState<D[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetcher(page, params);
      if (page === 0) {
        setItems(response.items);
        onFetch(response);
      } else {
        setItems((prevItems) => {
          const newItems = prevItems.concat(response.items);
          onFetch({items: newItems, total: response.total});
          return newItems;
        });
      }
      setTotal(response.total);
      setLoading(false);
    } catch (error) {
      onError(PagerError.FETCH, error);
    }
  };

  useEffect(() => {
    setPage(0);
    fetchData(0);
  }, [params]);

  const loadMore = () => {
    if (items.length < total) {
      setPage(page + 1);
      fetchData(page + 1);
    }
  };

  return children(
    {
      items,
      page,
      total,
      loading,
      hasMore: items.length < total,
      percentage: Math.round((items.length / total) * 100),
      loadMore,
      fetchData,
      setItems
    }
  );
}