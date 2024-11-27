import { Child } from "./Child";

export interface Relationship {
    id: number;
    childId: number;
    child: Child; 
    firstName: string;
    lastName?: string; 
    relationshipType: string;
    email?: string; 
    phoneNumber?: number; 
    isPrimaryContact: boolean;
    remarks?:string;
    actions?:string;
  }