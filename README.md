# Give me my files (gmmf)

A lightweight Node.js server that manages SSH connections to remote servers, designed to work with a drag-and-drop GUI for file transfer.

## Features

- REST API for SSH connection management
- Simple and lightweight HTTP server

## Installation

```bash
npm install
```

## Configuration

Create a `.env` file in the project root with your SSH credentials:

```
REMOTE_IP=your_remote_server_ip
REMOTE_USERNAME=your_username
REMOTE_PASSWORD=your_password
```

## Usage

Start the server:

```bash
node index.js
```

The server runs on `http://localhost:4848`

## Tech Stack

- Node.js with ES Modules
- [ssh2](https://www.npmjs.com/package/ssh2) - SSH client

## License

GPL-3.0
