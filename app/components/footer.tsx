'use client'
import React from 'react'

import Link from 'next/link';

function Footer() {

  return (
    <div
  className="fixed bottom-0 sm:bottom-5 sm:shadow-lg sm:shadow-base-500/30 hover:shadow-md left-0 duration-300 overflow-hidden border-t sm:border z-50 w-full h-16 bg-white sm:max-w-md sm:rounded-xl inset-x-0 mx-auto border-base-50"
>
  <ul className="grid h-full grid-cols-3 mx-auto font-medium">
    <li
      className="inline-flex flex-col items-center justify-center px-5 hover:bg-base-50 group gap-1 hover:text-orange-500 text-base-500"
    >
      <svg
        className="size-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM19 19V9.97815L12 4.53371L5 9.97815V19H19Z"
        ></path>
      </svg>
     
      <Link className="text-xs" href='/'>Home</Link>
    </li>
    <li

      className="inline-flex flex-col items-center justify-center px-5 hover:bg-base-50 group gap-1 hover:text-orange-500 text-base-500"
    >
      <svg
        className="size-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
        ></path>
      </svg>
      <Link className="text-xs" href='/search'>Search</Link>

    </li>
    
    <li

      className="inline-flex flex-col items-center justify-center px-5 hover:bg-base-50 group gap-1 hover:text-orange-500 text-base-500"
    >
      <svg
        className="size-5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"
        ></path>
      </svg>
      <Link className="text-xs" href='/user'>Profile</Link>

    </li>
  </ul>
</div>
  )
}

export default Footer