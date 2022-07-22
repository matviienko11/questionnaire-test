import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionManageComponent } from './pages/question-manage/question-manage.component';
import { QuestionCreateComponent } from './pages/question-create/question-create.component';
import { QuestionEditComponent } from './pages/question-edit/question-edit.component';
import { QuestionListComponent } from './pages/question-list/question-list.component';

const routes: Routes = [
  {
    path: 'manage',
    component: QuestionManageComponent
  },
  {
    path: 'create',
    component: QuestionCreateComponent
  },
  {
    path: 'edit/:id',
    component: QuestionEditComponent
  },
  {
    path: 'list',
    component: QuestionListComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'manage'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
