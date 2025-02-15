export interface IDashboardParams {
  teamId?: string;
  navigationMethod?: string;
  cursorId?: number;
  page?: number;
  size?: number;
}

export interface Dashboard {
  id: number;
  title: string;
  color: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
}

export interface DashBoardResponse {
  dashboards: Dashboard[];
  totalCount: number;
  cursorId: number | null;
}

export interface IInviteParams {
  teamId?: string;
  size?: number;
  cursorId?: number;
  title?: string;
}

export interface IColumnsParams {
  teamId?: string;
  dashboardId?: number;
  cursorId?: number;
  title?: string;
}
