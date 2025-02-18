'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useCollection } from '../collectionContext';
import { usePathname } from 'next/navigation';
import { Home, Filter, User, Album } from 'lucide-react';
import FilterMenu from '../components/filterMenu'; // Import the FilterMenu

function Footer() {
  const { collection, museum } = useCollection();
  const pathname = usePathname();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  return (
    <>
      <FilterMenu isOpen={isFilterOpen} setIsOpen={setIsFilterOpen} />
    


      <div className="fixed bottom-0 sm:bottom-5 sm:shadow-lg sm:shadow-base-500/30 hover:shadow-md left-0 duration-300 overflow-hidden border-t sm:border z-50 w-full h-16 bg-white sm:max-w-md sm:rounded-xl inset-x-0 mx-auto border-base-50">
        <ul className={`grid h-full mx-auto font-medium ${pathname === `/${museum}` ? 'grid-cols-4' : 'grid-cols-3'}`}>
          <li className="inline-flex flex-col items-center justify-center px-5 hover:bg-base-50 group gap-1 hover:text-orange-500 text-base-500">
            <Link className="inline-flex flex-col items-center justify-center text-xs" href="/"><Home className="size-5" />Home</Link>
          </li>

          {pathname === `/${museum}` && (
            <li className="inline-flex flex-col items-center justify-center px-5 hover:bg-base-50 group gap-1 hover:text-orange-500 text-base-500">
              <button className="inline-flex flex-col items-center justify-center text-xs" onClick={toggleFilter}>
                <Filter className="size-5" /> Filter
              </button>
            </li>
          )}

          <li className="inline-flex flex-col items-center justify-center px-5 hover:bg-base-50 group gap-1 hover:text-orange-500 text-base-500">
            <Link className="inline-flex flex-col items-center justify-center text-xs" href="/user"><User />Profile</Link>
          </li>

          <li className="inline-flex flex-col items-center justify-center px-5 hover:bg-base-50 group gap-1 hover:text-orange-500 text-base-500">
            <Link className="inline-flex flex-col items-center justify-center text-xs" href="/user/saved_artworks"><Album className="size-5" />Gallery</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Footer;
