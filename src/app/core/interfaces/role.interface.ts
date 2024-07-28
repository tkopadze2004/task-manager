export interface  Role{
  id: string;
  createdAt: Date;
  name: string;
  type: string;
  permissions: string[];
}

export interface  RolePayload{
  name:string
}
