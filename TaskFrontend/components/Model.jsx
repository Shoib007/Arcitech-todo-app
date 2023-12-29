import { Button, Checkbox, Label, Modal, Select, TextInput, Textarea } from 'flowbite-react';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../Context/UserContext';
import api from '../utils/axiosinstance';

function ModelComponent() {
    const { openModal, setOpenModal, setTasks, editing, setEditing, taskId } = useContext(UserContext);

    const [taskData, setTaskData] = useState({
        title: "", description: "", status: "PENDING"
    });

    console.log(taskData);

    function onCloseModal() {
        setOpenModal(false);
        setTaskData({ title: "", description: "", status: "PENDING" })
    }

    const handleForm = (e) => {
        setTaskData({
            ...taskData, [e.target.name]: e.target.value
        })
    }


    // Fetch All tasks ...................

    const FetchTasks = async () => {
        await api({
            method: "GET",
            url: "/task/data/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        }).then(response => {
            setTasks(response.data);
            setOpenModal(false);
        }).catch(err => {
            console.log(err);
        })
    }


    //Add Task ............................

    const AddTask = async () => {
        await api({
            method: "POST",
            url: "/task/data/",
            data: taskData,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            FetchTasks();
            setTaskData({ title: "", description: "", status: "PENDING" });
        }).catch(err => {
            console.log(err);
        })
    }

    //Update Task Data by ID ..................

    const UpdateTaskById = async () => {
        await api({
            method: "PUT",
            url: `task/${id}/`,
            data: taskData,
        }).then(response => {
            console.log(response.data);
            FetchTasks();
            setEditing(false);
        }).catch(err => {
            console.log(err);
        })
    }


    // Fetch data by ID .......................

    const FetchTaskById = async (id) => {
        await api({
            method: "GET",
            url: `task/${id}/`,
        }).then(response => {
            console.log(response.data);
            setTaskData(response.data);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        if (editing) {
            FetchTaskById(taskId);
            setEditing(false);
        }
    }, [editing])



    return (
        <>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add Task</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="task" value="Title" />
                            </div>
                            <TextInput
                                id="task"
                                name='title'
                                value={taskData.title}
                                placeholder="Task Title"
                                onChange={handleForm}
                                required
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="description" value="Description" />
                            </div>
                            <Textarea id='description' name='description' value={taskData.description} placeholder='Task Descriptionn' onChange={handleForm} />
                        </div>

                        {editing && (
                            <div className="max-w-md">
                                <div className="mb-2 block">
                                    <Label htmlFor="status" value="Select Status" />
                                </div>
                                <Select id="status" name='status' onChange={handleForm} value={taskData.status} required>
                                    <option>PENDING</option>
                                    <option>COMPLETED</option>
                                </Select>
                            </div>
                        )
                        }
                        <div className="w-full">
                            <Button onClick={() => AddTask()}> Add Task </Button>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModelComponent;


export const ConfirmationModel = () => {
    const { modelDel, setModelDel, taskId, setTasks } = useContext(UserContext);

    const FetchTasks = async () => {
        await api({
            method: "GET",
            url: "/task/data/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        }).then(response => {
            setTasks(response.data);
            setModelDel(false);
        }).catch(err => {
            console.log(err);
        })
    }


    const handleDelete = () => {
        api({
            method: 'DELETE',
            url: `task/${taskId}/`
        }).then(response => {
            FetchTasks();
        })
    }

    return (
        <Modal show={modelDel} onClose={() => setModelDel(false)}>

            <Modal.Header>Do You Want to Delete?</Modal.Header>

            <Modal.Footer>
                <Button color='failure' onClick={() => handleDelete()}> Delete </Button>
                <Button onClick={() => setModelDel(false)}> Cancle </Button>
            </Modal.Footer>

        </Modal>
    )
}


export function EditingModel() {
    const { setTasks, taskId, editingModel, setEditingModel } = useContext(UserContext);

    const [taskData, setTaskData] = useState({
        title: "", description: "", status: "PENDING"
    });

    console.log(taskData);

    function onCloseModal() {
        setEditingModel(false);
        setTaskData({ title: "", description: "", status: "PENDING" })
    }

    const handleForm = (e) => {
        setTaskData({
            ...taskData, [e.target.name]: e.target.value
        })
    }


    // Fetch All tasks ...................

    const FetchTasks = async () => {
        await api({
            method: "GET",
            url: "/task/data/",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        }).then(response => {
            setTasks(response.data);
            setOpenModal(false);
        }).catch(err => {
            console.log(err);
        })
    }


    //Update Task Data by ID ..................

    const UpdateTaskById = async () => {
        await api({
            method: "PUT",
            url: `task/${taskId}/`,
            data: taskData,
        }).then(response => {
            console.log(response.data);
            FetchTasks();
            setEditingModel(false);
        }).catch(err => {
            console.log(err);
        })
    }


    // Fetch data by ID .......................

    const FetchTaskById = async (id) => {
        await api({
            method: "GET",
            url: `task/${id}/`,
        }).then(response => {
            console.log(response.data);
            setTaskData(response.data);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        FetchTaskById(taskId);
    }, [taskId])



    return (
        <>
            <Modal show={editingModel} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white"> Edit Task </h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="task" value="Title" />
                            </div>
                            <TextInput
                                id="task"
                                name='title'
                                value={taskData.title}
                                placeholder="Task Title"
                                onChange={handleForm}
                                required
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="description" value="Description" />
                            </div>
                            <Textarea id='description' name='description' value={taskData.description} placeholder='Task Descriptionn' onChange={handleForm} />
                        </div>

                        <div className="max-w-md">
                            <div className="mb-2 block">
                                <Label htmlFor="status" value="Select Status" />
                            </div>
                            <Select id="status" name='status' onChange={handleForm} value={taskData.status} required>
                                <option>PENDING</option>
                                <option>COMPLETED</option>
                            </Select>
                        </div>

                        <div className="w-full">
                            <Button onClick={() => UpdateTaskById()}> Add Task </Button>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

