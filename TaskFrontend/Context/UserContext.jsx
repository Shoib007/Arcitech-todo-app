import { createContext, useState } from "react";

export const UserContext = createContext(null);

const UserContextProvider = ({children}) => {
    const [isLoadig, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modelDel, setModelDel] = useState(false);
    const [tasks, setTasks] = useState([])
    const [taskId, setTaskId] = useState();
    const [editingModel, setEditingModel] = useState(false);

    return (
        <UserContext.Provider value={{isLoadig, setIsLoading, userInfo, setUserInfo, isAuthenticated, setIsAuthenticated, openModal, setOpenModal, tasks, setTasks, setModelDel, modelDel, taskId, setTaskId, editingModel, setEditingModel}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;