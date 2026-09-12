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