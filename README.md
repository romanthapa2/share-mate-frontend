# Share Mate

Share Mate is a real-time file and text sharing web application that allows users to easily share text messages and files between devices on the same network. It uses a PIN-based system for secure connections and provides a modern UI for seamless interaction.

## Features

- **Real-time Text Sharing**: Share text messages instantly between connected devices
- **File Sharing**: Transfer files with progress tracking for larger files
- **PIN-based Security**: Each session is secured with a unique 4-digit PIN
- **Drag & Drop**: Easily upload files with drag and drop functionality
- **Responsive UI**: Works on both desktop and mobile devices
- **Host and Client Modes**: Create a sharing session or join an existing one

## Technologies Used

- React
- Vite
- Socket.IO for real-time communication
- TailwindCSS for styling
- Framer Motion for animations
- React Router DOM for routing

## Prerequisites

- Node.js (v16 or newer)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/share-mate-frontend.git
   cd share-mate-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Configure the development environment:
   - Open `src/config/conf.js` and update the IPv4 address to your local network IP

## Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
```

This will start the development server, typically at `http://localhost:5173`.

### Building for Production

```bash
npm run build
# or
yarn build
```

## Usage

1. **Start as Host**:
   - Open the application on your device
   - Click on the "Start Host" button in the sidebar
   - A 4-digit PIN will be generated
   - Share this PIN (or the full URL) with others who want to connect

2. **Join as Client**:
   - Open the provided URL or enter the PIN manually
   - You'll automatically connect to the host session

3. **Sharing Text**:
   - Type text in the text area and press enter to send
   - All connected devices will see the text in real-time

4. **Sharing Files**:
   - Navigate to the Files tab
   - Drag and drop files or click "Select" to choose files
   - Click "Send" to upload and share the files
   - Connected devices can download the shared files

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
