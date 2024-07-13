export interface Epic {
  id: number;
  name: string;
  description: string;
  projectId: number;
  position: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface Epicpayload {
  name: string;
  description: string;
  position?: number;
}
