# FontGrouper

FontGrouper is a web application for uploading, managing, and grouping TrueType Font (TTF) files. It features a responsive React.js frontend styled with Tailwind CSS and a Core PHP backend with a MySQL database. The application allows users to upload TTF fonts, create font groups, and manage them through an intuitive single-page interface.

- **Client-side Repository**: [github.com/gaznafis007/font-grouper-client](https://github.com/gaznafis007/font-grouper-client)
- **Server-side Repository**: [github.com/gaznafis007/font-grouper-backend](https://github.com/gaznafis007/font-grouper-backend)
- **Live Demo**: [font-grouper.vercel.app](https://font-grouper.vercel.app)
- **API Server**: [http://www.font-grouper.free.nf/api/](http://www.font-grouper.free.nf/api/)

## Features

### Frontend (React.js)
- **Font Upload**: Upload TTF files with automatic submission, progress indicators, and validation for non-TTF files.
- **Font List Display**: View all uploaded fonts in a responsive table with real-time font previews and loading/error states.
- **Font Group Creation**: Create font groups by selecting multiple fonts (minimum two) with dynamic form fields and validation.
- **Font Group Management**: List, edit, and delete font groups with confirmation dialogs for deletions.
- **Single Page Architecture**: Tabbed interface for seamless navigation without page reloads, built with smooth transitions.
- **Responsive Design**: Mobile and desktop-friendly layout using Tailwind CSS.
- **Tech Stack**:
  - React.js with React Hook Form for form management
  - Tailwind CSS for styling
  - Axios for API requests
  - React Context API for state management

### Backend (Core PHP)
- **API Endpoints**:
  - `/api/fonts`: Upload (POST) ttf files, Retrieve (GET) or delete (DELETE) fonts.
  - `/api/font-groups`: Create (POST), retrieve (GET), update (PUT), or delete (DELETE) font groups with validation for minimum two fonts.
- **Database**: MySQL with tables for fonts (`fonts`), font groups (`font_groups`), and group items (`font_group_items`).
- **Security**: Input sanitization, prepared statements to prevent SQL injection, secure file handling, and CORS support.
- **Architecture**: Object-oriented PHP following SOLID principles.

### General
- **User Interface**: Clean, functional design with consistent styling.
- **Performance**: Optimized API calls, efficient font rendering, and minimal DOM updates.
- **Code Quality**: Organized folder structure, consistent coding standards, and comprehensive error handling.
- **Version Control**: Managed with Git, including meaningful commit messages.

## Prerequisites
- **Node.js** (v16 or higher) and npm for the frontend
- **PHP** (v7.4 or higher) for the backend
- **MySQL** (v5.7 or higher) for the database
- **Git** for cloning repositories
- **Web server** (e.g., Apache) for hosting the backend
- **Composer** for PHP dependencies (if applicable)

## Setup Instructions

### Frontend (Client-side)
1. Clone the client repository:
   ```bash
   git clone https://github.com/gaznafis007/font-grouper-client.git
   cd font-grouper-client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the API base URL:
     ```env
     REACT_APP_API_URL=http://www.font-grouper.free.nf/api/
     ```
4. Start the development server:
   ```bash
   npm start
   ```
   The app will run at `http://localhost:3000`.

### Backend (Server-side)
1. Clone the server repository:
   ```bash
   git clone https://github.com/gaznafis007/font-grouper-backend.git
   cd font-grouper-backend
   ```
2. Set up a MySQL database:
   - Create a database (e.g., `font_grouper`).
   - Import the SQL schema (if provided) or create tables:
     ```sql
     CREATE TABLE fonts (
         id INT AUTO_INCREMENT PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         file_path VARCHAR(255) NOT NULL,
         upload_date DATETIME NOT NULL
     );
     CREATE TABLE font_groups (
         id INT AUTO_INCREMENT PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         creation_date DATETIME NOT NULL
     );
     CREATE TABLE font_group_items (
         id INT AUTO_INCREMENT PRIMARY KEY,
         group_id INT NOT NULL,
         font_id INT NOT NULL,
         FOREIGN KEY (group_id) REFERENCES font_groups(id),
         FOREIGN KEY (font_id) REFERENCES fonts(id)
     );
     ```
3. Configure database connection:
   - Update the database configuration file (e.g., `config.php`) with your MySQL credentials:
     ```php
     <?php
     define('DB_HOST', 'localhost');
     define('DB_USER', 'your_username');
     define('DB_PASS', 'your_password');
     define('DB_NAME', 'font_grouper');
     ?>
     ```
4. Set up a web server:
   - Place the backend files in your web server’s root directory (e.g., `/var/www/html` for Apache).
   - Ensure the `api` directory is accessible and writable for file uploads (e.g., `chmod 755 api/uploads`).
5. Test the API:
   - Access `http://your-server/test.php` or similar endpoints to verify functionality.

### Local Development
- Run the frontend and backend locally.
- Update the frontend’s `REACT_APP_API_URL` to point to your local backend (e.g., `http://localhost/font-grouper-backend/api/`).
- Test all features (upload, list, group creation, and management) locally before deployment.

## Deployment

### Frontend
- **Vercel** (as used in the live demo):
  1. Push the client repository to GitHub.
  2. Connect the repository to Vercel via the Vercel dashboard.
  3. Set the environment variable `REACT_APP_API_URL` to `http://www.font-grouper.free.nf/api/`.
  4. Deploy the app. The live URL will be provided (e.g., [font-grouper.vercel.app](https://font-grouper.vercel.app)).
- **Other Platforms**: Build the app (`npm run build`) and host the `build` folder on any static hosting service (e.g., Netlify, GitHub Pages).

### Backend
- **InfinityFree** (as used in the server link):
  1. Upload the backend files to the `htdocs` directory using FileZilla (host: `ftpupload.net`, username: `ifo_33744480`, port: 21).
  2. Set up a MySQL database via the InfinityFree control panel ("MySQL Databases").
  3. Update the database configuration file with InfinityFree’s MySQL credentials (e.g., host: `sqlxxx.epizy.com`).
  4. Test the API at `http://www.font-grouper.free.nf/api/`.
- **Other Hosts**: Deploy to a PHP-compatible host (e.g., Hostinger, Bluehost) with MySQL support. Ensure file permissions and CORS settings are configured.

### Notes
- InfinityFree’s free plan has limitations (e.g., no Node.js, occasional downtime). For production, consider a paid host.
- DNS propagation for `fontgrouper.free.nf` may take up to 72 hours. Use the IP (`185.27.134.138`) for testing if needed.
- Secure the API with HTTPS by enabling a free SSL certificate in InfinityFree’s control panel.

## Usage
1. Visit [font-grouper.vercel.app](https://font-grouper.vercel.app).
2. Upload TTF files via the upload section.
3. View uploaded fonts with previews in the font list.
4. Create font groups by selecting at least two fonts.
5. Manage font groups (edit/delete) in the groups section.
6. Enjoy a responsive, intuitive interface on mobile or desktop.

## Contributing
1. Fork the client or server repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit changes with meaningful messages (`git commit -m "Add feature X"`).
4. Push to your fork (`git push origin feature-name`).
5. Open a pull request with a clear description.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Built with [React.js](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/), and [Core PHP](https://www.php.net/).
- Hosted on [Vercel](https://vercel.com/) and [InfinityFree](https://www.infinityfree.com/).
- Thanks to the open-source community for tools and inspiration.
