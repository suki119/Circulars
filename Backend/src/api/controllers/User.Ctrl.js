const User = require("../model/User.model");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

//create user
const createUser = async (req, res) => {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const { email, empName, division, documentLevel, subLevel, qmsAccess, position, passwordstatus, empNumber,circularsAccess } = req.body
    console.log(`<-- ${req.method} Request`);
    //const user = new User(req.body);
    const user = new User({
        email,
        empName,
        division,
        documentLevel,
        subLevel,
        qmsAccess,
        position,
        passwordstatus,
        password: hash,
        empNumber,
        circularsAccess
    });

    User.create(user).then(() => {
        res.json("User Registered")
        console.log(`--> ${req.method} Response`);
    }).catch((error) => {
        console.log(`${error.message}`)
    })
}

//update user
const updateUser = async (req, res) => {
    console.log(`<-- ${req.method} Request`);
    const id = req.params.id;
    console.log(req.params.id);

    try {
        // Check if the request body has a password
        if (req.body.password) {
            // Retrieve the current user's password
            const currentUser = await User.findById(id);
            const currentPassword = currentUser.password;
            console.log("cureent", currentPassword)
            console.log("req", req.body.password)

            // Compare the provided password with the current password
            const isPasswordSame = bcrypt.compareSync(req.body.password, currentPassword);

            if (!(req.body.password == currentPassword)) {

                // If the passwords are different, hash the new password
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt);
                req.body.password = hash;
            } else {
                console.log("same")
                req.body.password = currentPassword;
            }


        }

        await User.findByIdAndUpdate(id, req.body);
        res.json("User Updated");
        console.log(`--> ${req.method} Response`);
    } catch (error) {
        console.log(`${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};





const getUserById = (req, res) => {
    console.log(`<-- ${req.method} Request`);

    const id = req.params.id;

    // Assuming 'User' is a model created by Mongoose
    User.findById(id)
        .then(user => {
            if (!user) {
                // If user with the specified ID is not found
                return res.status(404).json({ error: 'User not found' });
            }

            // If user is found, respond with the user JSON
            res.json(user);

            console.log(`--> ${req.method} Response`);
        })
        .catch(error => {
            // Handle errors, e.g., database connection issues
            console.log(`Error: ${error.message}`);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

//delete user
const deleteUser = (req, res) => {

    console.log(`<-- ${req.method} Request`);
    const id = req.params.id;

    User.findByIdAndDelete(id).then(() => {
        res.json("User deleted")
        console.log(`--> ${req.method} Response`);
    }).catch((error) => {
        console.log(`${error.message}`)
    })
}

//get all the users
const readAllUsers = (req, res) => {
    console.log(`<-- ${req.method} Request`);

    User.find().then((users) => {
        console.log(`--> ${req.method} Response`);
        res.json(users);
    }).catch((error) => {
        console.log(`${error.message}`)
    })
}

//get a user
const getUser = (req, res) => {
    console.log(`<-- ${req.method} Request`);
    const names = req.params.name;

    User.find({ eng_title: names }).then((user) => {
        console.log(`--> ${req.method} Response`);
        res.json(user);
    }).catch((error) => {
        console.log(`${error.message}`)
    })
}

//Login
const login = async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).json({ message: "Email not found", status: false })
        }
        console.log('user', user)
        const isPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isPassword) {
            return res.status(200).json({ message: "Email and password mismatched", status: false })
        }

        const token = jwt.sign(
            {
                id: user._id, position: user.position, passwordstatus: user.passwordstatus, qmsAccess: user.qmsAccess,
                subLevel: user.subLevel, documentLevel: user.documentLevel, unit: user.division, empName: user.empName,
                empNumber: user.empNumber, email: user.email , circularsAccess:user.circularsAccess
            },
            process.env.JWT,
            { expiresIn: 60 * 15 } //Adjust the token expiration duration

        )

        const { password, ...otherDetails } = user._doc;
        console.log(token);
        //const otherDetails = user._doc;
        res
            // .cookie("access_token",token,{
            //     httpOnly:true
            // })
            // .status(200)
            // .json({...otherDetails})
            .json({ token , status:true })

    } catch (err) {
        res.status(500).json(err.message);
    }
}

module.exports = { createUser, updateUser, deleteUser, readAllUsers, getUser, login, getUserById }