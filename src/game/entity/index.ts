export class Entity<T> {
  constructor(public props: T, public entityId: number, public entityType: number) { }
}