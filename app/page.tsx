import Link from "next/link";
import Image from "next/image";

export default function Home() {

  const museums = [{
    id: 'clevelend', name: 'The Clevelend Museum of Art', imageSrc: '/cleveland-museum-of-art.webp', about: 'The Cleveland Museum of Art is renowned for the quality and breadth of its collection, which includes more than 63,000 artworks and spans 6,000 years of achievement in the arts. The museum is a significant international forum for exhibitions, scholarship, and performing arts and is a leader in digital innovations. One of the top comprehensive art museums in the nation, recognized for its award-winning Open Access program and free of charge to all, the Cleveland Museum of Art is located in the University Circle neighborhood.'
  }
  
]

  
  return (
    <div className="flex justify-center items-center min-h-screen p-6">
    <div className={`grid grid-cols-1 md:grid-cols-${museums.length === 1 ? "1" : "2"} gap-6 p-6 m-5`}>
      {museums.map((museum) => (
        <div key={museum.id} className="bg-white rounded-lg shadow-lg overflow-hidden max-w-[600px]">
          <Link href={`/collections`}>
          <div className="flex justify-center items-center">
          <Image
                src={museum.imageSrc}
                alt={`${museum.name} image`}
                width={600}
                height={300}
                className="object-cover"
              />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{museum.name}</h2>
                <p className="text-gray-700">{museum.about}</p>
              </div>
            
          </Link>
        </div>
      ))}
    </div>
    
    </div>
  );
}
