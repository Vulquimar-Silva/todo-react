import { useState } from 'react';
import { BsPlusCircle } from "react-icons/bs";
import { v4 as uuidv4 } from 'uuid';
import Modal from 'react-modal';

import { Modals } from '../../components/Modals';

import imgLogo from '../../assets/img/png/Logo.png';
import imgClipboard from '../../assets/img/png/Clipboard.png';
import imgTrash from '../../assets/img/png/Trash.png';

import "./styles.scss";

interface Tasks {
  id: number | string;
  title: string;
  isCompleted: boolean;
}

Modal.setAppElement("#root")

export function Home() {

  const [task, setTask] = useState<Tasks[]>([])
  const [newTask, setNewTask] = useState<string | any>('')
  const [modalIsOpenEmpty, setIsOpenEmpty] = useState(false);

  function handleTaskAdd() {

    if ((newTask) === "") {
      return handleOpenModal()
    }

    const newTasks: Tasks = {
      id: uuidv4(),
      title: newTask,
      isCompleted: false
    }

    setTask([...task, newTasks]);
    setNewTask('');
  }

  function handleToggleTaskCompletion(id: number | string) {
    const newTasks = task.map(task => {
      if (task.id === id) {
        task.isCompleted = !task.isCompleted;
      }
      return task;
    })
    setTask(newTasks);
  }

  const countTaskCompleted = task.filter(task => task.isCompleted).length
  const countTaskCreated = task.map((item: any) => {
    if (item === 0) {
      return true;
    } else {
      return false;
    }
  }).length

  const handleTaskRemove = (nameTask: any) => setTask(prevState => prevState.filter(task => task !== nameTask))

  function handleOpenModal() {
    setIsOpenEmpty(true);
  }

  function handleCloseModal() {
    setIsOpenEmpty(false);
  }

  return (
    <section>
      <header className="container">
        <img src={imgLogo} className="logo" />
        <div className='form'>
          <input
            type="text"
            autoFocus
            placeholder="Adicione uma nova tarefa."
            value={newTask}
            onChange={event => setNewTask((event.target.value))} />
          <button onClick={handleTaskAdd} >
            <span>Criar</span>
            <BsPlusCircle className='alignIconBtn' />
          </button>
        </div>
        <Modals isOpen={modalIsOpenEmpty} onRequestClose={handleCloseModal} />
      </header>

      <div className="alignStatusLine">
        <div className="statusTasks">
          <span className="textCreate">Tarefas criadas
            <span className="numberTaskAccountCompleted">
              {countTaskCreated}
            </span>
          </span>
          {countTaskCreated === 0 ? (
            <span className="textConcluded">Concluídas
              <span className="numberTaskAccountCreated">
                {countTaskCreated}
              </span>
            </span>
          ) : (
            <span className="textConcluded">Concluídas
              <span className="ifCompleted">
                {countTaskCompleted} de {countTaskCreated}
              </span>
            </span>
          )}
        </div>
        <p className='linha-horizontal'></p>
        {
          countTaskCreated === 0 ? (
            <div className='noList'>
              <div className="clipboard">
                <img src={imgClipboard} />
              </div>
              <h3 className="listTaskText1">
                Você ainda não tem tarefas cadastradas
              </h3>

              <h4 className="listTaskText2">
                Crie tarefas e organize seus itens a fazer
              </h4>
            </div>
          ) : (
            <div className='listItem'>
              {task.map((task) => (
                <div className='todo-row' key={task.id}>
                  <div>
                    <input
                      type="checkbox"
                      className='checkbox'
                      readOnly
                      checked={task.isCompleted}
                      onClick={() => handleToggleTaskCompletion(task.id)}
                    />
                    <label htmlFor="styled-checkbox">{task.title}</label>
                  </div>
                  <div>
                    <i onClick={() => handleTaskRemove(task)}>
                      <img src={imgTrash} />
                    </i>
                  </div>
                </div>
              ))}
            </div>
          )
        }
      </div>
    </section>
  )
}
