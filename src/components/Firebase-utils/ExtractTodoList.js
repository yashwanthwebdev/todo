import React, { useEffect, useLayoutEffect } from 'react'
import {collection} from 'firebase/firestore'
import {db} from './Firebase-config'
import {getDocs, query, where , deleteDoc} from 'firebase/firestore'
import {useState, useRef} from 'react'
import style from './ExtractTodoList.module.css';
import { ConsoleSqlOutlined } from '@ant-design/icons'

 
function ExtractTodoList(props) {
    // const [toDosList, setToDosList] = useState(null);
  //  const [todoList, setTodoList] = useState(null);
   
  
        useEffect( ()=> {
          extractToDos();
          console.log("inside")
         },[])

        const extractToDos = async() => {
          console.log("user is ", props.user.email)
          const todoCollectionRef = collection(db,'todo');
        const userDataQuery = query(todoCollectionRef, where("owner","==",props.user.email));
          await getDocs(userDataQuery)
        .then( (response) => {
          // console.log("todo docs is ", response.docs );
          const tempTodoList = response.docs.map( (element,index) => {
            console.log(element.data().created);
            // return {data:element.data(), id:element.id} } )
            return {
              activity: element.data().activity,
              id:element.id,
              created: element.data().created,
              deadline: element.data().deadline,
              isCompleted: false,
              isImportant:  false,
              owner : element.data().owner 
              } } )
         
           
          const sortedList = tempTodoList.sort((a,b)=> new Date(a.created) < new Date(b.created) ? -1 : +1 );
          props.setTodoList(sortedList);
          console.log('sorted list is ', sortedList);
        }) 
        .catch ((error) => {
          console.log("error is ", error);
        }) }

  return (
    <></>
  )
}

export default ExtractTodoList