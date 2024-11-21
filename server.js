/*********************************************************************************
<<<<<<< HEAD
WEB322 – Assignment 04
=======
WEB322 – Assignment 02
>>>>>>> 33e2b675c1675a1c5000bfd45ff51e084f3b1892
I declare that this assignment is my own work in accordance with Seneca Academic Policy.
No part of this assignment has been copied manually or electronically from any other source 
(including 3rd party web sites) or distributed to other students.

Name: Jaidev Panchal
Student ID: 115682239
<<<<<<< HEAD
Date: 17/11/2024
Replit Web App URL: 
GitHub Repository URL: 
=======
Date: 09/10/2024
Replit Web App URL: https://replit.com/@jnpanchal/Web322-app
GitHub Repository URL: https://github.com/jaidevpan/Web322-app
>>>>>>> 33e2b675c1675a1c5000bfd45ff51e084f3b1892
********************************************************************************/
const express = require('express');
const app = express();
const storeService = require('./store-service');
const path = require('path');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
<<<<<<< HEAD
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');

// Serving static files
app.use(express.static('public'));
// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
// Route to about page
app.use((req, res, next) => {
  let route = req.path.substring(1);
  app.locals.activeRoute = "/" + (isNaN(route.split('/')[1]) ? route.replace(/\/(?!.)/, "") : route.replace(/\/(.)/, ""));
  app.locals.viewingCategory = req.query.category ? req.query.category : null; // Ensure category is set or null
  next();
});


// Configure Handlebars as the template engine
app.engine('.hbs', exphbs.engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views', 'layouts'),
  helpers: {
    navLink: function(url, options) {
      return `<li class="nav-item${url === options.data.root.activeRoute ? ' active' : ''}">
                  <a class="nav-link" href="${url}">${options.fn(this)}</a>
              </li>`;
    },
    equal: function(lvalue, rvalue, options) {
      if (arguments.length < 3) {
        throw new Error("Handlebars Helper equal needs 2 parameters");
      }
      return lvalue != rvalue ? options.inverse(this) : options.fn(this);
    },
    safeHTML: function(context) {
      return context ? new Handlebars.SafeString(context) : "";
    }
  }
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
=======
>>>>>>> 33e2b675c1675a1c5000bfd45ff51e084f3b1892

const PORT = process.env.PORT || 8080;
cloudinary.config({
  cloud_name: 'dgen5lfsi',
  api_key: '538496142288271',
  api_secret: 'qQzQRSAgze6McUkBuug7jnR3u3c',
  secure: true
  })

// Multer configuration (no disk storage)
const upload = multer();
<<<<<<< HEAD
app.get('/', (req, res) => {
  res.redirect('/shop');
});

// Redirect root to /about
app.get('/about', (req, res) => {
  res.render('about');
});
  
  // Route to fetch all items for /items
  app.get('/items', async (req, res) => {
    let viewData = {};
    try {
      const items = await storeService.getPublishedItems();
      viewData.items = items;
    } catch (err) {
      viewData.message = "No items available.";
    }
    try {
      const categories = await storeService.getCategories();
      viewData.categories = categories;
    } catch (err) {
      viewData.categoriesMessage = "No categories available.";
    }
    res.render('items', { data: viewData });
  });
  
  // Route to fetch all categories for /categories
  app.get('/categories', async (req, res) => {
    try {
      const categories = await storeService.getCategories();
      res.render('categories', { categories });
    } catch (error) {
      console.error("Error retrieving categories:", error);
      res.render('categories', { message: "No categories available" });
    }
  });
  

  // to add new route to add itmes
  app.get('/items/add', (req, res) => {
    res.render('addItem');
});

=======

// Serving static files
app.use(express.static('public'));
// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
// Route to about page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
  });
  

// Redirect root to /about
app.get('/', (req, res) => {
    res.redirect('/about');
});


// Route to fetch all published items for /shop
app.get('/shop', (req, res) => {
    storeService.getPublishedItems()
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json({ message: err }));
  });
  
  
  // Route to fetch all items for /items
  app.get('/items', (req, res) => {
    storeService.getAllItems()
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json({ message: err }));
  });
  
  
  // Route to fetch all categories for /categories
  app.get('/categories', (req, res) => {
    storeService.getCategories()
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json({ message: err }));
  });
  // to add new route to add itmes
  app.get('/items/add', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'addItem.html'));
  });
