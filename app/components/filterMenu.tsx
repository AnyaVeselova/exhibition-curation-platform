'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DEPARTMENTS } from '../_utils/apiCalls';
import { useCollection } from '../collectionContext';
const artworkTypes = [
  'Painting', 'Sculpture', 'Textile', 'Print', 'Jewelry', 'Photograph', 'Drawing', 'Ceramic', 'Glass', 'Metalwork', 'Furniture'
];

interface FilterMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function FilterMenu({ isOpen, setIsOpen }: FilterMenuProps) {
  const [selectedType, setSelectedType] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedArtist, setSelectedArtist] = useState('');
  const [isArtistVisible, setIsArtistVisible] = useState(true);
  const router = useRouter();
  const {museum} = useCollection()

  useEffect(() => {
   
    if (selectedType || selectedDepartment) {
      setSelectedArtist(''); 
      setIsArtistVisible(false);
    } else {
      setIsArtistVisible(true);
    }
  }, [selectedType, selectedDepartment]);


  const applyFilter = () => {
    let query = `/${museum}`;  

  

    if (selectedDepartment) {
      query += `/${encodeURIComponent(selectedDepartment)}`;

    }else{
      query += `/""`
    }
  
  
    const params: string[] = [];
  

    if (selectedArtist) {
      params.push(`artists=${encodeURIComponent(selectedArtist)}`);
    }
  

    if (selectedType) {
      params.push(`type=${encodeURIComponent(selectedType)}`);
    }
  
    if (params.length > 0) {
      query += `?${params.join("&")}`;
    }
  
    console.log("Navigating to:", query); 
  
    router.push(query);
    setIsOpen(false);
  };
  

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <label className="block text-sm font-medium text-gray-700">Artwork Type</label>
            <select
              className="w-full p-2 border rounded-md mt-1"
              onChange={(e) => setSelectedType(e.target.value)}
              value={selectedType}
            >
              <option value="">All Types</option>
              {artworkTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <label className="block text-sm font-medium text-gray-700 mt-4">Department</label>
            <select
              className="w-full p-2 border rounded-md mt-1"
              onChange={(e) => setSelectedDepartment(e.target.value)}
              value={selectedDepartment}
            >
              <option value="">All Departments</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            {isArtistVisible && (
              <>
            <label className="block text-sm font-medium text-gray-700 mt-4">Artist</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md mt-1"
              onChange={(e) => setSelectedArtist(e.target.value)}
              value={selectedArtist}
              placeholder="Enter artist name"
            />
            </>
            )}

            <button
              className="mt-4 w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
              onClick={applyFilter}
            >
              Apply Filter
            </button>

            <button
              className="mt-4 text-red-500 w-full"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default FilterMenu;

