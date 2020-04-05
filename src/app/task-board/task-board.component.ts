import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit {

  constructor(private service: CommonServiceService) { }
  userData: any;
  key = 'testKey';
  toggel = false;
  ngOnInit() {
    this.userData = this.service.getData(this.key);
    this.sortedArray('date');
    console.log('taskboard', this.userData);
  }
  // Delete Item function
  deleteItem(i) {
    this.service.deleteItem(i);
  }
  // sort data function
 sortedArray(data) {
  this.userData.sort(this.service.compareValues(data, !this.toggel ? 'asc' : 'desc'));
  this.toggel = !this.toggel;

}
}
