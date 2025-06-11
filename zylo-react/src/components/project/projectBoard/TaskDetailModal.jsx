"use client";

import { useState } from "react";
import { X, Edit2, Calendar, User, Tag } from "lucide-react";
import "../../../styles/project/board.css";

export const TaskDetailModal = ({
  task,
  isOpen,
  onClose,
  onUpdateTask,
  columnTitle,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task?.title || "");
  const [editDesc, setEditDesc] = useState(task?.desc || "");

  if (!isOpen || !task) return null;

  const handleSave = async () => {
    if (!editTitle.trim()) {
      alert("작업 제목을 입력하세요.");
      return;
    }

    try {
      await onUpdateTask(task.id, editTitle, editDesc);
      setIsEditing(false);
    } catch (error) {
      console.error("작업 업데이트 실패:", error);
      alert("작업 업데이트에 실패했습니다.");
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDesc(task.desc);
    setIsEditing(false);
  };

  const getStatusColor = (status) => {
    const colors = {
      ready: "#27c93f",
      todo: "#1c92f2",
      inProgress: "#ffb400",
      inReview: "#a259ff",
      done: "#ff5722",
    };
    return colors[status] || "#666";
  };

  return (
    <div className="task-detail-modal-overlay" onClick={onClose}>
      <div
        className="task-detail-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 헤더 */}
        <div className="task-detail-modal-header">
          <div className="task-detail-header-left">
            {isEditing ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="task-detail-title-input"
                autoFocus
              />
            ) : (
              <h2 className="task-detail-title">{task.title}</h2>
            )}
          </div>
          <div className="task-detail-header-right">
            {!isEditing && (
              <button
                className="task-detail-edit-btn"
                onClick={() => setIsEditing(true)}
                title="편집"
              >
                <Edit2 size={16} />
              </button>
            )}
            <button
              className="task-detail-close-btn"
              onClick={onClose}
              title="닫기"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* 작업 메타 정보 */}
        <div className="task-detail-meta">
          <div className="task-detail-meta-item">
            <Tag size={16} />
            <span
              className="task-detail-status"
              style={{ color: getStatusColor(columnTitle?.toLowerCase()) }}
            >
              {columnTitle}
            </span>
          </div>
          <div className="task-detail-meta-item">
            <Calendar size={16} />
            <span>생성일: {new Date().toLocaleDateString()}</span>
          </div>
          <div className="task-detail-meta-item">
            <User size={16} />
            <span>담당자: 미지정</span>
          </div>
        </div>

        {/* 작업 설명 */}
        <div className="task-detail-content">
          <h3 className="task-detail-section-title">작업 설명</h3>
          {isEditing ? (
            <textarea
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              className="task-detail-desc-textarea"
              placeholder="작업에 대한 상세 설명을 입력하세요..."
              rows={6}
            />
          ) : (
            <div className="task-detail-description">
              {task.desc || "설명이 없습니다."}
            </div>
          )}
        </div>

        {/* 액션 버튼 */}
        {isEditing && (
          <div className="task-detail-actions">
            <button className="task-detail-cancel-btn" onClick={handleCancel}>
              취소
            </button>
            <button className="task-detail-save-btn" onClick={handleSave}>
              저장
            </button>
          </div>
        )}

        {/* 추가 정보 섹션 */}
        <div className="task-detail-additional">
          <div className="task-detail-section">
            <h4 className="task-detail-section-subtitle">작업 ID</h4>
            <p className="task-detail-id">#{task.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
