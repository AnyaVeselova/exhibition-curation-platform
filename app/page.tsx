import Link from "next/link";
import Image from "next/image";

export default function Home() {

  const museums = [{
    id: 'metmuseum', name: 'The Metropolitan Museum of Art', imageSrc: '/met.avif', about: 'The Metropolitan Museum of Art presents over 5,000 years of art from around the world for everyone to experience and enjoy. The Museum lives in two iconic sites in New York City—The Met Fifth Avenue and The Met Cloisters. Millions of people also take part in The Met experience online.'
  },
  {id: 'harvard', name: 'The Harvard Art Museums', imageSrc: '/harvardArt.jpg', about: 'The Harvard Art Museums are comprised of three museums—the Fogg Museum, Busch-Reisinger Museum, and Arthur M. Sackler Museum—each with a different history, collection, guiding philosophy, and identity.'}
  
]

  
  return (
    
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 m-5">
      {museums.map((museum) => (
        <div key={museum.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Link href={`/${museum.id}`}>
            
          <Image
                src={museum.imageSrc}
                alt={`${museum.name} image`}
                width={600}
                height={300}
                className="object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{museum.name}</h2>
                <p className="text-gray-700">{museum.about}</p>
              </div>
            
          </Link>
        </div>
      ))}
    </div>
  );
}
