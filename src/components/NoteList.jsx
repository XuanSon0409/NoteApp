import React, { useState } from "react";
import { Pencil, Trash2, X, Check } from "lucide-react";
import { Modal } from "antd";

function NoteList({ notes, setNotes }) {
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");

    const startEdit = (note) => {
        setEditingId(note.id);
        setEditTitle(note.title);
        setEditContent(note.content);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditTitle("");
        setEditContent("");
    };


    const saveEdit = (id) => {
        const updatedNotes = notes.map((note) =>
            note.id === id ? { ...note, title: editTitle, content: editContent } : note
        );
        setNotes(updatedNotes);
        cancelEdit();
        setEditingId(null);
    };


    const deleteNote = (id) => {
        Modal.confirm({
            title: "Are you sure you want to delete this note?",
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

    if (notes.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500" style={{ fontFamily: 'sans-serif' }}>No notes found. Create your first note!</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {notes.map((note) => (
                <div
                    key={note.id}
                    className={`bg-white p-4 rounded-lg shadow border-l-4 ${editingId === note.id ? "border-yellow-500" : "border-emerald-500"
                        }`}
                >
                    {editingId === note.id ? (
                        <>
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="w-full border rounded px-2 py-1 mb-2"
                            />
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="w-full border rounded px-2 py-1"
                                rows={4}
                            ></textarea>
                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    onClick={cancelEdit}
                                    className="flex items-center gap-1 border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-100"
                                >
                                    <X size={16} />
                                    Cancel
                                </button>
                                <button
                                    onClick={() => saveEdit(note.id)}
                                    className="flex items-center gap-1 bg-green-600 text-white rounded px-3 py-1 text-sm hover:bg-green-700"
                                >
                                    <Check size={16} />
                                    Save
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h3 className="font-semibold text-gray-800">{note.title}</h3>
                            <p className="text-gray-600 mt-1 whitespace-pre-wrap">{note.content}</p>

                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    onClick={() => startEdit(note)}
                                    className="flex items-center gap-1 border border-gray-300 rounded px-3 py-1 text-sm hover:bg-gray-100"
                                >
                                    <Pencil size={16} />
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteNote(note.id)}
                                    className="flex items-center gap-1 bg-red-600 text-white rounded px-3 py-1 text-sm hover:bg-red-700"
                                >
                                    <Trash2 size={16} />
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
