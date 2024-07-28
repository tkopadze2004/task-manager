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
