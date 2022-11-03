import React from 'react'
import style from './AddPost.module.css'
import {useRef} from 'react'
import {addDoc, collection} from 'firebase/firestore'
import {db} from '../Firebase-config'


function AddPost(props) {
  const activityRef = useRef();
  const  deadlineRef = useRef();
  const currentDate = new Date(); 
console.log(currentDate)
    const createPost=  () => {
        
        const todoCollectionRef = collection(db,'todo');
        addDoc (todoCollectionRef, 
          { owner : props.user.email, 
            activity: activityRef.current.value ,
            deadline: deadlineRef.current.value,
        created: currentDate.getTime(),
      isCompleted: false,
    isImportant: false}).then((data) => {
      console.log('added data is ', data)
      props.setTodoList((prevState)=> [...prevState,  { 
          id: data.id,
          owner : props.user.email, 
          activity: activityRef.current.value ,
          deadline: deadlineRef.current.value ,
      created: currentDate.getTime(),
      isCompleted: false,
      isImportant: false,   
   }
      ])
      console.log("todo added successfully")});

    } 
  return (
    <div className={style.mainContainer}>
        
<span className={style.title}  >Add a todo</span>
  
      <input ref={activityRef} className={style.inputActivity} name="activity" placeholder="enter your activity" />
      <input ref={deadlineRef} name="deadline" placeholder="enter deadline (dd-mm-yyyy"/>
      <button className={style.addButton} onClick={()=> createPost() }>add</button>
    </div>
  )
}

export default AddPost