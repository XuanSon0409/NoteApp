import React, { useState, useEffect } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import { Modal } from "antd";

function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(true); 

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(savedNotes);
    setIsInitialLoad(false); //  Mark as loaded
  }, []);

  // Save notes to localStorage 
  useEffect(() => {
    if (!isInitialLoad) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes, isInitialLoad]);

  // Add new note with trimmed title and content
  const addNote = (note) => {
    const trimmedNote = {
      ...note,
      title: note.title.trim(),
      content: note.content.trim(),
    };
    setNotes([trimmedNote, ...notes]);
  };

  // Filter notes using trimmed search value
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header
        className="bg-white shadow-sm"
        style={{
          "--tw-shadow":
            "0 1px 2px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.05)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.05))",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1
            className="text-2xl font-bold text-gray-800"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            My Notes
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-search h-5 w-5 text-gray-400"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Search notes..."
              style={{
                fontFamily: "sans-serif",
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <NoteForm onAdd={addNote} />
        <NoteList notes={filteredNotes} setNotes={setNotes} />
      </main>
    </div>
  );
}

export default App;
