import { useEffect, useState } from "react";

// Task 데이터 타입 정의
interface Task {
  id: number;
  title: string;
  description: string;
  image?: string;
}

// 댓글 데이터 타입 정의
interface Comment {
  id: number;
  text: string;
  author: string;
}

// 모달에 전달되는 props 타입 정의
interface TaskCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (taskId: number) => void;
}

export default function TaskCardModal({ isOpen, onClose, onDelete }) {
  // 할 일 카드 데이터 상태
  const [taskDate, setTaskDate] = useState<Task | null>(null);
  // 댓글 목록 상태
  const [comments, setComments] = useState<Comment[]>([]);
  // 댓글 입력값 상태
  const [commentInput, setCommentInput] = useState("");
  // 케밥 메뉴 상태
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  //수정 모달 열림 여부 상태
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  //모달이 열릴 때 데이터를 불러오는 useEffect
  useEffect(() => {
    if (isOpen) {
      // TODO: API에서 데이터 불러오기 (임시 데이터 설정)
    }
  });
}