>>>>>>> 33e2b675c1675a1c5000bfd45ff51e084f3b1892

  // POST /items/add route to handle item creation
app.post('/items/add', upload.single('featureImage'), (req, res) => {
  if (req.file) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) resolve(result);
          else reject(error);
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      let result = await streamUpload(req);
      return result;
    }

    upload(req).then((uploaded) => {
      processItem(uploaded.url);
    }).catch((error) => {
      console.error('Upload failed:', error);
      res.status(500).send('Failed to upload image');
    });
  } else {
    processItem('');
  }

  function processItem(imageUrl) {
    req.body.featureImage = imageUrl;
    storeService.addItem(req.body).then(() => {
      res.redirect('/items');
    }).catch((err) => {
      res.status(500).send('Failed to add item');
    });
  }
});

// Route to fetch all items with optional filters
app.get('/items', (req, res) => {
  const { category, minDate } = req.query;

  if (category) {
    storeService.getItemsByCategory(category)
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json({ message: err }));
  } else if (minDate) {
    storeService.getItemsByMinDate(minDate)
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json({ message: err }));
  } else {
    storeService.getAllItems()
      .then((data) => res.json(data))
      .catch((err) => res.status(500).json({ message: err }));
  }
});
<<<<<<< HEAD


// Route to fetch all published items for /shop
app.get('/shop', async (req, res) => {
  let viewData = {};
  const category = req.query.category;
  const selectedItemId = req.query.id ? parseInt(req.query.id) : null;

  try {
    // Fetch items filtered by category, if provided
    if (category) {
      viewData.posts = await storeService.getPublishedItemsByCategory(category);
    } else {
      viewData.posts = await storeService.getPublishedItems();
    }
  } catch (err) {
    viewData.posts = [];
    viewData.message = "No items available.";
  }

  try {
    // Fetch categories for the sidebar
    viewData.categories = await storeService.getCategories();
  } catch (err) {
    viewData.categories = [];
    viewData.categoriesMessage = "No categories available.";
  }

  try {
    // Fetch the selected item's details, if an ID is provided
    if (selectedItemId) {
      viewData.post = await storeService.getItemById(selectedItemId);
    } else {
      viewData.post = null;
    }
  } catch (err) {
    viewData.post = null;
    viewData.message = "Item not found.";
  }

  res.render('shop', { data: viewData });
});
  
  // Handle non-matching routes (404)
  app.use((req, res) => {
    res.status(404).render('404');
});

app.get('/shop/:id', async (req, res) => {
  let viewData = {};
  const id = parseInt(req.params.id); // Convert the id to an integer

  try {
    console.log("Fetching item with ID:", id); // Debugging
    // Fetch the specific item by ID
    const item = await storeService.getItemById(id);
    console.log("Item fetched:", item); // Debugging
    viewData.post = item;
  } catch (err) {
    console.error("Error fetching item:", err); // Debugging
    viewData.post = null;
    viewData.message = "Item not found.";
  }

  try {
    // Fetch all published items for the sidebar
    const items = await storeService.getPublishedItems();
    viewData.posts = items;
  } catch (err) {
    viewData.posts = [];
    viewData.message = "No items available.";
  }

  try {
    // Fetch all categories for the sidebar
    const categories = await storeService.getCategories();
    viewData.categories = categories;
  } catch (err) {
    viewData.categories = [];
    viewData.categoriesMessage = "No categories available.";
  }

  res.render('shop', { data: viewData });
});
=======
// Route to fetch a single item by ID
app.get('/item/:id', (req, res) => {
  const id = parseInt(req.params.id);
  
  storeService.getItemById(id)
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).send('Item not found');
      }
    })
    .catch((err) => res.status(500).json({ message: err }));
});

  
  
  // Handle non-matching routes (404)
  app.use((req, res) => {
    res.status(404).send("Page Not Found");
  });
  
>>>>>>> 33e2b675c1675a1c5000bfd45ff51e084f3b1892
  // Initialize the store service and then start the server
storeService.initialize()
.then(() => {
  app.listen(PORT, () => {
    console.log(`Express http server listening on port ${PORT}`);
  });
})
.catch((err) => {
  console.log("Failed to initialize the store: " + err);
});
