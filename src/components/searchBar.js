import React, { useState } from "react";
import "./searchBar.css";

const a = {
  user: {
    id: 1,
    name: {
      firstName: "James",
      lastName: "Ibori"
    },
    location: {
      city: "Ikoyi",
      state: "Lagos",
      address: "One expensive house like that"
    }
  }
};

export default function SearchBar() {
  const [value, setValue] = useState("");
  const [path, setPath] = useState(null);

  function pathGet(obj, name, val, currentPath) {
    currentPath = currentPath || "";

    let matchingPath;

    if (!obj || typeof obj !== "object") return;

    if (obj[name] === val) return `${currentPath}['${name}']`;

    for (const key of Object.keys(obj)) {
      if (key === name && obj[key] === val) {
        matchingPath = currentPath;
      } else {
        matchingPath = pathGet(obj[key], name, val, `${currentPath}['${key}']`);
      }

      if (matchingPath) break;
    }

    console.log("PATH", matchingPath);
    setPath(matchingPath);
    return matchingPath;
  }

  const onClick = (e) => {
    e.preventDefault();
    const { value } = e.target;
    pathGet(a, a.firstName, value);
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="wrapper">
      <form onSubmit={onClick}>
        <input
          value={value}
          onChange={onChange}
          type="text"
          name="search"
          placeholder="Enter search keyword"
        />
        <input type="submit" value="Search" />
      </form>

      {path && path === undefined ? <p>Cannot find path</p> : <p>{path}</p>}
    </div>
  );
}
