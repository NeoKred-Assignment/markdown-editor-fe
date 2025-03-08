## Frontend

The frontend of the Real-Time Markdown Editor is designed to provide a seamless and interactive user experience. It is built using React with TypeScript, leveraging the power of Vite for fast builds and HMR (Hot Module Replacement).

### Features

- **Real-time Preview:** As you type Markdown in the text editor, the HTML preview updates instantly, showing how the content will appear on the web.
- **Syntax Highlighting:** Code blocks within the Markdown are highlighted using `react-syntax-highlighter`, making it easier to read and understand code snippets.
- **Dark Mode:** A toggleable dark mode is available to reduce eye strain and improve visibility in low-light conditions.
- **Local Storage:** Your work is automatically saved to local storage, ensuring that you don't lose your progress even if you close the browser.
- **File Operations:** You can upload Markdown files to edit them, or download your work as HTML files.

### Tech Stack

- **React with TypeScript:** Provides a robust framework for building user interfaces with strong typing.
- **Tailwind CSS:** Utilized for rapid UI development and responsive design.
- **Vite:** Used for building and serving the application, offering superior performance and fast refresh capabilities.

### Getting Started

#### Prerequisites
- Node.js (v14 or later)
- Yarn

#### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/NeoKred-Assignment/markdown-editor-fe.git
   cd markdown-editor-fe
   ```

2. Install dependencies using Yarn:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn dev
   ```

This will start the application on `localhost:3000` (or whichever port is configured). Navigate to this address in your web browser to start using the Markdown editor in development mode with live reloading.

