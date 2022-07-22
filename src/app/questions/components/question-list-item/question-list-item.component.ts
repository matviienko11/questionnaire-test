import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '../../models/question.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Answer } from '../../models/answer.model';
import { v4 as uuidv4 } from 'uuid';
import { QuestionTypeEnum } from '../../models/question-type.enum';

@Component({
  selector: 'app-question-list-item',
  templateUrl: './question-list-item.component.html',
  styleUrls: ['./question-list-item.component.scss']
})
export class QuestionListItemComponent implements OnInit {

  public openAnswer: string;
  private isDisabled: boolean;
  @Input() item: Question
  @Output() itemToAnswer: EventEmitter<Question> = new EventEmitter<Question>();
  @Output() itemToRollBack: EventEmitter<Question> = new EventEmitter<Question>();

  ngOnInit() {
    if (this.item.type === QuestionTypeEnum.OPEN) {
      this.openAnswer = this.item.answers[0]?.text;
    }
  }

  public answerQuestion() {
    if (this.item.type === QuestionTypeEnum.OPEN) {
      const answer: Answer = {
        id: uuidv4(),
        text: this.openAnswer,
        isChecked: false
      }
      this.item.answers = [];
      this.item.answers.push(answer);
    }
    const answered: Question = { ...this.item, isAnswered: true, answeredAt: new Date() };
    this.itemToAnswer.emit(answered);
  }

  public rollBackQuestion() {
    const answered: Question = { ...this.item, isAnswered: false };
    delete answered.answeredAt;
    this.itemToRollBack.emit(answered);
  }

  public check(e: MatCheckboxChange, answer: Answer) {
    if (this.item.type === QuestionTypeEnum.SINGLE) {
      this.item.answers.forEach((a: Answer) => a.isChecked = false);
      this.checkHandler(e, answer);
    } else {
      this.checkHandler(e, answer);
    }
  }

  public checkIsDisabled() {
    if (this.item.type === QuestionTypeEnum.OPEN) {
      this.openAnswer?.length ? this.isDisabled = false : this.isDisabled = true;
      return this.isDisabled;
    } else {
      this.isDisabled = true;
      const isCheckedArr = this.item.answers.filter(i => i.isChecked);
      if (this.item.type === QuestionTypeEnum.SINGLE && isCheckedArr.length === 1) this.isDisabled = false;
      if (this.item.type === QuestionTypeEnum.MULTI && isCheckedArr.length > 1) this.isDisabled = false;
      return this.isDisabled;
    }
  }

  private checkHandler(e: MatCheckboxChange, answer: Answer) {
    const idx: number = this.item.answers.findIndex(a => a.id === answer.id);
    this.item.answers[idx] = { ...answer, isChecked: e.checked };
  }
}
