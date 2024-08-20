import {useState} from 'react'

const WorkerForm = ({ existingWorker = {}, updateCallback}) => {
    const [firstName, setFirstName] = useState(existingWorker.firstName || '')
    const [lastName, setLastName] = useState(existingWorker.lastName || '')
    const [email, setEmail] = useState(existingWorker.email || '')

    const updating = Object.entries(existingWorker).length !== 0

    const onSubmit = async(e) => {
        e.preventDefault()

        const data = {
            firstName, 
            lastName, 
            email
        }
        const url = 'http://127.0.0.1:5000/' + (updating ? `update/${existingWorker.id}` : 'create')
        const options = {
            method: updating ? 'PATCH' : 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallback()
        }
    }


    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor='First Name'>First Name</label>
                <input type='text' 
                id='firstName' 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor='Last Name'>Last Name</label>
                <input type='text' 
                id='lastName' 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor='email'>Email</label>
                <input type='text' 
                id='email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button type='submit'>{updating ? "Update Contact" : "Create Contact"}</button>
        </form>
    );
};

export default WorkerForm 