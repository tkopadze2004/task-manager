export interface  Role{
  id: string;
  createdAt: Date;
  name: string;
  type: string;
  permissions: string[];
}

export interface  RolePayload{
  id?:number
  name:string
}


export interface Permission {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  name: string;
  key: string;
  description: string;
  groupName: string;
  groupKey: string;
}
