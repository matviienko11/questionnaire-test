import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuestionsService } from '../../services/questions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.scss']
})
export class QuestionEditComponent implements OnInit, OnDestroy {

  public question: Question;
  private _routeSub: Subscription;

  constructor(private questionsService: QuestionsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this._routeSub = this.route.params.subscribe(params => {
      const id = params['id'];
      this.question = this.questionsService.getOneQuestion(id);
    });
  }

  ngOnDestroy() {
    this._routeSub.unsubscribe();
  }

  public navigateToManage() {
    this.router.navigate(['questions/manage']);
  }

  public editQuestion(question: Question) {
    this.questionsService.editQuestion(question);
    this.navigateToManage();
  }
}
