import { useState, useEffect, useRef } from "react";
import axiosInstance from "@/src/api/axios";

interface UseInfiniteScrollProps<T> {
  endpoint: string;
  queryParams?: Record<string, any>;
  extractItems: (data: any) => T[];
  extractCursor: (data: any) => string | number | null;
  size?: number;
}

export function useInfiniteScroll<T extends {id : number}>({
  endpoint,
  queryParams = {},
  extractItems,
  extractCursor,
  size = 20, // ✅ 기본 데이터 개수 설정
}: UseInfiniteScrollProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [cursor, setCursor] = useState<string | number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement | null>(null);

  async function fetchMoreData() {
    if (isLoading || !hasMore) return;
    setIsLoading(true);

    try {
      const response = await axiosInstance.get(endpoint, {
        params: { ...queryParams, cursor },
      });

      const newItems = extractItems(response.data);
      const nextCursor = extractCursor(response.data);

      setItems((prev) => {
        const uniqueItems = newItems.filter(newItem => 
            !prev.some(prevItem => prevItem.id === newItem.id)
        );
        return [...prev, ...uniqueItems];
      });


      setCursor(nextCursor);
      setHasMore(!nextCursor !== null);


    } catch (error: any) {
      console.error("Error fetching data:", error.response?.data || error.message);
    }

    setIsLoading(false);
  }

  // ✅ 초기 로딩 시 데이터가 부족하면 자동으로 추가 요청
  useEffect(() => {
    if (!hasMore) return;
    if (items.length < size && !isLoading) {
      console.log("초기 로딩 시 데이터 부족 → 추가 요청");
      fetchMoreData();
    }
  }, [items, isLoading, hasMore]);

  // ✅ Intersection Observer 개선
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log("Intersection Observer 감지됨, 추가 데이터 요청");
          fetchMoreData();
        }
      },
      { threshold: 0.3 } // ✅ 감지 민감도 증가 (30% 보이면 실행)
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return { items, isLoading, hasMore, observerRef };
}
