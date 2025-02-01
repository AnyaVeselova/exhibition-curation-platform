'use client'
import React from 'react'
import Link from 'next/link';
import { useCollection } from '../context/collectionContext';
import { usePathname } from 'next/navigation';
import {Home, Filter, User, Album} from 'lucide-react'
function Footer() {
  const {collection} = useCollection()
  const pathname = usePathname()

  return (
    <div
  className="fixed bottom-0 sm:bottom-5 sm:shadow-lg sm:shadow-base-500/30 hover:shadow-md left-0 duration-300 overflow-hidden border-t sm:border z-50 w-full h-16 bg-white sm:max-w-md sm:rounded-xl inset-x-0 mx-auto border-base-50"
>
  <ul className={`grid h-full mx-auto font-medium ${
    pathname === `/collections/${collection}` ? 'grid-cols-4' : 'grid-cols-3'
  }`}>
    <li
      className="inline-flex flex-col items-center justify-center px-5 hover:bg-base-50 group gap-1 hover:text-orange-500 text-base-500"
    >
      <Link className="inline-flex flex-col items-center justify-center text-xs" href='/'><Home className='size-5'/>Home</Link>
    </li>
    {pathname === `/collections/${collection}` && (
    <li

      className="inline-flex flex-col items-center justify-center px-5 hover:bg-base-50 group gap-1 hover:text-orange-500 text-base-500"
    >

      <Link className="inline-flex flex-col items-center justify-center text-xs" href='/search'><Filter/>Filter</Link>

    </li>
    )}
    <li

      className="inline-flex flex-col items-center justify-center px-5 hover:bg-base-50 group gap-1 hover:text-orange-500 text-base-500"
    >
     
      <Link className="inline-flex flex-col items-center justify-center text-xs" href='/user'><User/>Profile</Link>

    </li>
    <li
      className="inline-flex flex-col items-center justify-center px-5 hover:bg-base-50 group gap-1 hover:text-orange-500 text-base-500"
    >
      <Link className="inline-flex flex-col items-center justify-center text-xs" href='/user/saved_artworks'><Album className='size-5'/>Gallery</Link>
    </li>
  </ul>
</div>
  )
}

export default Footer