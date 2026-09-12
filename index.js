const http = require('http');

const PORT = process.env.PORT || 5000;
const HOST = 'localhost';

/**
 * Renders a full HTML page with consistent layout and navigation.
 */
function renderPage({ title, heading, description }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    :root { --accent: #007bff; }
    * { box-sizing: border-box; }
    body {
      font-family: system-ui, -apple-system, Arial, sans-serif;
      margin: 0;
      padding: 40px;
      line-height: 1.6;
      color: #222;
      background: #fafafa;
    }
    nav a {
      margin-right: 18px;
      text-decoration: none;
      color: var(--accent);
      font-weight: 500;
    }
    nav a:hover { text-decoration: underline; }
    hr { border: none; border-top: 1px solid #ddd; margin: 16px 0 24px; }
    .container { max-width: 780px; }
    h1 { margin-top: 0; }
  </style>
</head>
<body>
  <nav>
    <a href="/">Home</a>
    <a href="/blog">Blog</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
  </nav>
  <hr />
  <main class="container">
    <h1>${heading}</h1>
    <p>${description}</p>
  </main>
</body>
</html>`;
}

/**
 * Route table: path -> { status, title, heading, description }
 */
const routes = {
  '/': {
    status: 200,
    title: 'Home',
    heading: 'Welcome to the Home Page',
    description: 'This is the main landing page of our application.',
  },
  '/home': { redirect: '/' },
  '/blog': {
    status: 200,
    title: 'Blog',
    heading: 'Our Latest Blog Posts',
    description: 'Explore technical articles, updates, and tutorials here.',
  },
  '/about': {
    status: 200,
    title: 'About Us',
    heading: 'About Our Platform',
    description: 'Learn more about our mission, vision, and core team members.',
  },
  '/contact': {
    status: 200,
    title: 'Contact Us',
    heading: 'Get in Touch',
    description: 'Reach out to us via email or phone for support and inquiries.',
  },
};

const NOT_FOUND = {
  status: 404,
  title: '404 Not Found',
  heading: '404 – Page Not Found',
  description: 'The requested route does not exist on this server.',
};

/**
 * Sends an HTML response with proper status and Content-Type.
 */
function sendHtml(res, statusCode, html) {
  res.writeHead(statusCode, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
}

const server = http.createServer((req, res) => {
  // Parse only the pathname, ignoring query strings and hashes.
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  // Silently handle favicon requests (browsers always ask for it).
  if (pathname === '/favicon.ico') {
    res.writeHead(204);
    return res.end();
  }

  const route = routes[pathname];

  // Handle permanent redirects (e.g. /home -> /)
  if (route && route.redirect) {
    res.writeHead(301, { Location: route.redirect });
    return res.end();
  }

  const page = route || NOT_FOUND;
  sendHtml(res, page.status, renderPage(page));
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});