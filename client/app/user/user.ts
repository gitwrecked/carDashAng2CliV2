import { Purchase } from '../purchase/purchase';

export class User {
  constructor(
    public id: number,
    public email: string,
    public purchases:Purchase[]
  ) {  
  }
}
