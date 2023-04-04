import { useState } from "react";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";
import { IProduct } from "@/interfaces/IProduct";

type SearchProps = {
  onSearch: (query: string) => void;
  products: IProduct[];
};

export function SearchBar({ onSearch, products }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("vindo aqui");
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="mx-auto px-4 py-6 sm:max-w-7xl sm:px-6 lg:px-8 flex justify-between items-center">
      <div className="relative w-full max-w-xs">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          name="search"
          id="search"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-blue focus:border-primary-blue sm:text-sm"
          placeholder="Busque um produto"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </div>
    </div>
  );
}
