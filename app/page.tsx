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
  ];

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div
        className={`grid ${
          museums.length === 1 ? "grid-cols-1 justify-center" : "sm:grid-cols-2 lg:grid-cols-2"
        } gap-6 p-6 max-w-6xl mx-auto`}
      >
        {museums.map((museum) => (
          <Link key={museum.id} href={`/collections`} className="block">
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
