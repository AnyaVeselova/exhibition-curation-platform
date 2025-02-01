'use client';
import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DEPARTMENTS } from '../_utils/apiCalls';

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
  const router = useRouter();

  const applyFilter = () => {
    let query = `/collections/${encodeURIComponent(selectedDepartment)}`;
    if (selectedType) query += `?type=${encodeURIComponent(selectedType)}`;
    if (selectedArtist) query += `&artist=${encodeURIComponent(selectedArtist)}`;
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

            <label className="block text-sm font-medium text-gray-700 mt-4">Artist</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md mt-1"
              onChange={(e) => setSelectedArtist(e.target.value)}
              value={selectedArtist}
              placeholder="Enter artist name"
            />

            <button
              className="mt-4 w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
              onClick={applyFilter}
            >
              Apply Filter
            </button>

            {/* Close button */}
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

