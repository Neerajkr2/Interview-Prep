import React, { useState, useEffect, useRef } from "react";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const selectedIndexRef = useRef(-1);
  const dropdownRef = useRef(null);

  // Debounced API Call
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const fetchSuggestions = async (searchText) => {
    try {
      // Example API
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${searchText}`
      );

      const data = await response.json();

      setSuggestions(data.products || []);
      setIsOpen(true);
      selectedIndexRef.current = -1;
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (!suggestions.length) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        selectedIndexRef.current =
          (selectedIndexRef.current + 1) % suggestions.length;

        setSuggestions([...suggestions]); // re-render
        break;

      case "ArrowUp":
        e.preventDefault();
        selectedIndexRef.current =
          selectedIndexRef.current <= 0
            ? suggestions.length - 1
            : selectedIndexRef.current - 1;

        setSuggestions([...suggestions]);
        break;

      case "Enter":
        if (selectedIndexRef.current >= 0) {
          const selectedItem =
            suggestions[selectedIndexRef.current];

          setQuery(selectedItem.title);
          setIsOpen(false);

          console.log("Selected:", selectedItem);
        }
        break;

      default:
        break;
    }
  };

  const handleSuggestionClick = (item) => {
    setQuery(item.title);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      style={{ width: "300px", position: "relative" }}
    >
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onKeyDown={handleKeyDown}
        style={{
          width: "100%",
          padding: "10px",
          boxSizing: "border-box",
        }}
      />

      {isOpen && suggestions.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            border: "1px solid #ccc",
            position: "absolute",
            width: "100%",
            background: "#fff",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {suggestions.map((item, index) => (
            <li
              key={item.id}
              onClick={() => handleSuggestionClick(item)}
              style={{
                padding: "10px",
                cursor: "pointer",
                background:
                  index === selectedIndexRef.current
                    ? "#f0f0f0"
                    : "#fff",
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;