'use client'
import Link from "next/link";
import CollectionCard from "./collectionCard";

export default function Home() {
  const museums = [
    {
      id: "cleveland",
      name: "The Cleveland Museum of Art",
      imageSrc: "/cleveland-museum-of-art.webp",
      about:
        "The Cleveland Museum of Art is renowned for the quality and breadth of its collection...",
    },
    {
      id: "chicago",
      name: "The Art Institute of Chicago",
      imageSrc:"/artic.webp",
      about:
        "The Art Institute of Chicago is one of the oldest and largest art museums in the United States...",
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div
        className={`grid gap-6 p-6 max-w-6xl mx-auto ${
          museums.length === 1
            ? "grid-cols-1 place-items-center" 
            : "sm:grid-cols-2 lg:grid-cols-2"
        }`}
      >
        {museums.map((museum) => (
          <Link key={museum.id} href={`${museum.id}`} className="block">
            <div className="min-w-[300px] max-w-[500px] w-full">
              <CollectionCard
                image={museum.imageSrc}
                title={museum.name}
                description={museum.about}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
