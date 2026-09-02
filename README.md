<!-- How to run -->

Note : Make sure you have both frontend folder and backend folder in same folder
Note : kindly remember your password because your password is hashed and then save in database

<!-- Step - 1 -->

    1. Inside the .env file we normally stores the credentials(database credentials)
        db_host=localhost
        db_port=3000
        db_user=dckap
        db_password=Welcome@123
        db_database=Online_Food_Ordering_System

    These are my credentials if you run this in your local change the credentials based on your's. ensure you have the exact variable name which i have.

    2.Copy my database code(database.sql) and paste in your MYSQL DB

    3. Open your terminal and run>>  "npm init - y".
        Then some packages what i used in this project was install automatically.
    
    4. (Then open file package.json and click debug. After that one popup will appear Kindly click test) OR
        (Open terminal and run>> "npm run test")

    If you see 
        "server is running in the port [your port]"
        "Connected to the Database".

    If you don't see 
        Kindly contact me!

    <!-- Now Your Server is running perfectly -->


<!-- Admin -->
    E-mail : krish@gmail.com
    password : krish@123
<!--  -->

<!--  -->
<!-- How I created these folder and file structure -->
<!--  -->

<!-- Step -1 -->

Create database named as Online_Food_Ordering_System

<!-- Step -2-->

I created two folders named frontend and backend

Inside the backend folder>> 1. First i have downloaded express, dotenv, bcrypt, nodemon, cors, mysql2 by giving command in Terminal

    2. Next i have created database folder, routes folder for the server, dotenv for credentials like(port, databaseusername,password),then server.js for running the backend server

    Note : I have used nodeJS for connecting and serving the data from the database

Inside the frontend folder>>
1.Created three folders for HTML, CSS, JS

    2.In HTML>addmenu.html, highestselling.html, index.html, login.html, manageorders.html, orders.html, register.html, totalsales.html {These are the files i have used to done this project}

    3.In CSS>style.css

    4.In JS>addmenu.js, highestselling.js, index.js, login.js, manageorders.js, orders.js, register.js, totalsales.js, script.js {These are the files i have used to done this project}
# Online_food_ordering_system
