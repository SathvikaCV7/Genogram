import { Component, Inject, Input, SimpleChanges,NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { Relationship } from '../../../core/models/Relationship';
import * as shape from 'd3-shape';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-show-genogram',
  standalone: true,
  imports: [MatCardModule,NgxGraphModule,MatIconModule,CommonModule],
  templateUrl: './show-genogram.component.html',
  styleUrl: './show-genogram.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class ShowGenogramComponent {
  childName: string =''; 
  curve = shape.curveLinear;
  relationships:Relationship[]=[];
  constructor(public dialogRef: MatDialogRef<ShowGenogramComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {
   
    if (this.data && this.data.relationships) {
      this.relationships = this.data.relationships;
      this.childName=this.data.childName;
    }
    this.initializeGenogram();
  }

  nodes:any[]=[];
  links:any[]=[];
  relationshipTypeCount: { [key: string]: number } = {};
  parents: any[] = [];

  initializeGenogram() {
    
    const padding = 40;
    const childWidth = this.calculateTextWidth(this.childName) + padding;
    const childHeight = 30;
 

    this.nodes.push({
      id: 'child',
      label: this.childName,
      dimension: { width: childWidth ,height:childHeight},
      icon: 'assets/images/child_icon1.svg',
    });
  
    this.relationships.forEach((relationship) => {
      const relationshipType = relationship.relationshipType.toLowerCase();
      const nodeId = `${relationshipType}-${relationship.id}`;
      if (!this.relationshipTypeCount[relationshipType]) {
        this.relationshipTypeCount[relationshipType] = 0;
      }
      this.relationshipTypeCount[relationshipType]++;
  
      if (
        relationshipType === 'mother' ||
        relationshipType === 'father' ||
        relationshipType === 'grandfather' ||
        relationshipType === 'grandmother'
      ) {
        this.parents.push(nodeId);
      }
  
      const label = `${relationship.firstName} ${relationship.lastName}`;
      const nodeWidth = this.calculateTextWidth(label) + padding;
      const nodeHeight = 30; 
      this.nodes.push({
        id: nodeId,
        label: label,
        dimension: { width: nodeWidth, height: nodeHeight },
        icon: 'assets/images/user2.svg',
      });
  
      this.links.push({
        id: `${nodeId}-${this.relationshipTypeCount[relationshipType]}`,
        source: 'child',
        target: nodeId,
        label: relationship.relationshipType.toUpperCase(),
      });
    });
  
    this.relationships
      .filter(
        (relationship) =>
          relationship.relationshipType.toLowerCase() === 'sister' ||
          relationship.relationshipType.toLowerCase() === 'brother'
      )
      .forEach((relationship) => {
        const relationshipType = relationship.relationshipType.toLowerCase();
        const nodeId = `${relationshipType}-${relationship.id}`;
        this.parents.forEach((parentNodeId: string) => {
          this.links.push({
            id: `sibling-${nodeId}-${parentNodeId}`,
            source: nodeId,
            target: parentNodeId,
            label: parentNodeId.split('-')[0].toUpperCase(),
          });
        });
      });
  }
  
 
  calculateTextWidth(text: string ): number {
   const baseWidth=55;
   const labelWidth=text.length*8;
   return labelWidth;

  }
  
  closeGenogram() {
    this.dialogRef.close();
  }
  layoutSettings = {
    orientation: 'TB', // Top to Bottom layout
    edgePadding: 50,   // Padding between edges and nodes
    rankPadding: 100,  // Space between nodes vertically
    nodePadding: 20    // Padding inside the nodes
  };
}





