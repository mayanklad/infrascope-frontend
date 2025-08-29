# InfraScope Frontend

Frontend of **InfraScope**, a full-stack Infrastructure as Code (IaC) Visualizer & Simulator.  

This repository contains the **React + Vite + Tailwind CSS frontend**, responsible for:

- Uploading IaC files to the backend  
- Displaying interactive infrastructure graphs  
- Running simulation of resource/task execution  
- Exporting reports in JSON, Markdown, or PDF  

## Features

- Upload `.tf`, `.yml`, `.yaml`, `Dockerfile`, and `docker-compose.yml` files  
- Interactive visualization of resources and dependencies  
- Step-through simulation interface (Next / Previous steps)  
- Export button for infrastructure and simulation reports  
- Sample IaC datasets included for demo/testing  

## Tech Stack

- React + Vite  
- Tailwind CSS v4  
- Graph visualization  
- Axios for API calls to backend  

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <frontend-repo-url>
   cd infrascope-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open browser at `http://localhost:5173`

## Future Work

- Multi-file combined parsing
- Conflict detection and warnings
