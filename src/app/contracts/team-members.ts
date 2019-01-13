export interface TeamMembers {
  id?: string;
  name: string;
  firstName: string;
  nickname?: string;
  number: number;
  position?: Position;
  image?: string;
  memberSince: number;
  editMode?: boolean;
}

export interface Position {
  positionFull: string;
  positionShort: string;
  category: string;
}
