import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionManageItemComponent } from './question-manage-item.component';

describe('QuestionManageItemComponent', () => {
  let component: QuestionManageItemComponent;
  let fixture: ComponentFixture<QuestionManageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionManageItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionManageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
