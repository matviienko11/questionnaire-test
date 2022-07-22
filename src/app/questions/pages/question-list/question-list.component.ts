import { Component, OnDestroy, OnInit } from '@angular/core';
import { Question } from '../../models/question.model';
import { QuestionsService } from '../../services/questions.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit, OnDestroy {

  unanswered : Question[];
  answered : Question[];

  private _sub: Subscription;

  constructor(private questionsService: QuestionsService, private router: Router) { }

  ngOnInit(): void {
    this._sub = this.questionsService.questions.pipe(
      map(questions => {
        this.unanswered = questions
          .filter((q: Question) => !q.isAnswered)
          .sort((a: Question, b: Question) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.answered = questions
          .filter((q: Question) => q.isAnswered)
          .sort((a: Question, b: Question) => {
            if (a.answeredAt && b.answeredAt) {
              return new Date(b.answeredAt).getTime() - new Date(a.answeredAt).getTime()
            }
            return;
          });
      })
    )
      .subscribe()
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  public handleAnswer(question: Question) {
    this.questionsService.editQuestion(question);
  }

  public navigateToManage() {
    this.router.navigate(['questions/manage']);
  }
}
