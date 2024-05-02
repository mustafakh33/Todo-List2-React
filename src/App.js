import { useEffect, useRef, useState } from 'react';
import './App.css';
import  'bootstrap/dist/css/bootstrap.min.css'
function App() {
  
  // to get the data from localStorage
  const getLocalStorage = ()=>{
    let list = localStorage.getItem('list');
    if(list){
      return JSON.parse(localStorage.getItem('list'))
    } else{
      return [];
    }
  }

  const [todos, settodos] = useState(getLocalStorage())
  const inputRef = useRef()
  

  const AddTODo = ()=>{
    if(inputRef.current.value !== ''){
      const valueInput = inputRef.current.value;
      const newvalueInput = {completed:false,valueInput}
      settodos([...todos, newvalueInput])
      inputRef.current.value ='';
    }
  }

  // Add data to localStorage
  useEffect(()=>{
  localStorage.setItem('list',JSON.stringify(todos))
  },[todos])

  const ItemTDone = (index)=>{
    const newtodos = [...todos]
    newtodos[index].completed = !newtodos[index].completed;
    settodos(newtodos);
  }
 
  const deleteItem = (index)=>{
    const newtodos = [...todos]
    newtodos.splice(index,1)
    settodos(newtodos)
  }


  return (
    <div className="App">
    <h2>To DO List</h2>
    <div className="to-do-container">
    <ul>
        {todos.map(({completed,valueInput},index)=>{
        return <div className='list' key={index}>
          <li className={completed? 'done':''} onClick={()=>ItemTDone(index)}>{valueInput}</li>
          <button  type="button" className="btn-close" aria-label="Close" onClick={()=>deleteItem(index)}></button>
        </div>
        })}
    </ul>
    <input ref={inputRef} type="text" className='form-control' placeholder='Enter Item...' />
    <button onClick={AddTODo} type="button" className="btn btn-info mt-3">ADD</button>
    </div>
    </div>
  );
}

export default App;
