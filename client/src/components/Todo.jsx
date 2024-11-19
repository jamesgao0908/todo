import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import styled from 'styled-components';
import { service_getTodo, service_addTodo, service_deleteTodo } from '../services/services';
// import CircularProgress from '@mui/material/CircularProgress';

const StyledInputDiv = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 5px;
`;

const Todo = ()=>{ 
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handleValueInput = () => {
    service_addTodo(todo)
      .then((res)=>{
        if (res.data.successfully) {        
          setTodos((prevTodos) => [...prevTodos, res]); 
          setTodo('');
          setTodos(res.data.todos)
        }
      })
      .catch((err)=>{
        console.error('Error adding todo:', err);
        throw err;
      })
  };

  const handleValueChange = (e)=>{
    setTodo(e.target.value);
  }
  const handleInputKeydown = (e)=>{
    if (e.key === 'Enter')
      handleValueInput()
  }
  const handleRemoveTodo = (e)=>{
    service_deleteTodo(e)
      .then((deleteTodo)=>{
        if (deleteTodo.data.successfully) {        
          setTodos(deleteTodo.data.todos)
        }
      })
      .catch(error=>{
        console.error('Error delete todo:', error);
      })

  }
  useEffect(() => {
    service_getTodo()
      .then((res)=>{
        if(!!res){
          setTodos(res);
        }else(
          console.log("no data")
        )
      })
      .catch(err=>{
        console.error(err);
        throw err
      })
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
            {(todos.length === 0) && (<TableRow> <TableCell colSpan={6}>no records found</TableCell> </TableRow> )}        
            {
              todos.map((result, index) => (
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