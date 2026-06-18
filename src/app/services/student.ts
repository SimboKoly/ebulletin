import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  students: Student[] = [];

  constructor() { }

  getAll() {
    return this.students;
  }

  add(student: Student) {
    this.students.push(student);
  }

  delete(id: number) {
    this.students = this.students.filter(
      s => s.id !== id
    );
  }
}
