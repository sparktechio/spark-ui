import React, {ReactNode, RefObject, useEffect, useRef, useState} from "react";

const intersectionObserverOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

interface InfiniteScrollProps {
  children: ReactNode;
  progressBar?: ReactNode;
  options?: IntersectionObserverInit;
  className?: string;
  isEnabled?: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
}


export function useIsElementVisible(
  ref: RefObject<HTMLElement|null>,
  isEnabled: boolean = true,
  options: IntersectionObserverInit,
) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = isEnabled
      ? new IntersectionObserver(
        ([entry]) => setIsIntersecting(entry?.isIntersecting ?? false),
        options,
      )
      : undefined;

    if (observer && ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer?.disconnect();
    };
  }, [isEnabled, ref, options]);

  return isIntersecting;
}


export const InfiniteScroll = (
  {
   children,
   progressBar,
   className,
   isEnabled,
   isLoading,
   onLoadMore,
   options = intersectionObserverOptions
 }: InfiniteScrollProps) => {
  const pageEndRef = useRef<HTMLDivElement>(null);
  const isPageEndVisible = useIsElementVisible(
    pageEndRef,
    isEnabled,
    options,
  );

  useEffect(() => {
    if (isEnabled && !isLoading && isPageEndVisible) {
      onLoadMore();
    }
  }, [onLoadMore, isLoading, isEnabled, isPageEndVisible]);

  return (
    <div className={className}>
      {children}
      <div className="page-end" ref={pageEndRef}>
        {isLoading && progressBar}
      </div>
    </div>
  );
};
