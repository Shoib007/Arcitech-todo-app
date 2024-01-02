import { Kbd, Tooltip } from "flowbite-react";
import { MdDeleteForever } from "react-icons/md";
import { TiPencil } from "react-icons/ti";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import {useNavigate} from 'react-router-dom'
import api from "../utils/axiosinstance";
import ModelComponent, { ConfirmationModel, EditingModel } from "./Model";

const ToDo = () => {
    const { userInfo, isAuthenticated, setOpenModal, tasks, setTasks, setModelDel, setTaskId, taskId, setEditingModel } = useContext(UserContext);
    const redirect = useNavigate();

    const handleDeleteModel = (id) => {
        setTaskId(id);
        setModelDel(true);
    }

    const handleEditing = (id) => {
        setTaskId(id);
        setEditingModel(true);
    }

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
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        if(!isAuthenticated){
            redirect("/login");
        }
        FetchTasks();
    }, [])



    return (

        <div className="w-full h-full m-auto border">
            <h1 className="text-center text-4xl"> {` Hi ${userInfo?.first_name} ${userInfo?.last_name}`} </h1>

            <div className="flex flex-col justify-center items-center w-full my-4">
                <Tooltip content="Add Task">
                    <button className="px-4 py-2 bg-blue-600 rounded-lg text-white text-center" onClick={() => setOpenModal(true)}> Add Task </button>
                    <ModelComponent />
                    <ConfirmationModel id={taskId} />
                    <EditingModel/>
                </Tooltip>
            </div>

            <div className="w-[80%] m-auto h-[70%] overflow-y-auto ">
                {
                    tasks?.map(data => (
                        <div className="px-4 py-2 border rounded-lg mb-2 flex justify-between items-center" key={data.id}>
                            <div>
                                <h1 className=" font-semibold"> {data.title} </h1>
                                <p> {data.description} </p>
                            </div>

                            <div className="flex gap-4 items-center">
                                <Kbd className={`${data.status === 'PENDING' ? 'bg-orange-500' : 'bg-green-500 text-white'}`}> {data.status} </Kbd>

                                <Tooltip content="Edit Task">
                                    <TiPencil className=" cursor-pointer" onClick={() => handleEditing(data.id)}/>
                                </Tooltip>

                                <Tooltip content="Detele Task">
                                    <MdDeleteForever className=" cursor-pointer text-red-500 hover:text-red-700 transition" onClick={() => handleDeleteModel(data.id)} />
                                </Tooltip>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ToDo;