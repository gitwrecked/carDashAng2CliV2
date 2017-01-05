import {Purchase} from './purchase';

export class User {
  constructor(
      public id: number, public email: string, public purchases: Purchase[]) {}
}
