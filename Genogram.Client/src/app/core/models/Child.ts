import { Relationship } from "./Relationship";

export interface Child {
    id: number;
    name?: string;
    address?: string;
    nationality?: string;
    language?: string;
    dateOfBirth?: string;
    image?: string; 
    relationships?: { $values: Relationship[] };
  }
  export interface ChildrenResponse {
    $values: Child[];  // Array of Child objects
  }
  
  
  