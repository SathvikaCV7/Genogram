import { Relationship } from "./Relationship";

export interface Child {
    id: number;
    name: string;
    address: string;
    nationality: string;
    language: string;
    dateOfBirth: Date;
    imagePath?: string; 
    relationships?: Relationship[]; 
  }
  
  
  