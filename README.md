# CODESPHERE - A Remote Code Executor

CODESPHERE is a Remote Code Executor which lets you execute short code snippets of yours remotely.

## Demo

## Features

- Implemented Code Santization
- For each code run request, a seperate Docker container is created which limits the interference with the host machine.
- Socket has been implemented with rooms, allowing multiple users to come together and code along in different rooms.
- The parameters like Time taken to run the code and Total memory used have been limited, allowing efficient management of resources.
- The code execution happens asynchronously, allowing the server to handle multiple requests at the same time.


## Tech Stack

**Client:** React

**Server:** Node, Express, Docker


## Prerequisites

- docker

```bash
    curl -fsSL https://get.docker.com -o get-docker.sh
```

```bash
    sudo sh get-docker.sh
```

```bash
    # Start Docker service
    sudo systemctl start docker
```

```bash
    # Add your user to docker group (to avoid using sudo with docker commands)
    sudo usermod -aG docker $USER
```

Note: After adding user to docker group, you'll need to log out and log back in for the changes to take effect.

```bash
    # Verify Docker installation
    docker --version
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/Shreyans1999/Remote-Code-Executor-System.git
```

Go to the Backend project directory

```bash
  cd remote-code-executor/Backend
```

Install dependencies

```bash
  npm install
```

Build the Docker images

```bash
  cd Dockerfiles
```

```bash
  sudo docker build -t java:v1 ./java 
```
```bash
  sudo docker build -t cpp:v1 ./cpp 
```
```bash
  sudo docker build -t py:v1 ./python 
```

## Usage

- To start the Backend server in Development mode

```bash
cd Backend && npm run dev
```

- To start the Backend server in Production mode

```bash
cd Backend && npm run start
```

- Start the Frontend server

```bash
cd ../Frontend && npm start
```

## Screenshots

![App Screenshot](https://i.ibb.co/tKt6RYB/Screenshot-from-2023-03-20-21-10-32.png)
![App Screenshot](https://i.ibb.co/Rgdyb7w/Screenshot-from-2023-03-20-22-45-39.png)
![App Screenshot](https://i.ibb.co/0KbTh6S/Screenshot-from-2023-03-20-22-47-05.png)
![App Screenshot](https://i.ibb.co/TM0h50s/Screenshot-from-2023-03-20-22-48-56.png)
![App Screenshot](https://i.ibb.co/d2vxwqJ/Screenshot-from-2023-03-20-22-49-11.png)



## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

- Fork the Project
- Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
- Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
- Push to the Branch (`git push origin feature/AmazingFeature`)
- Open a Pull Request
