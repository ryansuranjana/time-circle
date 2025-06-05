export interface User {
  id: number;
  nickname: string;
  email: string;
  groups?: string[];
  schedules?: string[];
}
