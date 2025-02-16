'use client'
import Link from "next/link";
import CollectionCard from "./collectionCard";
import { useState } from 'react';

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

  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleReadMore = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="content-container">
      {museums.map((museum) => (
        <div key={museum.id} className="w-full max-w-[400px] min-w-[320px] mx-auto">
          <Link href={`/${museum.id}`} className="block w-full">
            <CollectionCard
              image={museum.imageSrc}
              title={museum.name}
              description={
                expandedId === museum.id
                  ? museum.about
                  : `${museum.about.substring(0, 150)}...`
              }
            />
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleReadMore(museum.id);
            }}
            className="text-blue-600 mt-2 text-sm block text-center"
          >
            {expandedId === museum.id ? "Show Less" : "Read More"}
          </button>
        </div>
      ))}
    </div>
  );
}
