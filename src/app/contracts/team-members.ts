export interface TeamMembers {
  id?: string;
  name: string;
  firstName: string;
  nickname?: string;
  number: number;
  position?: Position;
  image?: any;
  memberSince: number;
  editMode?: boolean;
  storagePath: string;
}

export interface Position {
  positionFull: string;
  positionShort: string;
  category: string;
}
