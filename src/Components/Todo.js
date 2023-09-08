import React,{useState, useEffect} from 'react'
import icon from '../Images/icon.png'
import '../App.css'


const Todo = () => {

    // To get data from the local storage
    const getLocalItems =()=>{
        let list = localStorage.getItem('lists')
        if(list){
            return JSON.parse(localStorage.getItem('lists'));
            }
        else{
            return [];
            }
        }
      
    const[inputData, setInputData] = useState("");
    const[item, setItem] = useState(getLocalItems())
    const[toggleSubmit, setToggleSubmit] = useState(true);  
    const[isEditItem, setIsEditItem] = useState(null);

    const addItems = () =>{
        if(!inputData){
            alert("Please add items")
        }
        else if(inputData && !toggleSubmit){
            setItem(
                item.map((elem)=>{
                    if(elem.id === isEditItem){
                        return {...elem, name: inputData}
                    }
                    return elem;
                })
            )
            setToggleSubmit(true);
            setInputData("");
            setIsEditItem(null);
        }
        else{
            const allInputData = { id: new Date().getTime().toString(), name:inputData}
            setItem([...item, allInputData])
            setInputData('')
        }
    }

    // delete items

    const deleteItem=(index)=> {
        const updatedItem = item.filter((elem)=>{
            return index !== elem.id;
        })

        setItem(updatedItem);
    }

    // Edit item

    const editItem = (id) => {
        let newEditItem = item.find((elem)=>{
            return elem.id === id;
        })
        setToggleSubmit(false);
        setInputData(newEditItem.name);
        setIsEditItem(id);
    }

    // remove all

    const removeAll = () => {
        setItem([]);
    }

    // Add items to local storage
    useEffect(()=>{
        localStorage.setItem('lists', JSON.stringify(item))
    },[item])

  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
            <figure>
                <img src={icon} alt="Todo list icon" />
                <figcaption>Add Your List Here ✍️</figcaption>
            </figure>

            <div className='addItems'>
                <input type="text" placeholder='✍️ Add Items ...' 
                    value={inputData}
                    onChange={(e)=>setInputData(e.target.value)}
                />
                {
                    toggleSubmit ? <i className="fa-solid fa-plus add-btn" title='Add Items' onClick={addItems}></i>:
                     <i className="fa-solid fa-edit add-btn" title='Update Item' onClick={addItems}></i>
                }
            </div>

            <div className='show-items'>
            {
                item.map((elem)=>{
                    return(
                        <div className='each-item' key={elem.id}>
                        <h4>{elem.name}</h4>
                            <div className='btns'>
                                <i className="fa-solid fa-edit edit-item" title='Edit Item' onClick={()=>editItem(elem.id)}></i>
                                <i className="fa-solid fa-trash delete-item" title='Delete Item' onClick={()=>deleteItem(elem.id)}></i>
                            </div>
                        </div>
                    )
                })
            }
            </div>

            <div className='show-items'>
                <button className='remove-btn' onClick={removeAll}>Remove all</button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Todo
