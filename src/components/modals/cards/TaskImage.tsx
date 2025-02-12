interface TaskImageProps {
  imageUrl: string | null;
}

const TaskImage: React.FC<TaskImageProps> = ({ imageUrl }) => {
  return imageUrl ? (
    <img src={imageUrl} alt="카드 이미지" className="task-image" />
  ) : null;
};

export default TaskImage;
