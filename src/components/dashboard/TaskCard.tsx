import { Draggable } from "@hello-pangea/dnd";
import Image from "next/image";
import styled from "styled-components";

const TaskWrapper = styled.div`
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TaskImage = styled(Image)`
  border-radius: 8px;
`;

const Tag = styled.span`
  background: #ddd;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
`;

export default function TaskCard({ task, index }: any) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <TaskWrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TaskImage src={task.image} width={200} height={120} alt="task" />
          <h4>{task.title}</h4>
          <div>
            {task.tags.map((tag: string) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <p>{task.date}</p>
        </TaskWrapper>
      )}
    </Draggable>
  );
}
