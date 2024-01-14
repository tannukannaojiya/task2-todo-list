
import './App.css';
import React, {useState, useEffect} from 'react';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaCheckDouble } from "react-icons/fa6";

function App() {
  const [isToggleBtn, setIsToggleBtn] = useState(false);
  const [allToDo, setAllToDo] = useState([]);
  const [titleToDo, setTitleToDo] = useState('');
  const [descriptionToDo, setDescriptionToDo] = useState('');
  const [completedTodo, setCompletedTodo] = useState('');
  

  const handleAddTodo = ()=>{
    let newTodoItem ={
      title : titleToDo,
      description : descriptionToDo
    }

    let updatedTodo = [...allToDo];
    updatedTodo.push(newTodoItem);
    setAllToDo(updatedTodo);
    localStorage.setItem('todolist', JSON.stringify(updatedTodo));
  }
  useEffect(()=>{
    let saveTodo = JSON.parse(localStorage.getItem('todolist'));
    let saveCompleted = JSON.parse(localStorage.getItem('completedTodos'));
    if(saveTodo){
      setAllToDo(saveTodo);
    }
    if(saveCompleted){
      setCompletedTodo(saveCompleted);
    }
  },[]);

  const handleDleteTodo=(index)=>{
    let reducedTodo = [...allToDo];
    reducedTodo.splice(index, 1);
    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setAllToDo(reducedTodo);
  }

  const handleCompleteTodo = (index)=>{
    const date = new Date ();
    var dd = date.getDate ();
    var mm = date.getMonth () + 1;
    var yyyy = date.getFullYear ();
    var hh = date.getHours ();
    var minutes = date.getMinutes ();
    var ss = date.getSeconds ();
    var finalDate =
      dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + minutes + ':' + ss;

      let filterItem = {
        ...allToDo[index],
        completedOn:finalDate,
      }
      let completedArr = [...completedTodo];
      completedArr.push(filterItem);
      setCompletedTodo(completedArr);
      handleDleteTodo(index);
      localStorage.setItem('completedTodos', JSON.stringify(completedArr));
  }

  const handleDleteCompletedTodo = (index)=>{
    let reducedTodo = [...completedTodo];
    reducedTodo.splice(index, 1);
    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodo(reducedTodo);

  }


  return (
    <div className="App">
    <h2>To-Do List</h2>
    <div className='todo-wrapper'>
      <div className='todo-input'>
        <div className='todo-input-item'>
          <label>Title</label>
          <input type='text' value={titleToDo} onChange={(e)=>setTitleToDo(e.target.value)} placeholder="What's the task title?"/>
        </div>
        <div className='todo-input-item'>
          <label>Description</label>
          <input type='text' value={descriptionToDo} onChange={(e)=>setDescriptionToDo(e.target.value)} placeholder="What's the task description?"/>
        </div>
        <div className='todo-input-item'>
         <button type='button' onClick={handleAddTodo} className='primaryBtn'>Add</button>
        </div>
      </div>
      <div className='btn-area'>
        <button className={`secondaryBtn ${isToggleBtn === false && 'active'}`} onClick={()=>setIsToggleBtn(false)}>Todos</button>
       
        <button className={`secondaryBtn ${isToggleBtn === true && 'active'}`} onClick={()=>setIsToggleBtn(true)}>Completed</button>
      </div>
      <div className="todo-list">
       {isToggleBtn === false && allToDo.map((item, index)=>{
        return(
          <div className='todo-list-item' key={index}>
          <div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          </div>
          <div>
        <RiDeleteBin6Fill className='icon' onClick={()=>handleDleteTodo(index)} title='Delete?'/>
        <FaCheckDouble className='cheak-icon' onClick={()=>handleCompleteTodo(index)} title='Complete?'/>
        </div>
        </div>
        )
       })}

       {isToggleBtn === true && completedTodo.map((item, index)=>{
        return(
          <div className='todo-list-item' key={index}>
          <div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p><small>Completed On:{item.completedOn}</small></p>
          </div>
          <div>
        <RiDeleteBin6Fill className='icon' onClick={()=>handleDleteCompletedTodo(index)} title='Delete?'/>
      
        </div>
        </div>
        )
       })}
       
       
      </div>

    </div>

    </div>
  );
}

export default App;
