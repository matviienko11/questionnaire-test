import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/questions.service';
import { Question } from '../../models/question.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-manage',
  templateUrl: './question-manage.component.html',
  styleUrls: ['./question-manage.component.scss']
})
export class QuestionManageComponent implements OnInit {

  questions$: any;

  constructor(private questionsService: QuestionsService, private router: Router) { }

  ngOnInit(): void {
    this.questions$ = this.questionsService.questions;
  }

  public navigateToCreate() {
    this.router.navigate(['questions/create']);
  }

  public navigateToList() {
    this.router.navigate(['questions/list']);
  }

  public deleteQuestion(question: Question) {
    this.questionsService.deleteQuestion(question.id);
  }

  public redirectToEdit(id: string) {
    this.router.navigate([`questions/edit/${id}`]);
  }
}
