import { Component } from '@angular/core';
import { Question } from '../../models/question.model';
import { QuestionsService } from '../../services/questions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.scss']
})
export class QuestionCreateComponent {

  constructor(private questionService: QuestionsService, private router: Router) { }

  public addNewQuestion(question: Question) {
    this.questionService.addQuestion(question);
    this.navigateToManage();
  }

  public navigateToManage() {
    this.router.navigate(['questions/manage'])
  }
}
