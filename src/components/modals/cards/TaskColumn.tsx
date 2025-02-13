import { useEffect, useState } from "react";
import { getColumns } from "@/src/api/columns";

interface TaskColumnProps {
  teamId: string;
  columnId: number;
  dashboardId: number;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  teamId,
  columnId,
  dashboardId,
}) => {
  const [columnName, setColumnName] = useState<string>("없음");

  useEffect(() => {
    getColumns(teamId, dashboardId)
      .then((columns) => {
        const column = columns.find((col: any) => col.id === columnId);
        setColumnName(column ? column.title : "없음");
      })
      .catch((error) => console.error("컬럼 조회 실패:", error));
  }, [teamId, columnId, dashboardId]);

  return <p className="task-column">컬럼: {columnName}</p>;
};

export default TaskColumn;
