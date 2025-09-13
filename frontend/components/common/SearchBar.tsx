import React, { useState } from "react";
import { useRouter } from "next/router";
import Button from "./Button";
import { SearchBarProps } from "@/interfaces";

const SearchBar: React.FC<SearchBarProps> = ({ initialQuery = "" }) => {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      router.push(`/search?query=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 lg:flex-row">
        {/* Input */}
        <input
          type="text"
          placeholder="Search for jobs..."
          className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type="submit" title="Search" variant="subscribe" />
      </form>
    </div>
  );
};

export default SearchBar;
