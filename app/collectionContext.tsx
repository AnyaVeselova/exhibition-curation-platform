
'use client'
import { createContext, useContext, useState } from 'react';

const CollectionContext = createContext({
  collection: '',
  setCollection: (collection: string) => {},

});

export const CollectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [collection, setCollection] = useState('');
  
  return (
    <CollectionContext.Provider value={{ collection, setCollection}}>
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollection = () => useContext(CollectionContext);
