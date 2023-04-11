import React, { useRef } from 'react'
import "./styles.css";

// define type
interface Props {
    todo:string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd : (e:React.FormEvent) => void;
}

const InputField:React.FC<Props> = ({todo,setTodo,handleAdd}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form className='input' 
      onSubmit={(e)=>{handleAdd(e);
      inputRef.current?.blur()
      }}>
        <input type = "input"
         ref= {inputRef}
         placeholder='Enter a task' 
         className='inputBox' 
         value = {todo}
         onChange={(e)=>setTodo(e.target.value)}
         />
        <button className='inputSubmit' type='submit'>Go</button>
    </form>
  );
};

export default InputField;
