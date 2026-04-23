import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Item.scss';
import { useTaskStore } from '../../store/goalStore';
import { useGoalStore} from '../../store/goalStore';
import { useMenuStore } from '../../store/menuStore';
import type { task } from  '../../store/taskStore';
import type { goal } from '../../store/goalStore';
import { useTransition } from 'react';
import { useTaskStore } from '../../store/taskStore'
import { useGoalStore } from '../../store/goalStore'
import { useMenuStore } from '../../store/menuStore'
const {removeTask} = useTaskStore.getState();
const {removeGoal} = useGoalStore.getState();



function Item(props: task | goal) {

    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if(isActiveInMenu === 'tasks'){
            removeTask(props as task);
        } else {
            removeGoal(props as goal);
        }
    } 


  return (
    <Card >
        <Card.Body>
            <Card.Title >{props.name}</Card.Title>
            <Card.Text className="fw-bold">
                Descripcion 
                </Card.Text>
                <Card.Text>
            {props.descripcion}
        </Card.Text>
                <Card.Text className="fw-bold">
                    Fecha de Vencimiento
                    </Card.Text>
                <Card.Text>
                    {props.dueDate}
                    </Card.Text>
                    </Card.Body>
                    <Card.Body>
                        <Button onClick={ (e) => handleRemove(e)}>Eliminar</Button>
                        </Card.Body>
                        <Card.Body>
                            <Button>Eliminar</Button>
                            </Card.Body>

    </Card>
  );
}

export default Item;