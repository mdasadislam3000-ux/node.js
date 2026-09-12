const http = require('http');

const renderPage = (title, heading, description) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
      body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
      nav a { margin-right: 15px; text-decoration: none; color: #007bff; }
      nav a:hover { text-decoration: underline; }
      .container { margin-top: 20px; }
    </style>
  </head>
  <body>
    <nav>
      <a href="/">Home</a>
      <a href="/blog">Blog</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
    <hr>
    <div class="container">
      <h1>${heading}</h1>
      <p>${description}</p>
    </div>
  </body>
  </html>
`;
const server = http.createServer((req, res) => {
  const url = req.url;

  res.setHeader('Content-Type', 'text/html');

  if (url === '/' || url === '/home') {
    res.statusCode = 200;
    res.end(renderPage('Home', 'Welcome to the Home Page', 'This is the main landing page of our application.'));
  } else if (url === '/blog') {
    res.statusCode = 200;
    res.end(renderPage('Blog', 'Our Latest Blog Posts', 'Explore technical articles, updates, and tutorials here.'));
  } else if (url === '/about') {
    res.statusCode = 200;
    res.end(renderPage('About Us', 'About Our Platform', 'Learn more about our mission, vision, and core team members.'));
  } else if (url === '/contact') {
    res.statusCode = 200;
    res.end(renderPage('Contact Us', 'Get in Touch', 'Reach out to us via email or phone for support and inquiries.'));
  } else {
    res.statusCode = 404;
    res.end(renderPage('404 Not Found', '404 - Page Not Found', 'The requested route does not exist on this server.'));
  }
});
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});