
import './App.css';
import React, { useState } from 'react'


const App = () => {
  const[noteTitle, setnoteTitle] = useState('') ;
  const [noteContent, setnoteContent] = useState([]) ;
  const[editMode, seteditMode] = useState(false);
  const[editableNote, seteditableNote] =useState(null) ;
  const[selectedFilter, setselectedFilter] = useState('All');
  
  const[tempNotes, settempNotes] = useState([]);
  const addNoteHandler = (e)=>{
    if(!noteTitle){
      return alert('Please enter valid title') ;
    }
    e.preventDefault() ;
    const newNote = {
      id : Date.now() ,
      content : noteTitle,
      isCompleted : false,
      
    };
    setnoteContent([...noteContent, newNote])
    setnoteTitle('');

  }

  const isCompleteHandler = (id)=>{
      
      const isCompletedNoteArray = noteContent.map((item)=>{
        if(item.id===id){
          if(item.isCompleted){
            item.isCompleted= false
            
          }else if(!item.isCompleted){
            item.isCompleted = true
          }
          
        }
        return item ;
    })
  
  setnoteContent(isCompletedNoteArray);
         
  const temporaryNotes = noteContent.map(item =>{
    return item ;
  })
  settempNotes(temporaryNotes);
  
}


   const editnoteHandler = (id) =>{
     seteditMode(true);
     const tobeUpdatedNotes =noteContent.find(item=> item.id===id)
     seteditableNote(tobeUpdatedNotes)
     setnoteTitle(tobeUpdatedNotes.content)
  }

  const updatenoteHandler= (e) =>{
    e.preventDefault();
    const updatedNoteArray = noteContent.map(item=>{
      if(item.id===editableNote.id){
        item.content = noteTitle
      }
      return item ;
    })
    setnoteContent(updatedNoteArray);
    seteditMode(false);
    setnoteTitle('') ;

  }
    const deletenoteHandler = (id)=>{
      const deletedNotes = noteContent.filter(item=> item.id !== id)
      setnoteContent(deletedNotes)
    }

    const handleselectedFilter = (e)=>{
      e.preventDefault();
      const currentFilter= e.target.value ;
      
      const completedNotes = tempNotes.filter(item => item.isCompleted === true);
      const incompletedNotes = tempNotes.filter(item => item.isCompleted === false);
      const allNotes = tempNotes.filter(()=>true);
      // console.log(completedNotes)
      // console.log(incompletedNotes)

      if(currentFilter==='Completed'){
        setnoteContent(completedNotes);
        
      }
      else if(currentFilter==='Incompleted'){
        setnoteContent(incompletedNotes);
      }
      else if(currentFilter==='All'){
          setnoteContent(allNotes);
      }
      
    }

  return (
    <div className='noteApp'>
      
      <form onSubmit={editMode? updatenoteHandler: addNoteHandler}>
      <input type="text" value={noteTitle} onChange={(event)=>setnoteTitle(event.target.value)}/>
      <button type="submit">{editMode? 'Update Note' : 'Create Note'}</button>
      </form>
      <label htmlFor="notefilter">Filter the notes :</label>
      <select value={selectedFilter} name="notefilter"  onChange={(event)=>{setselectedFilter(event.target.value); handleselectedFilter(event)}}>
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Incompleted">Incompleted</option>

      </select>

      <ul>
        {noteContent.map(item => (
          
          <li key={item.id}>
            <input type="checkbox" name="completed" id={item.id} checked ={item.isCompleted? 'checked' : ''} onChange={()=>isCompleteHandler(item.id)} />
            <label htmlFor={item.id}>Completed </label>
              {item.content}
            <button onClick={()=>editnoteHandler(item.id)}>Edit</button>
            <button onClick={()=>deletenoteHandler(item.id)}>Delete</button>
          </li>
        ))}
      </ul>

      
    </div>



  )
}

export default App; 


