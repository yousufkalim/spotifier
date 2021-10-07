// Init
import React from "react";

// Importing Components
import Header from "../components/Header";
import Albums from "../components/Albums";

// Home Component
export default function Home() {
  return (
    <div style={{ padding: "3vh 8vw" }}>
      <Header />
      <Albums />
    </div>
  );
}
