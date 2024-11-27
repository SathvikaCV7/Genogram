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
   
    if (this.data && this.data.relationships) {
      this.relationships = this.data.relationships;
    }
    this.initializeGenogram();
  }
  nodes:any[]=[];
  links:any[]=[];
  relationshipTypeCount: { [key: string]: number } = {};
  parents: any[] = [];

  initializeGenogram() {
   
   
    this.nodes.push({ id: 'child', label: this.childName , data: { color: 'lightblue' }});

    this.relationships.forEach((relationship) => {
      const relationshipType = relationship.relationshipType.toLowerCase();
      const nodeId = `${relationshipType}-${relationship.id}`;
      if (!this.relationshipTypeCount[relationshipType]) {
        this.relationshipTypeCount[relationshipType] = 0;
      }
      this.relationshipTypeCount[relationshipType]++;

      if(relationshipType=="mother" ||relationshipType=="father" || relationshipType=="grandfather" || relationshipType=="grandmother"){
        this.parents.push(nodeId);
      }
      this.nodes.push({
        id: nodeId,  
        label: `${relationship.firstName} ${relationship.lastName}` ,
        data: { color: 'lightblue' }
      });


      this.links.push({
        id: `${nodeId}-${this.relationshipTypeCount[relationshipType]}`, 
        source: 'child', 
        target: nodeId, 
        label: relationship.relationshipType 
        
      });

     
    });
    

   this.relationships.filter((relationship) => 
      relationship.relationshipType.toLowerCase() === 'sister' || relationship.relationshipType.toLowerCase() === 'brother'
    ).forEach((relationship)=>{
      const relationshipType = relationship.relationshipType.toLowerCase();
      const nodeId = `${relationshipType}-${relationship.id}`;
      this.parents.forEach((parentNodeId: string)=>{
        this.links.push({
          id:`sibling-${nodeId}-${parentNodeId}`,
          source:parentNodeId,
          target:nodeId,
          label:parentNodeId.split('-')[0]
        })

      })

    })
  }

  

  closeGenogram() {
    this.dialogRef.close();
    
  }
  
}
