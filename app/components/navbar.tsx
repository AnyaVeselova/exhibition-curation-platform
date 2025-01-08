'use client'
import React from 'react'
import Link from "next/link";
import { usePathname } from 'next/navigation';


const Navbar = () => {
    const pathname = usePathname()
  return (
    <nav className="bg-gray-800 p-4" >
    <ul className="flex justify-between">
     <li className={pathname === "/" ? 'text-white bg-gray-900 px-3 py-2 rounded' 
        : "text-gray-300 hover:text-white px-3 py-2 rounded"}><Link href="/">Home</Link></li>
      <li className={pathname === "/user" ? 'text-white bg-gray-900 px-3 py-2 rounded' 
        : "text-gray-300 hover:text-white px-3 py-2 rounded"}><Link href="/user">User</Link></li>
 
    </ul>
  </nav>
  )
}

export default Navbar