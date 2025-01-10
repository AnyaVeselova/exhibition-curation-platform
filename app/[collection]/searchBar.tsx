import { useState, ChangeEvent, FormEvent } from "react";

interface SearchBarProps {
  setSearchTerm: (term: string) => void;
}

export default function SearchBar({ setSearchTerm }: SearchBarProps) {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(searchInput);
  };

  return (
    <form
      className="flex items-center border rounded-lg p-2 shadow-md"
      onSubmit={handleSubmit}
    >
      <i className="fa-solid fa-magnifying-glass fa-lg text-gray-500 mr-2"></i>
      <input
        id="input"
        autoFocus
        type="text"
        placeholder="Search through artworks..."
        value={searchInput}
        onChange={handleChange}
        className="flex-1 px-2 py-1 border-none focus:outline-none"
      />
      <button
        id="btn"
        className="ml-2 px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}
