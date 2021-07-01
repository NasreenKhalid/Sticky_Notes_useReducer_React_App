import React,{useState, useReducer} from 'react'
import './App.css';
import {v4 as uuid} from 'uuid'

const initialState = {
  lastNoteCreatedAt: null,
  totalNotes: 0,
  notes:[]
}

const notesReducer = (prevState, action) => {
  switch(action.type){
    case 'ADD_NOTE':
      const newNote = {
        lastNoteCreatedAt: new Date().toTimeString().slice(0,8),
        totalNotes:prevState.notes.length +1,
        notes:[...prevState.notes, action.payload]
      }
      // {console.log(newNote)}
      return newNote;
    

    case 'DELETE_NOTE':
      const deleteNote = {
        ...prevState,
        totalNotes: prevState.notes.length -1,
        notes: prevState.notes.filter(note=>note.id !== action.payload.id)

      }
      return deleteNote
    

    default:
    return prevState;
  }
}

function App() {

const [notesState, dispatch] = useReducer(notesReducer,initialState)
const [noteText, setNoteText] = useState('')

const addNote = (e) => {
e.preventDefault();

if(!noteText){
  return;
}

const newNote = {
  id: uuid(),
  text: noteText,
  rotate: Math.floor(Math.random()*20)
}

dispatch({ type:'ADD_NOTE', payload:newNote})
setNoteText('')
}

const dropNote = (e) => {
e.target.style.left = `${e.pageX - 50}px`;
e.target.style.top = `${e.pageY - 50}px`;
}

const dragOver = (e) => {
  e.stopPropagation();
  e.preventDefault();
}

const deleteNote = (id) => {
  console.log('delete')
dispatch({ type:'DELETE_NOTE', payload: id})
}

  return (
  <div className="App" onDragOver={dragOver}>
 <h1 className="title">Sticky Notes React App</h1>
 
<div className="form">
  {notesState.notes.length > 0 && (
  <h3 className="note-length">My Notes ({notesState.notes.length})<p>last note: {notesState.lastNoteCreatedAt}</p></h3> )}

<form className="main-form" onSubmit={addNote}>
<textarea placeholder="Add Note" 
value={noteText}
onChange={(e)=>setNoteText(e.target.value)}
></textarea>
<button>Add</button>
  </form>

</div>


{console.log('My notes', notesState.notes)}
{/* Display the added notes */}
{notesState.notes.map((note)=> (
  <div className="note"
  style={{transform:`rotate(${note.rotate}deg)`}}
  key={note.id}
  draggable="true"
  onDragEnd={dropNote}
  >
   <h2 className="text">{note.text}</h2> 
  <button className="delete-btn" onClick={()=>deleteNote(note)}>X</button>
    </div>
  
))}
    </div>
  );
}

export default App;