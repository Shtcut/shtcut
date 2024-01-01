import { Exclude } from 'class-transformer';

// todo currently working on this for SQL base entity to inherit
export abstract class BaseEntity<T = any> {
  // This is what we use internally as a foreign key,but never expose to the public because leaking use counts is a company trade secrets issue
  // (Running counter keys make data more local and faster to access)
  @Exclude()
  id: number;
}
