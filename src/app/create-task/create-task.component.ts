import { Component, OnInit } from "@angular/core";
import { Todo } from "../model";
import { CommonServiceService } from "../common-service.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-create-task",
  templateUrl: "./create-task.component.html",
  styleUrls: ["./create-task.component.css"],
})
export class CreateTaskComponent implements OnInit {
  constructor(
    private service: CommonServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  date = Date.now();
  key = 'testKey';
  // sent = [];
  urlParameter: any;
  Status = null;
  objForEdit: Todo = {
    taskName: null,
    Status: null,
    date: new Date(),
    rating: null,
  };
  ngOnInit() {
    this.urlParameter = this.route.snapshot.paramMap.get('id');
    console.log(this.urlParameter);
    if (this.urlParameter) {
      this.objForEdit = this.service.getSelectedData(this.urlParameter);
    }
  }
  // Create or Update function
  createTask(form: Todo) {
    form.date = new Date();
    if (!this.urlParameter) {
      this.service.setData(this.key, form);
      alert('Success , Your task is saved.');
      this.router.navigate(['/taskBoard']);
    } else {
      this.service.updateItem(form);
      this.router.navigate(['/taskBoard']);
      alert('Success , Your task is Updated.');
    }
  }
}
