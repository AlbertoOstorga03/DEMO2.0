import { useState, useEffect } from 'react'
import './App.css'
import WorkerList from './WorkerList'
import WorkerForm from './WorkerForm'

function App() {
  const [workers, setWorkers] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentWorker, setCurrentWorker] = useState({})

  useEffect(() => {
    fetchWorkers()
  }, [])

  const fetchWorkers = async() => {
    const response = await fetch('http://127.0.0.1:5000/workers')
    const data = await response.json()
    setWorkers(data.workers)
    console.log(data.workers)
  };

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentWorker({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true)
    }
  }

  const openEditModal = (worker) => {
    if (isModalOpen) return
    setCurrentWorker(worker)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchWorkers()
  }

  return (
    <>
      <WorkerList workers={workers} updateWorker={openEditModal} updateCallback={onUpdate}/>
      <button onClick={openCreateModal}>Add New Worker</button>
      { isModalOpen && <div className='modal'>
        <div className='modal-content'>
          <span className='close' onClick={closeModal}>&times;</span>
          <WorkerForm existingWorker={currentWorker} updateCallback={onUpdate} />
        </div> 
      </div>
    }
    </>
  );
};

export default App
