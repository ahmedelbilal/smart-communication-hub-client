import { useEffect, useState } from 'react';

export default function useDebounce(q: string, delay: number) {
  const [term, setTerm] = useState('');
  useEffect(() => {
    const interval = setTimeout(() => {
      setTerm(q.trim());
    }, delay);
    return () => clearInterval(interval);
  }, [delay, q]);
  return term;
}
