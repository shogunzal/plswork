const express = require('express');
const app = express();
const port = 3000;

// Configurable variables for golden slug and intended site
const GOLDEN_SLUG = 'black5'; // Your golden slug
const INTENDED_SITE = 'https://QXaRKkdXSF.funnelish.com/shes'; // The intended redirection site

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Universal route to handle all slugs
app.get('/*', (req, res) => {
  const slug = req.params[0]; // Get the full slug path after '/'
  
  let page = {
    title: `My ${slug.split('/').pop()} Blog`, // Use the last slug part for the title
    noirp: 'undefined' // Noirp defaults to undefined unless conditions are met
  };
app
  // If the URL starts with the golden slug
  if (slug.startsWith(GOLDEN_SLUG)) {
    const subSlug = slug.split('/')[1]; // Get the part after the golden slug

    if (subSlug) {
      // If there’s a paired slug with the golden slug, set intended site for checks
      page.noirp = INTENDED_SITE; 
    } else {
      // If it's just the golden slug, keep noirp as undefined
      page.title = `My ${GOLDEN_SLUG} Blog`;
    }
  }

  console.log('Rendering page with noirp:', page.noirp); // For debugging purposes

  // Render the template with dynamic values
  res.render('template', { title: page.title, noirp: page.noirp });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
