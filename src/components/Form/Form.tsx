import Form from "react-bootstrap/Form";
import "./Form.scss";
import Button from 'react-bootstrap/Button';

import { useTaskStore } from "../../store/taskStore";
import { useGoalStore } from "../../store/goalStore";
import { useMenuStore } from "../../store/menuStore";

import { useRef } from 'react';

type FormTaskAndGoalProps = {
  onAdd?: () => void
}

function FormTaskAndGoal({ onAdd }: FormTaskAndGoalProps) {

  const inputRefName = useRef<HTMLInputElement>(null);
const inputRefDescription = useRef<HTMLTextAreaElement>(null);
const inputRefDueDate = useRef<HTMLInputElement>(null);
const isActiveInMenu = useMenuStore((state) => state.menu.active);
const addTask = useTaskStore((state) => state.addTask);
const addGoal = useGoalStore((state) => state.addGoal);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const name = inputRefName.current?.value;
    const descripcion = inputRefDescription.current?.value;
    const dueDate = inputRefDueDate.current?.value;
    if (name && descripcion && dueDate) {
      if (isActiveInMenu === 'tasks'){
        addTask({ id: Date.now(), name, description, dueDate },)

      }
      if (onAdd) {
      onAdd()
    }
    
    
    }
  }

  return (
    <div className="space form-margin">
      <Form onSubmit={handleSubmit}>
        
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" ref={inputRefName} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control as="textarea" rows={3} ref ={inputRefDescription}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control type="date" ref={inputRefDueDate}/>
        </Form.Group>

        <Button type="submit" variant="info">
          Add Goal
        </Button>

      </Form>
    </div>
  )
}

export default FormTaskAndGoal
