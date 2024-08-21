# EXPLANATION TO HOW TO RUN THE CODE

In order to make this code work you have to install all the dependencies established in the requirements.txt file
also you have to install MySQL and preferably MYSQL Workbench aswell, during the creation of this DEMO 8.0 CE version
of MYSQL Workbench was used, it wasn't tested in other versions of it so don't know if it works.

You need to introduce the MYSQL credentials in the .env file located in the backend folder.

The first step is to split the terminal so you are in the backend folder at the same time as the frontend folder with the
command "cd frontend" and "cd backend", then in the backend terminal you'll have to type "python main.py" and in the frontend terminal "npm run dev". This should create the communication between both parts of the code.

Finally a link should be displayed in the frontend terminal, click on it and it should redirect you to the Demo page.