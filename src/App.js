import "antd/dist/antd.min.css";
import Login from "./components/Login/Login";
import { useState, useEffect, useRef } from "react";
import ExtractTodoList from "./components/Firebase-utils/ExtractTodoList";
import AddPost from "./components/Firebase-utils/AddPost/AddPost";
import style from "./App.module.css";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "./components/Firebase-utils/Firebase-config";
import { collection } from "firebase/firestore";
import { getDocs, query, where } from "firebase/firestore";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";

function App() {
  const [user, setUser] = useState(null);
  const [todoList, setTodoList] = useState(null);
  const [editable, setEditable] = useState("null");
  const activityRef = useRef("");
  const inputRef = useRef();

  useEffect(() => {
    console.log("updated todo list is , ", todoList);
  }, [todoList]);

  useEffect(() => {
    console.log("editable toggled to ", editable);
  }, [editable]);

  const deleteDocId = async (id) => {
    console.log("going to delete doc with id ", id);
    const docRef = await doc(db, "todo", id);
    deleteDoc(docRef).then(() => {
      console.log("deleted doc");
    });

    var tempList = [...todoList].filter((element) => element.id != id);
    console.log(tempList);
    setTodoList(tempList);
  };

  return (
    <Stack className="App" direction="column">
      <Stack
        direction="column"
        style={{
          backgroundColor: "black",
          height: "8ch",
          placeItems: "center",
          placeContent: "center",
        }}
      >
        <Stack direction="row" spacing={2}>
          <Typography
            variant="caption"
            style={{
              width: "100%",
              textAlign: "center",
              color: "white",
              fontFamily: "cursive",
              fontSize: "2rem",
              // fontFamily: "sans-serif",
              fontStyle: "italic",
              fontWeight: "800",
              textDecoration: "underline",
              textDecorationColor: "aqua",
            }}
          >
            Todo
          </Typography>

          <Typography
            variant="caption"
            style={{
              width: "100%",
              textAlign: "center",
              color: "white",
              fontFamily: "cursive",
              fontSize: "2rem",
              // fontFamily: "sans-serif",
              fontStyle: "italic",
              fontWeight: "800",
              backgroundColor: "brown",
              paddingLeft: "0.2ch",
              paddingRight: "0.2ch",
            }}
          >
            app
          </Typography>
        </Stack>
      </Stack>
      <div className={style.welcomeMessage}>
        {user ? (
          <span
            style={{
              color: "rgb(231, 14, 14)",
              fontSize: "1rem",
              fontWeight: "800",
            }}
          >
            Welcome, {user.email}
          </span>
        ) : (
          <></>
        )}
      </div>
      <Login user={user} setUser={setUser} />

      {user !== null ? (
        <ExtractTodoList user={user} setTodoList={setTodoList} />
      ) : (
        <span></span>
      )}

      {user !== null ? (
        <div className={style.mainContainer}>
          <div>
            {/* list todo container */}
            {todoList?.length > 0 ? (
              <div className={style.todoList}>
                {/* <div>
       button  sort by created   
    <button onClick={()=>
            {  var x = []    
                tempList.current.forEach((element,index) => {
                x[index] =  element.data.created
                console.log(typeof element.data.created)
                });
                console.log(todoList)
                 var y = [...todoList];
                 y=y.sort((a,b)=>  a.data.created  >  b.data.created  ? -1 : +1 )
                console.log(y)  
                y=y.sort((a,b)=>  a.data.created  <  b.data.created  ? -1 : +1 )
                console.log(y)
             }
            }>Sort (by created date)</button>
    
      button sort deadline 
            <button onClick={()=>
            {    
              tempList.current=tempList.current.sort((a,b)=> new Date(a.data.deadline) < new Date(b.data.deadline) ? -1 : +1 )
               console.log(tempList.current);
               setTodoList( tempList.current);
            }
            }>Sort (by deadline date)</button>
    </div> */}

                {/* each todo list container */}
                {todoList?.map((eachTodo, index) => {
                  return (
                    <div className={style.eachTodoContainer} key={eachTodo.id}>
                      <input
                        ref={inputRef}
                        defaultValue={eachTodo.activity}
                        readOnly={editable !== eachTodo.id}
                        className={style.inputActivity}
                        onChange={(event) => {
                          activityRef.current = event.target.value;
                        }}
                      />
                      {/* <span>{eachTodo.id}</span>  */}

                      <span>
                        created on {new Date(eachTodo.created).toLocaleString()}
                      </span>
                      <span>deadline is {eachTodo.deadline}</span>
                      <div>
                        {/* button edit */}
                        <button
                          className={style.editButton}
                          onClick={(event) => {
                            setEditable(eachTodo.id);
                            inputRef.current.focus();
                          }}
                        >
                          edit
                        </button>

                        {/* button delete */}
                        <button
                          className={style.editButton}
                          onClick={() => deleteDocId(eachTodo.id)}
                        >
                          delete
                        </button>

                        {/* button done */}
                        {editable === eachTodo.id ? (
                          <button
                            className={style.doneButton}
                            onClick={(event) => {
                              setEditable(false);
                              setEditable("null");
                              console.log(
                                "input value is ",
                                activityRef.current
                              );
                              const docRef = doc(db, "todo", eachTodo.id);
                              if (activityRef.current !== "") {
                                updateDoc(docRef, {
                                  activity: activityRef.current,
                                }).then(() => {
                                  console.log("updated doc");
                                  activityRef.current = "";
                                });
                              }
                            }}
                          >
                            Done
                          </button>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  ); // each todo container div
                })}
              </div>
            ) : (
              <div style={{ textAlign: "center", color: "white" }}>
                No todos have been loaded yet.../you haven't added any todos yet
              </div>
            )}
          </div>

          {/* add todo container  */}
          <div>
            {user !== null ? (
              <AddPost
                user={user}
                todoList={todoList}
                setTodoList={setTodoList}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </Stack>
  );
}

export default App;
