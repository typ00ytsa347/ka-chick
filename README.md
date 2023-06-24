# Jubilant Jackrabbits (SOFTENG 750 Project)

Members
- Aarni Kupari
- Andy Fong
- Ou-An Chuang
- Patrick Oliver
- Yuewei Zhang
- Yun-Shan Tsai

## Installation

This application depends on three main frameworks: React and NodeJS, MongoDB and Python.

### Install React and NodeJS

React and NodeJS are both installed in the same place, given with the npm package. The installation
for this package can be found in this website:
https://nodejs.org/en/download

### Install MongoDB

MongoDB can be installed by following the instructions on this website:
https://www.mongodb.com/docs/manual/installation/

### Install Python

Python can be installed by following the instructions on this website:
https://www.python.org/downloads/

During this setup, you will be given the option to also install a command called pip. Make sure this is
checked (it should be checked by default, but keep an eye out regardless). If you did not install pip
with your Python install or you already have an older version of python without pip, you will have to
go to the website again and reinstall Python.

## Setup

For this project to work, you will need to do some setup in the frontend, backend and for Python.
For this project, please run the origin points for the frontend and backend from the same machine.
Once you have both running, you should be able to connect to the frontend from any other machine,
but please do make sure that the initial npm and node commands for both the frontend and backend
are run from the same machine.

### Backend Setup

To set up the backend, start up a command line, and navigate to the folder called "backend_lobby"
inside this project folder. The command for changing the command line's current folder is "cd ___" where
the name of the new location will be inserted in the blank.

Once at the "backend_lobby" folder, run the following command:

```
npm install
```

This will install all of the required packages and place them inside a folder called "node_modules". You
should not need to edit or change this.

You will also need to setup the database backend. Navigate back out of backend_lobby and into backend-database, 
then run the same command:

```
npm install
```

### Frontend Setup

Setting up the frontend works very similary to the backend, with one added step. To start, you will need
to know the IP of the machine you are running both the frontend and backend on. One simple way to do this
is to open up the command line and type in the following command:

```
ipconfig
```

From here, find the group of entries titled "Ethernet adapter Ethernet" and look for the field called
"IPv4 Address". The value of this field will be your IP address.

