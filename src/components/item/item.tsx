import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Item.scss';

import { useTaskStore } from '../../store/taskStore';
import { useGoalStore } from '../../store/goalStore';
import { useMenuStore } from '../../store/menuStore';

import type { task } from '../../store/taskStore';
import type { goal } from '../../store/goalStore';

import { useTransition } from 'react';

function Item(props: task | goal) {


    const removeTask = useTaskStore(state => state.removeTask);
    const removeGoal = useGoalStore(state => state.removeGoal);
    const isActiveInMenu = useMenuStore(state => state.isActiveInMenu);

    const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (isActiveInMenu === 'tasks') {
            removeTask(props as task);
        } else {
            removeGoal(props as goal);
        }
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>

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
                <Button onClick={handleRemove}>Eliminar</Button>
            </Card.Body>
        </Card>
    );
}

export default Item;
