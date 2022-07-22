import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionType } from '../../models/question-type.model';
import { MatRadioChange } from '@angular/material/radio';
import { v4 as uuidv4 } from 'uuid';
import { Question } from '../../models/question.model';
import { QuestionTypeEnum } from '../../models/question-type.enum';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public form: FormGroup;
  public questionTypes: QuestionType[];
  public isOpenQuestion: boolean;
  public answerBody: string = '';

  @Input() questionToEdit: Question;
  @Output() newQuestion: EventEmitter<Question> = new EventEmitter<Question>();
  @Output() editedQuestion: EventEmitter<Question> = new EventEmitter<Question>();

  constructor(private fb: FormBuilder) {
    this.questionTypes = [
      {  value: 'single', label: 'Single choice' },
      {  value: 'multi', label: 'Multiple choice' },
      {  value: 'open', label: 'Open' }
    ]
  }

  ngOnInit(): void {
    if (this.questionToEdit) {
      this.questionToEdit.type === QuestionTypeEnum.OPEN ? this.isOpenQuestion = true : this.isOpenQuestion = false;
      this.form = this.fb.group({
        id: [this.questionToEdit.id],
        body: [this.questionToEdit.body, [Validators.required]],
        type: [this.questionToEdit.type, [Validators.required]],
        answers: this.fb.array(this.questionToEdit.answers),
        isAnswered: [this.questionToEdit.isAnswered],
        createdAt: [this.questionToEdit.createdAt],
        updatedAt: [this.questionToEdit.updatedAt]
      })
    } else {
      this.form = this.fb.group({
        id: [uuidv4()],
        body: ['', [Validators.required]],
        type: ['', [Validators.required]],
        answers: this.fb.array([]),
        isAnswered: [false],
        createdAt: [new Date()],
        updatedAt: [new Date()]
      })
    }
  }

  public createQuestion() {
    this.newQuestion.emit(this.form.value);
  }

  public editQuestion() {
    this.editedQuestion.emit(this.form.value);
  }

  public handleTypeChange({value}: MatRadioChange) {
    if (value === QuestionTypeEnum.OPEN) {
      this.isOpenQuestion = true;
      (this.form.controls['answers'] as FormArray).clear();
    } else {
      this.isOpenQuestion = false;
    }
  }

  public addAnswer() {
    if (!this.answerBody) return;
    const answers = this.form.controls.answers as FormArray;
    const answerControl = new FormControl({
      id: uuidv4(),
      text: this.answerBody,
      isChecked: false
    })
    answers.push(this.fb.group(answerControl.value))
    this.answerBody = '';
  }

  public removeAnswer(index: number) {
    const answersArr = this.form.controls.answers as FormArray;
    answersArr.removeAt(index)
  }
}
