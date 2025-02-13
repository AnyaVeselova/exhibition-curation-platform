
'use client'
import { createContext, useContext, useState } from 'react';

const CollectionContext = createContext({
  collection: '',
  setCollection: (collection: string) => {},
  museum: "",
  setMuseum: (museum: string) => {},

});

export const CollectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [collection, setCollection] = useState('');
  const [museum, setMuseum] = useState('');
  
  return (
    <CollectionContext.Provider value={{ collection, setCollection, museum, setMuseum}}>
      {children}
    </CollectionContext.Provider>
  );
};

export const useCollection = () => useContext(CollectionContext);
