import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import styled from 'styled-components';
import { service_getTodo, service_addTodo, service_deleteTodo } from '../services/services'

const StyledInputDiv = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 5px;
`;


const Todo = ()=>{ 
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handleValueInput = async () => {
    try {
      const addedTodo = await service_addTodo(todo); 
      if (addedTodo.data.successfully) {        
        setTodos((prevTodos) => [...prevTodos, addedTodo]); 
        setTodo('');
        setTodos(addedTodo.data.todos)
      }
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleValueChange = (e)=>{
    setTodo(e.target.value);
  }
  const handleInputKeydown = (e)=>{
    if (e.key === 'Enter')
      handleValueInput()
  }
  const handleRemoveTodo = async (e)=>{
    try{
      const deleteTodo = await service_deleteTodo(e);
      if (deleteTodo.data.successfully) {        
        setTodos(deleteTodo.data.todos)
      }
    } catch (error) {
      console.error('Error delete todo:', error);
    }
  }

  useEffect(() => {
    const fetchTodoData = async () => {
      try {
        const todoData = await service_getTodo();
        if (todoData) {
          setTodos(todoData);
        } else {
          console.log('No data received');
        }
      } catch (err) {
        console.error('Error fetching todos:', err);
      }
    };
    fetchTodoData();
  }, []);

  return (
    <>
      <h1 align="left">Todo List</h1>
      <TableContainer>
        <Table sx={{ maxWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell> ID </TableCell>
              <TableCell align="left">Detail</TableCell>
              <TableCell align="right">Operation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((result, index) => (
              <TableRow  key={index}  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{result.id}</TableCell>
                <TableCell align="left">{result.value}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="error" onClick={()=>handleRemoveTodo(result.id)}>Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <StyledInputDiv>
        <input value={todo} onChange={handleValueChange} onKeyDown={handleInputKeydown}></input>
        <button variant="outlined" onClick={handleValueInput}>Add</button>
      </StyledInputDiv>
      
    </>
  );
}

export default Todo;