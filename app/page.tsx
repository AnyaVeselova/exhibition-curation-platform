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
        "The Cleveland Museum of Art is renowned for the quality and breadth of its collection, which includes more than 63,000 artworks and spans 6,000 years of achievement in the arts. The museum is a significant international forum for exhibitions, scholarship, and performing arts and is a leader in digital innovations. One of the top comprehensive art museums in the nation, recognized for its award-winning Open Access program and free of charge to all, the Cleveland Museum of Art is located in the University Circle neighborhood.",
    },
    {
      id: "chicago",
      name: "The Art Institute of Chicago",
      imageSrc:"/artic.webp",
      about:
        "Founded in 1879, the Art Institute of Chicago is one of the world’s major museums, housing an extraordinary collection of objects from across places, cultures, and time. We are also a place of active learning for all—dedicated to investigation, innovation, education, and dialogue—continually aspiring to greater public service and civic engagement.",
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="grid gap-6 p-6 max-w-6xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
        {museums.map((museum) => (
          <Link
            key={museum.id}
            href={`${museum.id}`}
            className="block w-full"
          >
            <div className="w-full max-w-[400px] mx-auto p-4">
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
