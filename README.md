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
npm run dev
```
