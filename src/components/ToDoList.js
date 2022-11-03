// component for the todo list
import React from "react";
import store from "./ToDoStore";
import { observer } from "mobx-react";
import style from "../styles/ToDoList.module.css";
import { Button, DatePicker, Space } from "antd";
// import "antd/dist/antd.css";
import 'antd/dist/antd.min.css';
import { useState, useEffect } from "react";
import {
  EditFilled,
  DeleteFilled,
  PlusCircleTwoTone,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  AlertFilled,
  CheckCircleFilled,
  SortAscendingOutlined,
} from "@ant-design/icons";

import { Input } from "antd";
function ToDoList() {
  console.log("rendering todolist");
  const [inputToDo, setInputToDo] = useState();

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.inputContainer}>
        {/* <h2 className={style.Header}> ToDo App</h2> */}

        <Input
          type="text"
          className={style.InputToDo}
          onChange={(event) => {
            setInputToDo(event.target.value);
            store.newToDo.content = event.target.value;
          }}
          value={inputToDo ?? ""}
          placeholder="enter your activity and select the day"
        />
        <Space direction="vertical">
          <DatePicker
            className={style.DatePickerCursor}
            onChange={(event) => {
              store.changeDate(event._d);
            }}
          />
        </Space>
        <PlusCircleTwoTone
          type="primary"
          style={{
            fontSize: "20px",
            // marginLeft: "10px",
            // position: "relative",
            // top: "5px",
            // left: "3px",
          }}
          onClick={() => {
            store.addToDo();
            setInputToDo("");
          }}>
          add
        </PlusCircleTwoTone>
      </div> 
      <span className={style.ErrorMessage}>{store.errorMessage}</span>
      
       


{store.toDoList.length > 0 ? (
        <SortAscendingOutlined
        className={style.sortButton}
          title="click to sort your to-dos"
          onClick={() => {
            store.sortList();
          }}
          style={{color:"white",backgroundColor:"rgba(0,0,0,1)",fontSize:"1rem"}}
           
        />
      ) : (
         
        <></>
      )}


      <div className={style.list}>
         
        {store.toDoList.map((todo, id) => (
          <li key={todo.id} className={style.Li}>
            {store.idOfToDoToBeEdited != todo.id ? (
              <span>
                {/* {todo.status} */}
                {todo.status == "Pending" ? (
                  <span className={style.spanLiPending}>
                    <span className={style.DateLi}>{todo.date}</span>
                    <span
                      style={{
                        color: "white",
                        marginLeft: "5px",
                        marginRight: "5px",
                      }}>
                      {" "}
                      :{" "}
                    </span>
                    <span className={style.toDoLi}> {todo.content} </span>
                  </span>
                ) : (
                  <span className={style.spanLiCompleted}>
                    <span className={style.DateLi}>{todo.date}</span> :
                    <span className={style.toDoLi}> {todo.content} </span>
                  </span>
                )}
              </span>
            ) : (
              <span></span>
            )}

            {store.editToggleBoolean == true &&
            store.idOfToDoToBeEdited == todo.id ? (
              <span>
                <input
                  placeholder={todo.content}
                  onChange={(event) => {
                    store.newToDo.content = event.target.value;
                  }}
                />
                <CheckCircleTwoTone
                  type="submit"
                  title="click to update"
                  style={{ fontSize: "15px", margin: "5px" }}
                  twoToneColor="lightgreen"
                  onClick={() => store.updateToDo(todo.id)}>
                  {" "}
                  update{" "}
                </CheckCircleTwoTone>
                <CloseCircleTwoTone
                  type="submit"
                  title="click to cancel"
                  twoToneColor="orange"
                  style={{
                    fontSize: "15px",
                    marginLeft: "2px",
                    marginRight: "5px",
                  }}
                  onClick={() => store.cancelEdit()}>
                  {" "}
                  cancel{" "}
                </CloseCircleTwoTone>
              </span>
            ) : (
              <span />
            )}
            <EditFilled
              shape="round"
              title="click to edit this to-do"
              style={{
                fontSize: "15px",
                marginLeft: "30px",
                color: "lightblue",
              }}
              onClick={() => store.editToggle(todo.id, todo.content)}>
              {" "}
              Edit
            </EditFilled>

            <DeleteFilled
              shape="round"
              title="click to delete this to-do"
              style={{ fontSize: "15px", marginLeft: "10px", color: "red" }}
              onClick={() => store.deleteToDo(todo.id)}
              danger>
              Delete
            </DeleteFilled>
            <AlertFilled
              title="click to mark this to-do as pending"
              style={{ marginLeft: "10px", color: "firebrick" }}
              onClick={() => {
                store.markAsPending(todo.id);
              }}
            />
            <CheckCircleFilled
              title="click to mark this to-do as completed"
              onClick={() => {
                store.markAsDone(todo.id);
              }}
              style={{
                color: "lightgreen",
                marginLeft: "10px",
              }}></CheckCircleFilled>
          </li>
        ))}
      </div>
    </div>
  );
}

export default observer(ToDoList);
