import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

export interface Todo{
  task: string;
  priority: number;
  createdAt:number;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoCollection: AngularFirestoreCollection<Todo>;
  private todos: Observable<Todo[]>;

  constructor(db: AngularFirestore) { 
    this.todoCollection = db.collection<Todo>('todos2');

    this.todos = this.todoCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getTodos(){
    return this.todos;
  }

  getTodo(id){
    return this.todoCollection.doc<Todo>(id).valueChanges();
  }

  updateTodo(todo: Todo, id: string){
    return this.todoCollection.doc(id).update(todo);
  }

  addTodo(todo: Todo){
    return this.todoCollection.add(todo);
  }

  removeTodo(id){
    return this.todoCollection.doc(id).delete();
  }
}
