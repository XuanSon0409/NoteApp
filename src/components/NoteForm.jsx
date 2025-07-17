import React, { useState } from "react";

function NoteForm({ onAdd }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = () => {
        if (!title.trim()) return;
        onAdd({ title, content, id: Date.now() });
        setTitle("");
        setContent("");
    };

    return (
        <div className="bg-white rounded p-6 mb-8" style={{ fontFamily: 'sans-serif' }}>
            <h2 className="text-lg font-medium text-gray-800 mb-4">Create a new note</h2>
            <div className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded font-normal py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-emerald-500 text-gray-700"
                        placeholder="Note title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <textarea
                        rows="4"
                        className="mt-1 block w-full border border-gray-300 rounded font-normal py-2 px-3 placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-emerald-500 text-gray-700"
                        placeholder="Write your note here..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="lucide lucide-circle-plus h-4 w-4 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            width="24"
                            height="24"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M8 12h8" />
                            <path d="M12 8v8" />
                        </svg>
                        Save Note
                    </button>

                </div>
            </div>
        </div>
    );
}

export default NoteForm;
