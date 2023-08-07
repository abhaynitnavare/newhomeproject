app.use(express.static(path.join(__dirname, 'public')));

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const multer = require('multer');



const port = 4000

const app = express();
app.set('view engine', 'ejs')

const upload = multer({ dest: 'uploads/' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Use express-session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));



// //---------- MongoDB Connection(with Atlas server)
const Atlasurl = "mongodb+srv://Abhay:root@cluster0.nwts5cx.mongodb.net/RealEstates?retryWrites=true&w=majority"
mongoose.connect(Atlasurl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connection establish Successfully")
}).catch((err) => {
    console.log(err)
})


let productModel = require('./Model/cardschema')
let cardmodel = require('./Model/buyerscard')
let tenatesmodel = require('./Model/tenaetsCard')
app.get('', (req, res) => {
    productModel.find().then(mdbdata => {
        // console.log(mdbdata)
        const authenticated = req.session.authenticated || false;
        res.render('Home', { title: "Home Page", project: "home", authenticated: authenticated, data: mdbdata })
    })

})

// app.get('/api/get',(req,res)=>{
//     res.send('get all contacts');
// });

app.get('/Buyers', (req, res) => {
    cardmodel.find().then(mdbdata => {
        const authenticated = req.session.authenticated || false;
        res.render('buyers', { title: "Product Page", authenticated: authenticated, project: "home", data: mdbdata })
    })
})

app.get('/tents', (req, res) => {
    tenatesmodel.find().then(mdbdata => {
        const authenticated = req.session.authenticated || false;
        res.render('tents', { title: "tenants Page", authenticated: authenticated, project: "home", data: mdbdata })
    })
})



// data transfering to database 
const studentModel = require('./Model/studentname')

app.get('/submit', (req, res) => {
    res.render('register', { title: "Submit Page", })
})

app.post('/submit', (req, res) => {
    student = new studentModel({
        // _id: mongoose.Schema.Types.ObjectId,
        Name: req.body.Name,
        Email: req.body.Email,
        Password: req.body.Password,
        MobileNo: req.body.MobileNo
    });

    student.save()
        .then(() => {
            console.log(req.body);
            console.log('data sent');
            res.redirect('/');
        })
        .catch((err) => {
            res.json({ message: "error occur" + err });
        });
});





// data transfer end 

// login details check 

app.post('/auth', (req, res) => {
    const email = req.body.Email;
    const password = req.body.Password;

    // Now you need to compare the entered email and password with the data in the database
    // Use your studentModel to find the matching data in the database
    studentModel.findOne({ Email: email, Password: password })
        .then(user => {
            if (!user) {
                // If no user found with the entered email and password, return an error response
                res.json({ message: 'Invalid email or password' });
            } else {
                // If the user is found, set the user as authenticated in the session
                req.session.authenticated = true;
                req.session.user = user;
                res.redirect('/'); // Redirect to the home page
            }
        })
        .catch(err => {
            res.json({ message: 'An error occurred' });
        });


});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/');
    });
});



// login form end


// postproperty start 


// Import the propertyModel
const propertyModel = require('./Model/propertyschem');
// Route to render the property submission form
app.get('/submitProperty', (req, res) => {
    const authenticated = req.session.authenticated || false;
    res.render('propertyForm', { title: 'Submit Property' ,authenticated: authenticated, project: "home"});
});

// Route to handle property submission form data
app.post('/submitProperty', upload.single('image'), (req, res) => {
    // Access property details from the req.body
    const { price, mobileNo, location } = req.body;
    const propertyImage = req.file; // Assuming you are using multer to handle file uploads
  
    // Save the property details to the database using your propertyModel
    // Example code:
    const newProperty = new propertyModel({
      price: price,
      mobileNo: mobileNo,
      location: location,
      // Save the image URL or file path in the database (this depends on how you store images)
      imageUrl: propertyImage.path, // Assuming multer saves the file path in req.file.path
    });
    newProperty.save()
    .then(() => {
      // Property saved successfully, redirect to a success page or back to the form
      res.redirect('/');
    })
    .catch((err) => {
      // Handle errors here, maybe redirect back to the form with an error message
      res.redirect('/submitProperty');
    });
});
  







// Auth-Routes
const auth = require('./router/hovereffect')
app.use('/auth', auth)



app.listen(port, () => {
    console.log('server is listening on http://localhost:3000')
})