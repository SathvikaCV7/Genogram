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
    const padding = 30;
    const childWidth = this.calculateTextWidth(this.childName) + padding;
    const childHeight = 30;
  
    this.nodes.push({
      id: 'child',
      label: this.childName,
      dimension: { width: childWidth, height: childHeight },
      icon: 'assets/images/child.svg',
      rank: 'second',
    });
  
    this.relationships.sort((a, b) => {
      
      const priorityOrder: { [key: string]: number } = {
        mother: 1,
        sister: 2,
        brother: 3,
        father: 4,
      };
      const priorityA = priorityOrder[a.relationshipType.toLowerCase()] || 99; 
      const priorityB = priorityOrder[b.relationshipType.toLowerCase()] || 99;

      return priorityA - priorityB;
    });
    
    this.relationships.forEach((relationship) => {
      const relationshipType = relationship.relationshipType.toLowerCase();
      const nodeId = `${relationshipType}-${relationship.id}`;
      const primary=relationship.isPrimaryContact;
      if (!this.relationshipTypeCount[relationshipType]) {
        this.relationshipTypeCount[relationshipType] = 0;
      }
      this.relationshipTypeCount[relationshipType]++;
  
      if (
        relationshipType === 'mother' ||
        relationshipType === 'father'
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
        icon: primary? 'assets/images/primary_contact.svg':'assets/images/user.svg',
        primary:primary
      });
  
      const isAbove = ['grandfather', 'grandmother', 'guardian'].includes(relationshipType);
      const sourceId = isAbove ? nodeId : 'child';
      const targetId = isAbove ? 'child' : nodeId;
      const reverseArrow=isAbove?true:false;

      const labelForLink=primary? relationship.relationshipType+" (P)":relationship.relationshipType

      this.links.push({
        id: `link-${nodeId}-${this.relationshipTypeCount[relationshipType]}`,
        source: sourceId,
        target: targetId,
        label: labelForLink,
        reverseArrow:reverseArrow,
        primary:primary
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
        label: parentNodeId.split('-')[0].charAt(0).toUpperCase() + parentNodeId.split('-')[0].slice(1),
        customPath: true
      });
    });
  });

  }
  
  
 
  calculateTextWidth(text: string ): number {
   const labelWidth=text.length*8;
   return labelWidth;
  }
  
  closeGenogram() {
    this.dialogRef.close();
  }

  layoutSettings = {
    orientation: 'TB', 
    edgePadding: 40,   
    rankPadding: 100, 
    nodePadding: 50    
  };
}





