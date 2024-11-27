import { Component, Inject, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { Relationship } from '../../../core/models/Relationship';

@Component({
  selector: 'app-show-genogram',
  standalone: true,
  imports: [NgxGraphModule,MatIconModule],
  templateUrl: './show-genogram.component.html',
  styleUrl: './show-genogram.component.scss'
})
export class ShowGenogramComponent {
  @Input() childName: string = 'Sathvika CV'; 

  relationships:Relationship[]=[];
  constructor(public dialogRef: MatDialogRef<ShowGenogramComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {
    debugger;
    if (this.data && this.data.relationships) {
      this.relationships = this.data.relationships;
    }
    this.initializeGenogram();
  }
  nodes:any[]=[];
  links:any[]=[];
  relationshipTypeCount: { [key: string]: number } = {};


  initializeGenogram() {
    debugger;
   
    this.nodes.push({ id: 'child', label: this.childName , color: 'lightblue'});

    this.relationships.forEach((relationship) => {
      const relationshipType = relationship.relationshipType.toLowerCase();
      
      // Ensure unique node ID for each individual with the same relationshipType
      const nodeId = `${relationshipType}-${relationship.firstName}-${relationship.lastName}`;
      
      // Track how many nodes of the same type are created (e.g., multiple "sisters")
      if (!this.relationshipTypeCount[relationshipType]) {
        this.relationshipTypeCount[relationshipType] = 0;
      }
      this.relationshipTypeCount[relationshipType]++;

      // Add the node
      this.nodes.push({
        id: nodeId,  
        label: `${relationship.firstName} ${relationship.lastName}` 
      });

      // Add a link to the 'child'
      this.links.push({
        id: `${nodeId}-${this.relationshipTypeCount[relationshipType]}`, 
        source: 'child', 
        target: nodeId, 
        label: relationship.relationshipType ,
         color: 'lightblue'
      });
    });
  }

  closeGenogram() {
    this.dialogRef.close();
    
  }
  
}
