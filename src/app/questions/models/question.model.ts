import { Answer } from './answer.model';

export interface Question {
  id: string;
  type: string;
  body: string;
  answers: Answer[];
  isAnswered: boolean;
  createdAt: Date;
  updatedAt: Date;
  answeredAt?: Date;
}

