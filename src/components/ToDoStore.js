import { makeObservable, action, computed, observable } from "mobx";
import { nanoid, customAlphabet } from "nanoid";

// mobx store to manage states
class ToDoStore {
  // toDoList = [];
  // toDoCompleted = 0;
  // toDoPending = 0;

  constructor() {
    this.toDoList = [];
    this.toDoCompleted = 0;
    this.toDoPending = 0;
    this.editToggleBoolean = false;
    this.idOfToDoToBeEdited = -1;
    this.errorMessage = "";

    this.newToDo = {
      id: 0,
      content: "",
      status: "Pending",
      date: "",
    };

    makeObservable(this, {
      toDoList: observable,
      toDoCompleted: observable,
      editToggleBoolean: observable,
      calculateCompletedToDo: computed,
      addToDo: action,
      deleteToDo: action,
      editToggle: action,
      cancelEdit: action,
      updateToDo: action,
      sortList: action,
      errorMessage: observable,
    });
  }

  // to calculate the total number of completed todos
  get calculateCompletedToDo() {
    this.toDoList.forEach((eachToDo) => {
      if (eachToDo.completed == true) {
        this.toDoCompleted += 1;
      }
    });

    this.toDoPending = this.toDoList.length - this.toDoCompleted;
  }

  // to add a new todo to the list
  addToDo() {
    const nanoid = customAlphabet("1234567890", 2);
    this.newToDo.id = nanoid();
    console.log("new to do id is ", this.newToDo.id);
    console.log(this.newToDo);
    if (this.newToDo.content == "" || this.newToDo.date == "") {
      // window.alert("todo content cannot be empty");
      this.errorMessage = "both activity and date data should be provided";
      return;
    } else {
      this.errorMessage = "";
    }
    this.toDoList.push(this.newToDo);
    // this.newToDo.content = "";
    // console.log("new todo is ", this.newToDo);
    this.newToDo.content = "";

    console.log("to do list is ", this.toDoList);
  }

  // function to delete a todo
  deleteToDo(toDoId) {
    console.log("key to be deleted is ", toDoId);
    console.log(this.toDoList.length);
    this.toDoList = this.toDoList.filter((eachToDo) => eachToDo.id != toDoId);
    console.log(this.toDoList.length);
  }

  // function to manage variables that hide and unhide edit buttons on the page
  editToggle(toDoId, toDoContent) {
    this.newToDo.content = toDoContent;
    console.log("todo is ", toDoId);
    this.editToggleBoolean = true;
    this.idOfToDoToBeEdited = toDoId;
    console.log(
      "inside edit toggle ",
      this.editToggleBoolean,
      this.idOfToDoToBeEdited
    );
  }

  // to cancel editing and revert back to original content in todo
  cancelEdit() {
    console.log("inside cancel");
    this.editToggleBoolean = false;
    this.idOfToDoToBeEdited = -1;
  }

  // callback function used by datekeeper antd element
  changeDate(date) {
    // console.dir(date);
    // console.log(date.toDateString());
    store.newToDo.date = date.toDateString();
  }

  //to mark a todo as completed
  markAsDone(toDoId) {
    let index = this.toDoList.map((eachToDo) => eachToDo.id).indexOf(toDoId);

    store.toDoList[index].status = "Completed";
  }

  // to mark a todo as pending
  markAsPending(toDoId) {
    let index = this.toDoList.map((eachToDo) => eachToDo.id).indexOf(toDoId);

    store.toDoList[index].status = "Pending";
  }

  // to update changes to an existing todo
  updateToDo(toDoId) {
    if (this.newToDo.content == "") {
      // window.alert("todo content cannot be empty");
      this.errorMessage = "todo content cannot be empty";
      return;
    } else {
      this.errorMessage = "";
    }

    console.log("id to be updated is ", toDoId);
    let index = this.toDoList.map((eachToDo) => eachToDo.id).indexOf(toDoId);
    console.log("index found : ", index);
    this.toDoList[index].content = this.newToDo.content;
    this.editToggleBoolean = false;
    this.idOfToDoToBeEdited = -1;
  }

  sortList() {
    console.log("sorting to-do list");
    this.toDoList.sort((a, b) => {
      const d1 = new Date(a.date.toString());
      const d2 = new Date(b.date.toString());

      return d1 - d2;
    });
  }
}
const store = new ToDoStore();
export default store;

export class ToDoItem {
  constructor(id, content, status) {
    this.id = id;
    this.content = content;
    this.status = "pending";
  }
}
