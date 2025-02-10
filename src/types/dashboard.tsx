export interface IDashboardParams {
  teamId?: string;
  navigationMethod?: string;
  cursorId?: number;
  page?: number;
  size?: number;
}

export interface IInviteParams {
  teamId?: string;
  size?: number;
  cursorId?: number;
  title?: string;
}
