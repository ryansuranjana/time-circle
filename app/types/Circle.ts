import type { Member } from "./Member";

export interface Circle {
  id: number;
  code: string;
  name: string;
  members: Member[];
}
