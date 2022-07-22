import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  STORAGE_KEY = 'questions';

  private _questions = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  questions = new BehaviorSubject(JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]'));

  constructor() { }

  addQuestion(question: Question): void {
    this._questions.push(question)
    this.questions.next(this._questions);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._questions));
  }

  deleteQuestion(id: string): void {
    this._questions = this._questions.filter((q: Question) => q.id !== id);
    this.questions.next(this._questions);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._questions));
  }

  editQuestion(question: Question): void {
    const idx = this._questions.findIndex((q: Question) => q.id === question.id);
    this._questions[idx] = question;
    this.questions.next(this._questions);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._questions));
  }

  getOneQuestion(id: string): Question {
    return this._questions.find((q: Question) => q.id === id);
  }
}
