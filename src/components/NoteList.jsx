import React, { useState } from "react";
import { Pencil, Trash2, X, Check } from "lucide-react";
import { Modal } from "antd";

// This component displays and manages a list of notes
function NoteList({ notes, setNotes }) {
    const [editingId, setEditingId] = useState(null); // Track which note is being edited
    const [editTitle, setEditTitle] = useState("");   // State for editing title
    const [editContent, setEditContent] = useState(""); // State for editing content

    // Begin editing a specific note
    const startEdit = (note) => {
        setEditingId(note.id);
        setEditTitle(note.title);
        setEditContent(note.content);
    };

    // Cancel editing and reset fields
    const cancelEdit = () => {
        setEditingId(null);
        setEditTitle("");
        setEditContent("");
    };

    // Save changes after editing a note
    const saveEdit = (id) => {
        const trimmedTitle = editTitle.trim();
        const trimmedContent = editContent.trim();

        // Prevent saving if both fields are empty
        if (!trimmedTitle && !trimmedContent) {
            Modal.warning({
                title: "Empty Note",
                content: "Both title and content cannot be empty.",
            });
            return;
        }

        // Check if the note still exists in localStorage (in case it's deleted in another tab)
        const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
        const existsInLocal = savedNotes.find((n) => n.id === id);

        if (!existsInLocal) {
            Modal.error({
                title: "Note Not Found",
                content: "This note was deleted from another tab or session.",
                onOk: () => {
                    window.location.reload(); // Reload to sync state
                },
            });
            cancelEdit();
            return;
        }

        // Update the note in the current state
        const updatedNotes = notes.map((note) =>
            note.id === id
                ? {
                    ...note,
                    title: trimmedTitle,
                    content: trimmedContent,
                }
                : note
        );
        setNotes(updatedNotes);
        cancelEdit();
    };

    // Delete a note with confirmation
    const deleteNote = (id) => {
        Modal.confirm({
            title: "Delete this note?",
            content: "This action cannot be undone.",
            okText: "Delete",
            okType: "danger",
            cancelText: "Cancel",
            onOk() {
                const filtered = notes.filter((note) => note.id !== id);
                setNotes(filtered);
            },
        });
    };

    // If no notes exist, show empty state
    if (notes.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500" style={{ fontFamily: 'sans-serif' }}>
                    No notes available. Create your first one!
                </p>
            </div>
        );
    }

    // Render notes list
    return (
        <div className="grid gap-4">
            {notes.map((note) => (
                <div
                    key={note.id}
                    className={`bg-white p-5 shadow-sm rounded-lg border-l-4 transition-all duration-300 ease-in-out ${editingId === note.id ? "border-yellow-500" : "border-emerald-500"
                        } hover:shadow-lg`}
                    style={{ fontFamily: 'sans-serif' }}
                >
                    {/* Editing view */}
                    {editingId === note.id ? (
                        <>
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value.trimStart())}
                                className="block w-full border border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 rounded-md px-3 py-2 mb-3 text-base"
                                placeholder="Edit title"
                                style={{ boxShadow: '0 1px 4px rgba(0, 0, 0, 0.02)' }}
                            />
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value.trimStart())}
                                className="block w-full border border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 rounded-md px-3 py-2 mb-3 text-base"
                                rows={4}
                                placeholder="Edit content"
                            ></textarea>
                            <div className="flex justify-end space-x-2">
                                {/* Cancel button */}
                                <button
                                    onClick={cancelEdit}
                                    className="inline-flex items-center border border-gray-300 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                >
                                    <X className="h-4 w-4 mr-1" />
                                    Cancel
                                </button>
                                {/* Save button */}
                                <button
                                    onClick={() => saveEdit(note.id)}
                                    className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                >
                                    <Check className="h-4 w-4 mr-1" />
                                    Save
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* View mode (not editing) */}
                            <h3 className="text-lg font-medium text-gray-800 mb-2">{note.title}</h3>
                            <p className="text-gray-600 mb-4 line-clamp-2">{note.content}</p>

                            <div className="flex justify-end gap-2 mt-4">
                                {/* Edit button */}
                                <button
                                    onClick={() => startEdit(note)}
                                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                >
                                    <Pencil className="h-4 w-4 mr-1" />
                                    Edit
                                </button>
                                {/* Delete button */}
                                <button
                                    onClick={() => deleteNote(note.id)}
                                    className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Delete
                                </button>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}

export default NoteList;
