import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionManageComponent } from './pages/question-manage/question-manage.component';
import { QuestionCreateComponent } from './pages/question-create/question-create.component';
import { QuestionEditComponent } from './pages/question-edit/question-edit.component';
import { QuestionListComponent } from './pages/question-list/question-list.component';
import { FormComponent } from './components/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { QuestionManageItemComponent } from './components/question-manage-item/question-manage-item.component';
import { MatCardModule } from '@angular/material/card';
import { QuestionListItemComponent } from './components/question-list-item/question-list-item.component';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [
    QuestionManageComponent,
    QuestionCreateComponent,
    QuestionEditComponent,
    QuestionListComponent,
    FormComponent,
    QuestionManageItemComponent,
    QuestionListItemComponent
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatCheckboxModule
  ]
})
export class QuestionsModule { }
