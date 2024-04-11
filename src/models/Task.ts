export class task {
  id: number;
  title: string;
  isCompleted: boolean;
  isDeleted: boolean;
  constructor(id: number, title: string, isCompleted: boolean = false, isDeleted: boolean = false) {
    this.id = id;
    this.title = title;
    this.isCompleted = isCompleted;
    this.isDeleted = isDeleted;
  }
}