![image](https://github.com/UOA-CS732-SE750-Students-2023/project-group-jubilant-jackrabbits/assets/16218331/2325cda4-2ab2-4f5c-9312-df7a42cd762a)

Alternatively, you can go to settings in your computer, find "Network & internet", and click on your
Wifi or Network. Under properties, there will once again be a field called "IPv4 address" which will
show you your IP address.

Now that you have your IP address, go inside the project folder and navigate to "frontend > src > context"
and open the file called "WebSocketContextProvider.jsx". Inside this file, on line 13 there will be a line
reading:

```
const IP = "___";
```

change the "___" on this line into whatever your computer's IP address is. So for example, if your IP
address was "123.456.7.89", your line 13 would read:

```
const IP = "123.456.7.89";
```

Now, with the IP address set, we can install the packages. Like with the backend again, start a new
command line, and this time navigate to the folder called "frontend" inside this project folder.
Like last time, install all of the required packages by running the following command:

```
npm install
```

### Python Setup

For Python, you will need to install a few libraries. Python installs new libraries using the pip command,
or in our scenario, the pip3 command. If your pip is not updated, you can run the following in the command
line to update to the latest version of pip:

```
python.exe -m pip install --upgrade pip
```

Now, we can install all of the python scripts required to run the program. For this, use the command line
to navigate to the project folder, and run the following command:

```
pip3 install -r python-requirements.txt
```

This will install all of the necessary libraries inside the "python-requirements.txt" document, and place them
in your computer's Python library folder. This library folder will likely not be inside the project folder, but
that is okay.

## Running

Now that the project files and dependencies are installed, the frontend and the backend can be run separately.

To run the backend, open up a command line, navigate to the "backend_lobby" folder inside this project folder,
and run the following command:

```
node index.js
```

This will open up the backend server at port 8080.

Likewise in the backend-database, run the same command. Make sure you have both MongoDB installed and running in the background.

```
node server.js
```

You should see the following output confirming a successful start up:

```
App server listening on port 3000!
Database Connected
```

Now, you can run the frontend by opening a new command line, navigating to the folder called "frontend" inside
this project folder and running the following command:

```
npm run dev
```

This will start the frontend at "localhost:5173", allowing you to enter that term into the web browser to
access the frontend.

## Functionality

### Main Page
The application will begin at the main page, giving the player an option to join a lobby, create a lobby
or go to the map creator.

### Map Creator
The user can create their own maps by upload images and objectives based on the location they wish to set up the game. After creating objectives and specifying a map name, the map will be saved and an ID will be generated referencing this map. This ID can then be used to create a lobby for other players to join.

**Developer's note**: to speed up map creation during testing, you can press Create Dummy Map to generate a pre-made map ID.

Note: it takes a while to upload images when pressing Create Objective. Please only press it once, this only a prototype!

### Create Lobby
In this screen, the player can create a new lobby by providing a map ID, a room name and a time limit.
All of this information is sent to the server, and if it is valid, a new lobby is created and the user
is sent to a screen allowing them to start the lobby. During this time, any users can joib the lobby
using the lobby ID.

### Join Lobby
This is the screen where other players can join a lobby. If they give a valid unique username and the code
for the lobby, they will be shown a waiting screen where they can wait until the lobby is started.

### Choose Objective
This is a screen shown to any users currently playing the game inside an active lobby. They can choose
between any of the 9 given objectives. Each objective will have an attached image showing what they are
looking for, and the player's job is to find where the images was taken from. Going to such a location
will result in them finding a marker which they can take an image of for proof.

### Game Objective Screen

When at the game objective screen, you can take and send an image to the server. For PC, this will bring up file
browser and allow you to upload an image. For mobile, this will bring up the phone camera and allow you to take
a picture.

Once the image is taken or uploaded, it will be sent to the server. The server will perform image recognition to
evaluate whether the sent image is of a marker or not. After a delay of about 5-20 seconds (the delay will
depend on the machine) the server will send a response telling whether or not the sent image was a marker or not,
and update your personal score accordingly.

Given below is a link to a Google Drive holding sample marker images. There are folders for each marker
(A --> J), and each folder, 11 images are given. 9 of them are regular good images, and the remaining two are
suboptimal images: one which is zoomed out, and one which is zoomed in.

https://drive.google.com/drive/folders/1BfNHujU2mZ-zfTZUba0h7nGeQ4-da4v_?usp=sharing

## Common Install, Setup and Running Issues

There were a few common issues we noticed during the creation of this project. Some of these are caused by
previous installations of programs, and others are dependent on the machine they are run on. In case any of
these occur for you, we have made recommended fixes based on our solution. While there is no guarantee they will
fix your specific issue, we are hoping they will provide a solution.


### The Objectives won't upload

Make sure mongodb.exe is running. And make sure that you connect to mongodb://localhost:27017 through mongodb atlas.
![image](https://github.com/UOA-CS732-SE750-Students-2023/project-group-jubilant-jackrabbits/assets/16218331/6abd4c58-3ec6-4e7c-8879-acc79d840a1b)
![image](https://github.com/UOA-CS732-SE750-Students-2023/project-group-jubilant-jackrabbits/assets/16218331/d1a8b65e-2938-4ce5-ba88-c150e12f3624)

### No module named "sklearn" or "skimage"

We found that these two libraries can prove to be common issues. Since these libaries were recently renamed,
some users are still running the following in the command line:

```
pip3 install sklearn
pip3 install skimage
```

Nowadays, these libaries are instead called from the command line with:

```
pip3 install scikit-image
pip3 install scikit-learn
```

Additionally, some users had an incorrect or corrupted file path for calling python libraries. For this, rerun
in the command line the pip install for a working package you already have installed, such as:

```
pip3 install numpy
```

The command line will tell you where this library is currently installed. Open up file explorer, and navigate
to this location.

Now, rerun the pip install for sklearn or skimage with the following command:

```
pip3 install scikit-image
pip3 install scikit-learn
```

Once again, the command line will tell you where these libraries are installed. If the folder that scikit-image
or scikit-learn are installed are different than that of numpy, move them over to the folder where numpy is.

### Python is not recognised as an internal or external command

This issue occurs when the python executable is not found in the PATH environment variable of your computer.
The PATH variable shows where your computer can look for executables to be run on your command line. For
example, the folder for npm should be automatically added to the PATH variable when you install nodeJS so that
you can run npm from whichever folder you want.

To edit this, go to the search bar in your computer and type
in "environment", then click on "Edit the system environment variables". Here, click on the button
"Environment Variables", and in both of the lists there, find any entry titled "Path". Click "Edit", then click
"New" and paste the folder location where your python executable is stored.

Now, the folder for python should be added, and if you close and reopen the command line it should be able to
access the python executable from anywhere.
