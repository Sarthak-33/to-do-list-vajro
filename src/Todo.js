import React, {useState, useEffect} from 'react';
import './stylesheet.css';

// Using local storage here
const getLocalData = () =>{
  const lists = localStorage.getItem("mytodolist");
  if(lists){
    return JSON.parse(lists);
  } else {
    return [];
  }
}

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState();
  const [toggleBtn, setToggleBtn] = useState(false);

  // adding items to list
  const addItem = () => {
    if(!inputdata){
      alert("Please enter some data before trying to add it to the list.")
    } else if(inputdata && toggleBtn) {
      setItems(
        items.map((currElem) => {
          if(currElem.id === isEditItem){
            return {...currElem, name: inputdata}
          }
          return currElem;
        })
      );
      setInputData("");
      setIsEditItem();
      setToggleBtn(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      }
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  }

// editing items
  const editItem = (index) =>{
    const item_edit = items.find((currElem) => {
      return currElem.id ===index;
    });
    setInputData(item_edit.name);
    setIsEditItem(index);
    setToggleBtn(true);
  }

//  deleting items
  const deleteItem = (index) => {
    const updatedItem = items.filter((currElem) => {
      return currElem.id !== index;
    });
    setItems(updatedItem);
  }

  // deleting all itmes
  const removeAll = () => {
    setItems([]);
  }

  // adding items to local storage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <figcaption>Add your items to the list</figcaption>
          </figure>
          <div className="addItems">
            <input type="text" placeholder="Write a task"
              className="form-control"
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleBtn ? (<button className="btn" onClick={addItem}>Add</button>) :
            (<button onClick={addItem}>Add</button>)
            }
          </div>
          {/* Show our items */}
          <div className="showItems">
          {items.map((currElem, index) => {
            return (
              <div className="eachItem" key={currElem.id}>
              <h3>{currElem.name}</h3>
              <div className="todo-btn">
                <button className="btn" onClick={() => editItem(currElem.id)}>Edit</button>
                <button className="btn" onClick={() => deleteItem(currElem.id)}>Delete</button>
              </div>
            </div>
            )
          })}
          </div>
          <div>
            <div className="showItems">
              <button className="btn" data-sm-link-text="Remove All" onClick={removeAll}><span>Checklist</span></button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo;