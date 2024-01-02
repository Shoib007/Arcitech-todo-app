# How to Install
### Clone Repo
```
git clone https://github.com/Shoib007/Arcitech-todo-app.git
```
### Backend Installation
```
cd TaskBackend
```
### Install required libraries
```
pip install -r requirements.txt
```
### Migrate the models to the database

```
python3 manage.py makemigration
python3 manage.py migrate
```
### Run the server
```
python3 manage.py runserver
```
### Frontend Installetion
```
cd TaskFrontend
npm i
```

### Create .env file under TaskFrontend folder
```
VITE_BASE_URL = https://localhost:8000
```

### Run the Server
```
npm run dev
```
#### Go /login to login

```
username : shoib@gmail.com
password : 1234
```