import { useState, useEffect } from 'react'
import './App.css'
import WorkerList from './WorkerList'
import WorkerForm from './WorkerForm'


// ------------------------------------------------------------------- DECLARING STATES FOR EMERGENT WINDOWS
function App() {
  const [workers, setWorkers] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentWorker, setCurrentWorker] = useState({})

  useEffect(() => {
    fetchWorkers()
  }, [])

// ------------------------------------------------------------------- FETCHING WORKERS
  
  const fetchWorkers = async() => {
    const response = await fetch('http://127.0.0.1:5000/workers')
    const data = await response.json()
    setWorkers(data.workers)
    console.log(data.workers)
  };

// ------------------------------------------------------------------- MODALS CONFIGURATION
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

/*

On this section, I created a button that will open a modal window to add a new worker.
In case the worker is already created it will open a modal window to edit the worker.
Also it has a cross to close the modal window.

*/

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
