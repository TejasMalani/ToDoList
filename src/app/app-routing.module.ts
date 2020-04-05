import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskBoardComponent } from './task-board/task-board.component';
import { CreateTaskComponent } from './create-task/create-task.component';


const routes: Routes = [
  { path: '', redirectTo: 'taskBoard', pathMatch: 'full'},
  {path: 'taskBoard', component: TaskBoardComponent},
  {path: 'createTask', component: CreateTaskComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
