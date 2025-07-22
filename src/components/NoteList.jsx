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
        const trimmedTitle = editTitle.trim();
        const trimmedContent = editContent.trim();

        if (!trimmedTitle && !trimmedContent) {
            Modal.warning({
                title: "Empty Note",
                content: "Both title and content cannot be empty.",
            });
            return;
        }

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
                    className={`bg-white p-5 shadow-sm rounded-lg border-l-4 transition-all duration-300 ease-in-out ${editingId === note.id ? "border-yellow-500" : "border-emerald-500"} hover:shadow-lg`}
                    style={{
                        fontFamily: 'sans-serif',
                    }}
                >
                    {editingId === note.id ? (
                        <>
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value.trimStart())}
                                className="block w-full border border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 rounded-md px-3 py-2 mb-3 text-base"
                                placeholder="Edit title"
                                style={{
                                    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.02)'
                                }}
                            />
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value.trimStart())}
                                className="block w-full border border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 rounded-md px-3 py-2 mb-3 text-base"
                                rows={4}
                                placeholder="Edit content"
                            ></textarea>
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={cancelEdit}
                                    className="inline-flex items-center border border-gray-300 rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500" style={{ fontFamily: 'sans-serif' }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="lucide lucide-x h-4 w-4 mr-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        width="24"
                                        height="24"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M18 6 6 18" />
                                        <path d="m6 6 12 12" />
                                    </svg>
                                    Cancel
                                </button>
                                <button
                                    onClick={() => saveEdit(note.id)}
                                    className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500" style={{ fontFamily: 'sans-serif' }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="lucide lucide-check h-4 w-4 mr-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        width="24"
                                        height="24"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M20 6 9 17l-5-5" />
                                    </svg>
                                    Save
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h3 className="text-lg font-medium text-gray-800 mb-2">{note.title}</h3>
                            <p className="text-gray-600 mb-4 line-clamp-2">{note.content}</p>

                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    onClick={() => startEdit(note)}
                                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500" style={{ fontFamily: 'sans-serif' }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-square-pen h-4 w-4 mr-1"
                                    >
                                        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                        <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                                    </svg>
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteNote(note.id)}
                                    className="inline-flex items-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    style={{
                                        fontFamily: "sans-serif",
                                        backgroundColor: "rgb(220 38 38 / var(--tw-bg-opacity, 1))",
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-trash2 h-4 w-4 mr-1"
                                    >
                                        <path d="M3 6h18" />
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                        <line x1="10" x2="10" y1="11" y2="17" />
                                        <line x1="14" x2="14" y1="11" y2="17" />
                                    </svg>
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
