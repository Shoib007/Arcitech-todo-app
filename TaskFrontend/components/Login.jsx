import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react';
import { useContext, useEffect, useState } from 'react';

import api from '../utils/axiosinstance';
import { UserContext } from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [LoginDetail, setLoginDetail] = useState({
        email: "", password: ""
    });
    const {setUserInfo, setIsAuthenticated} = useContext(UserContext);
    const redirect = useNavigate();

    console.log(LoginDetail);
    
    const handleForm = (e) => {
        setLoginDetail({
            ...LoginDetail,
            [e.target.name]: e.target.value
        })
    }

    const FetchUserInfo = async (access_token) => {
        await api({
            method: 'GET',
            url:"/task/login/",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token
            }
        }).then(response => {
            setIsAuthenticated(true);
            console.log(response.data);
            setUserInfo(response.data);
            redirect("/");
        }).catch(err => {
            console.log(err);
        })
    }


    const LoginHandler = async (e) => {
        e.preventDefault();
        api(
            {
                method: 'POST',
                url: '/token/',
                data: LoginDetail,
                headers:{
                    "Content-Type": "application/json",
                }
            }
        ).then(response => {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            FetchUserInfo(response.data.access);

        }).catch(err => {
            console.log(err);
        })
    }


    useEffect(() => {

    }, [])

    return (
        <div className='flex w-full h-full justify-center items-center'>
            <Card className="p-8 font-semibold">
                <h1 className='text-4xl'> To-Do App Login </h1>
                <form className="flex flex-col gap-4" onSubmit={LoginHandler}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Your email" />
                        </div>
                        <TextInput id="email1" type="email" name='email' placeholder="name@example.com" autoComplete='username' required autoFocus onChange={handleForm} />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password1" value="Your password" />
                        </div>
                        <TextInput id="password1" name='password' type="password" placeholder='Password' autoComplete='current-password' required onChange={handleForm} />
                    </div>

                    <Button type="submit">Submit</Button>

                </form>
            </Card>
        </div>
    )
}

export default Login