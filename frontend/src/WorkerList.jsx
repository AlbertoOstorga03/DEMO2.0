import React from "react"

const WorkerList = ({workers, updateWorker, updateCallback}) => {
    const onDelete = async (id) => {
        try {
            const options = {
                method: 'DELETE'
            }
            const response = await fetch(`http://127.0.0.1:5000/delete/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            } else {
                console.error("Failed to delete worker")
            }
        } catch (error) {
            alert(error)
        }
    }

    return <div>
        <h2>Workers CRUD DEMO 2.0</h2>
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {workers.map((worker) => (
                    <tr key={worker.id}>
                        <td>{worker.firstName}</td>
                        <td>{worker.lastName}</td>
                        <td>{worker.email}</td>
                        <td>
                            <button onClick={() => updateWorker(worker)}>Update</button>
                            <button onClick={() => onDelete(worker.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default WorkerList