import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Question } from '../../models/question.model';

@Component({
  selector: 'app-question-manage-item',
  templateUrl: './question-manage-item.component.html',
  styleUrls: ['./question-manage-item.component.scss']
})
export class QuestionManageItemComponent {

  @Input() item: Question;
  @Output() itemToDelete: EventEmitter<Question> = new EventEmitter<Question>();
  @Output() edit: EventEmitter<string> = new EventEmitter<string>();

  public handleDelete() {
    this.itemToDelete.emit(this.item)
  }

  public handleEdit() {
    this.edit.emit(this.item.id);
  }
}
