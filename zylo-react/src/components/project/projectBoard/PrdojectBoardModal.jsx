import React from 'react';

export const ProjectBoardModal = ({
  newItemText,
  setNewItemText,
  setIsModalOpen,
  setBoardState,
  targetColumnForNewItem
}) => {
  const handleCreate = () => {
    if (!newItemText.trim()) return;

    setBoardState((prev) => {
      const updated = {
        ...prev,
        [targetColumnForNewItem]: [...prev[targetColumnForNewItem], newItemText],
      };
      localStorage.setItem("boardState", JSON.stringify(updated));
      return updated;
    });

    setNewItemText("");
    setIsModalOpen(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Add a title <span style={{ color: 'red' }}>*</span></h3>
          <input
            type="text"
            className="modal-input"
            placeholder="Title"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
          />
        </div>
        <div className="modal-body">
          <h4>Add a description</h4>
          <textarea
            className="modal-textarea"
            placeholder="Type your description here..."
          ></textarea>
        </div>
        <div className="modal-footer">
          <button className="modal-cancel" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
          <button className="modal-create" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
