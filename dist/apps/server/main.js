/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("helmet");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("cors");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("morgan");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.connectDB = void 0;
const tslib_1 = __webpack_require__(1);
const mongoose_1 = tslib_1.__importDefault(__webpack_require__(9));
mongoose_1.default.set('strictQuery', false);
// const mongoUrl = `mongodb://localhost:27017/gateway_DB`;
const mongoUrl = process.env.MONGO_DB;
const connectDB = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield mongoose_1.default.connect(mongoUrl, {});
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.log(process.env.MONGO_DB);
        console.error('Could not connect to database --- ', error.message);
        process.exit(1);
    }
});
exports.connectDB = connectDB;


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createPulumiProgram = exports.ensurePlugins = void 0;
const tslib_1 = __webpack_require__(1);
// import * as gcp from '@pulumi/gcp';
// import * as pulumi from '@pulumi/pulumi';
// import * as fs from 'fs';
// import * as path from 'path';
const automation_1 = __webpack_require__(11);
const zipFileFunctions_1 = __webpack_require__(12);
// const stackName = 'from-express2';
// const projectName = 'new-project2';
// Install necessary GCP plugins once upon boot
const ensurePlugins = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const ws = yield automation_1.LocalWorkspace.create({});
    yield ws.installPlugin('gcp', 'v4.0.0');
    console.log('Plugins installed');
});
exports.ensurePlugins = ensurePlugins;
// This function defines our Pulumi GCP Storage static website based on the content passed in the POST body.
const createPulumiProgram = (zipFileBuffer) => () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    // Create a bucket and expose a website index document
    // const siteBucket = new gcp.storage.Bucket(projectName, {
    //   location: 'US',
    //   website: {
    //     mainPageSuffix: 'index.html',
    //   },
    // });
    // Define the HTML content based on the caller's input.
    // const indexContent = content;
    // const acl = new gcp.storage.DefaultObjectAccessControl(projectName, {
    //   bucket: siteBucket.name,
    //   role: 'READER',
    //   entity: 'allUsers',
    // });
    // Extract the contents of the zip file
    const extractToDir = './temp'; // You can change the destination directory
    yield (0, zipFileFunctions_1.exportZipFIle)(zipFileBuffer, extractToDir);
    // // Upload extracted HTML files to the GCS bucket
    // const files = fs.readdirSync(extractToDir);
    // files.forEach((file) => {
    //   new gcp.storage.BucketObject(
    //     file,
    //     {
    //       bucket: siteBucket.name,
    //       source: new pulumi.asset.FileAsset(path.join(extractToDir, file)),
    //       contentType: 'text/html; charset=utf-8',
    //       name: file,
    //     },
    //     { dependsOn: acl }
    //   );
    // });
    return {
        websiteUrl: 'pulumi.interpolate`https://${siteBucket.url}`',
    };
});
exports.createPulumiProgram = createPulumiProgram;


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("@pulumi/pulumi/automation");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exportZipFIle = void 0;
const tslib_1 = __webpack_require__(1);
/* eslint-disable @typescript-eslint/no-unused-vars */
const fs_1 = tslib_1.__importDefault(__webpack_require__(13));
const path = tslib_1.__importStar(__webpack_require__(3));
const yauzl_1 = tslib_1.__importDefault(__webpack_require__(14));
const progress_stream_1 = tslib_1.__importDefault(__webpack_require__(15));
const exportZipFIle = (zipFileBuffer, extractToDir) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const prog = (0, progress_stream_1.default)({
            time: 100 /* ms */,
        });
        prog.on('progress', (info) => {
            console.log(`Unzipping: ${info.percentage.toFixed(2)}%`);
        });
        prog.on('end', () => {
            console.log('Unzipping complete.');
            resolve(extractToDir);
        });
        const stream = yauzl_1.default.fromBuffer(zipFileBuffer, { lazyEntries: true }, (err, zipfile) => {
            if (err) {
                reject(err);
                return;
            }
            zipfile.readEntry();
            zipfile.on('entry', (entry) => {
                if (/\/$/.test(entry.fileName)) {
                    zipfile.readEntry();
                }
                else {
                    const filePath = path.join(extractToDir, entry.fileName);
                    const fileDir = path.dirname(filePath);
                    fs_1.default.mkdirSync(fileDir, { recursive: true });
                    zipfile.openReadStream(entry, (err, readStream) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        const writeStream = fs_1.default.createWriteStream(filePath);
                        readStream.pipe(writeStream);
                        readStream.on('end', () => {
                            zipfile.readEntry();
                        });
                        writeStream.on('finish', () => {
                            console.log(`Extracted: ${entry.fileName}`);
                        });
                    });
                }
            });
            zipfile.on('end', () => {
                prog.destroy(); // Close the progress stream when zip processing is complete
            });
        });
        // Pipe the zip file buffer through the progress stream and into yauzl
        stream.pipe(prog);
    });
});
exports.exportZipFIle = exportZipFIle;


/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("yauzl");

/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("progress-stream");

/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("express-session");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const express_1 = tslib_1.__importDefault(__webpack_require__(2));
const router = (0, express_1.default)();
const emailAuthController_1 = __webpack_require__(18);
// register user
// post request
// /api/auth/register
router.post('/register', emailAuthController_1.registerUserWithEmail);
// login user
// post request
// /api/auth/login
router.post('/login', emailAuthController_1.loginUserWithEmail);
exports["default"] = router;


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loginUserWithEmail = exports.registerUserWithGithub = exports.registerUserWithEmail = void 0;
const tslib_1 = __webpack_require__(1);
const crypto_1 = __webpack_require__(19);
const bcrypt_1 = tslib_1.__importDefault(__webpack_require__(20));
const jsonwebtoken_1 = tslib_1.__importDefault(__webpack_require__(21));
const User_1 = __webpack_require__(22);
const MIN_PASSWORD_LENGTH = 6;
// register user
// post request
// /api/auth/register
const registerUserWithEmail = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, agreed, password } = req.body;
        if (!email) {
            return res.status(500).send({ message: 'Provide an email' });
        }
        if (!password) {
            return res.status(500).send({ message: 'Provide a password' });
        }
        if (password.length < MIN_PASSWORD_LENGTH) {
            return res
                .status(400)
                .send({ message: 'Password should be greater than 6 characters' });
        }
        // get user from database
        const user = yield User_1.User.findOne({ email: email });
        //validate forms
        if (!agreed) {
            return res
                .status(401)
                .send({ message: 'Terms and Conditions not agreed' });
        }
        if (user) {
            return res.status(500).send({ message: 'Account already exists' });
        }
        //create new user object
        const newUser = new User_1.User({
            role: 'user',
            email: email,
            password: bcrypt_1.default.hashSync(password, 12),
            terms_agreed: agreed,
            username: email.split('@')[0],
        });
        //save in database
        yield newUser.save();
        return res.status(200).send({ message: 'Account created successfully' });
    }
    catch (error) {
        next(error);
    }
});
exports.registerUserWithEmail = registerUserWithEmail;
const registerUserWithGithub = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, agreed, method, username, photoURL, phoneNumber } = req.body;
        let { password } = req.body;
        if (password.length < MIN_PASSWORD_LENGTH) {
            return res
                .status(400)
                .send({ message: 'Password should be greater than 6 characters' });
        }
        // create password for google users
        if (method === 'google') {
            password = (0, crypto_1.randomUUID)();
        }
        // get user from database
        const user = yield User_1.User.findOne({ email: email });
        //validate forms
        if (!agreed) {
            return res
                .status(401)
                .send({ message: 'Your have to agree to our terms and conditions' });
        }
        if (user) {
            return res.status(500).send({ message: 'Account already exists' });
        }
        //create new user object
        const newUser = new User_1.User({
            role: 'user',
            email: email,
            password: bcrypt_1.default.hashSync(password, 12),
            terms_agreed: agreed,
            authMethod: method,
            username: username,
            photoURL: photoURL,
            phoneNumber: phoneNumber,
        });
        //save in database
        const _user = yield newUser.save();
        let token;
        if (method === 'google') {
            token = yield jsonwebtoken_1.default.sign({
                // email: _user.email,
                _id: _user._id,
                role: _user.role,
                username: _user.username,
                photoURL: _user.photoURL,
            }, process.env.JWT_SECRET);
            if (token) {
                const user = {
                    // email: _user.email,
                    _id: _user._id,
                    role: _user.role,
                    username: _user.username,
                    photoURL: _user.photoURL,
                    token: token,
                };
                return res.status(200).send(Object.assign(Object.assign({}, user), { message: 'Account Created' }));
            }
            else {
                return res.status(422).send({ message: 'Failed to login, Try again!' });
            }
        }
        // if user registered using email and password
        return res.status(200).send({ message: 'Account Created' });
    }
    catch (error) {
        next(error);
    }
});
exports.registerUserWithGithub = registerUserWithGithub;
// login user
// post request
// /api/auth/login
const loginUserWithEmail = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        // fields from request
        const { email, password, googleAuthId } = req.body;
        const _user = yield User_1.User.findOne({ email: email });
        if (!email) {
            return res.status(400).send({ message: 'Please provide email' });
        }
        // user not found
        if (!_user) {
            return res.status(404).send({ message: 'Account does not exist!' });
        }
        // if (!_user.emailApproved) {
        //   return res.status(403).send({ message: 'Verify your email address' });
        // }
        if (_user.authMethod === 'google' && googleAuthId === '') {
            return res.status(400).send({ message: 'Login Using Google' });
        }
        // decrypt password value from database
        const password_correct = yield bcrypt_1.default.compare(password, _user.password);
        if (password_correct) {
            const token = yield jsonwebtoken_1.default.sign({
                // email: _user.email,
                _id: _user._id,
                role: _user.role,
                username: _user.username,
                photoURL: _user.photoURL,
            }, process.env.JWT_SECRET);
            if (token) {
                const user = {
                    // email: _user.email,
                    _id: _user._id,
                    role: _user.role,
                    username: _user.username,
                    photoURL: _user.photoURL,
                    token: token,
                };
                return res.send({ user, message: 'logged in sucessfully' });
            }
            else {
                return res
                    .status(422)
                    .send({ message: 'Failed to login, Wrong details!' });
            }
        }
        else {
            return res.status(400).send({ message: 'Wrong login details' });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.loginUserWithEmail = loginUserWithEmail;


/***/ }),
/* 19 */
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 21 */
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const tslib_1 = __webpack_require__(1);
const mongoose_1 = tslib_1.__importDefault(__webpack_require__(9));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        trim: true,
        default: '',
    },
    password: {
        type: String,
        trim: true,
        default: '',
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    terms_agreed: {
        type: Boolean,
        default: true,
    },
    authMethod: {
        type: String,
        enum: ['email_password', 'google', 'github'],
        default: 'email_password',
    },
    githubId: {
        type: String,
    },
    githubAccessToken: {
        type: String,
        default: ''
    },
    githubInfo: Object,
    username: {
        type: String,
        default: '',
    },
    photoURL: {
        type: String,
        default: '',
    },
    phoneNumber: {
        type: String,
        default: '',
    },
}, {
    timestamps: true,
});
exports.User = mongoose_1.default.model('User', userSchema);


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
/* eslint-disable @typescript-eslint/ban-ts-comment */
const pulumiMethods_1 = __webpack_require__(10);
const express = tslib_1.__importStar(__webpack_require__(2));
const router = express.Router();
const multer_1 = tslib_1.__importDefault(__webpack_require__(24));
// import fs from 'fs';
// import * as path from 'path';
// import { LocalWorkspace } from '@pulumi/pulumi/automation';
// import { createPulumiProgram } from '@helpers/pulumiMethods';
// import { createPulumiProgram } from '@helpers/pulumiMethods';
// import { exportZipFile } from '@helpers/zipFileFunctions';
// Set up Multer storage
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // specify the destination folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // use the original file name
    },
});
const upload = (0, multer_1.default)({ storage: storage });
const stackName = 'from-express2';
// const projectName = 'new-project2';
// create a static site
// post request
// /api/static-site/create
router.post('/create', upload.single('file'), (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        // Handle the uploaded file
        const file = req.file;
        // Access the uploaded file information
        // const filename = req.file.originalname.slice(0, -4)
        if (!file) {
            return res.status(400).send('No file uploaded.');
        }
        // Create a new stack
        // const stack = await LocalWorkspace.createStack({
        //   stackName: stackName,
        //   projectName: projectName,
        //   // Generate the Pulumi program dynamically from the POST body
        //   program: createPulumiProgram(file.buffer),
        // });
        // console.log('file ----- ', file)
        (0, pulumiMethods_1.createPulumiProgram)(file.buffer);
        // await stack.setConfig('gcp:project', { value: 'seismic-gecko-411212' });
        // await stack.setConfig('gcp:region', { value: 'us-central1' }); // Set your desired region
        // // Deploy the stack, tailing the logs to console
        // const upRes = await stack.up({ onOutput: console.info });
        res.json({ id: stackName, url: 'upRes.outputs.websiteUrl.value' });
        // Create a temporary directory to extract the files
        // const tempDir = path.join(__dirname, 'temp');
        // fs.mkdirSync(tempDir, { recursive: true });
        // // Extract the zip file
        // const extractedLocation = await exportZipFile(req.file.buffer, tempDir);
        // console.log('extracted loccation is, ', extractedLocation)
        // // Respond with the location of the extracted files
        // // res.status(200).json({ resp: extractedLocation, message: 'success' });
        // const { name } = req.body;
        // // create a new stack
        // // Deploy Pulumi program with file content
        // const pulumiProgram = createPulumiProgram({
        //   contentFolder: extractedLocation+"/"+filename,
        //   bucketName: name,
        // });
        // const result = await pulumiProgram();
        // return res.status(200).send(result);
    }
    catch (error) {
        next(error);
    }
}));
exports["default"] = router;


/***/ }),
/* 24 */
/***/ ((module) => {

module.exports = require("multer");

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const express_1 = tslib_1.__importDefault(__webpack_require__(2));
const router = (0, express_1.default)();
const githubAuthController_1 = __webpack_require__(26);
// github auth route
// get request
// /auth/github
router.get('/github', githubAuthController_1.loginWithGithub);
// github callback
// get request
// /auth/github/caallback
router.get('/github/callback', githubAuthController_1.githubCallbackController);
exports["default"] = router;


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.githubCallbackController = exports.loginWithGithub = void 0;
const tslib_1 = __webpack_require__(1);
const User_1 = __webpack_require__(22);
const axios_1 = tslib_1.__importDefault(__webpack_require__(27));
const rest_1 = __webpack_require__(28);
const githubCallbackUri = 'http://localhost:3333/auth/github/callback';
const clientId = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const redirectUri = 'http://localhost:4201/new/static-site';
// request login from github
// function returrns code to the callback url
// post request
const loginWithGithub = (req, res, next) => {
    try {
        res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}`);
    }
    catch (error) {
        next(error);
    }
};
exports.loginWithGithub = loginWithGithub;
// github call back url
// all logic purtaining github login happens here.
// post request
const githubCallbackController = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const code = req.query.code;
        // Exchange code for access token
        const { data } = yield axios_1.default.post('https://github.com/login/oauth/access_token', {
            client_id: clientId,
            client_secret: clientSecret,
            code,
            redirect_uri: githubCallbackUri,
        }, {
            headers: {
                Accept: 'application/json',
            },
        });
        // instantiate octacit to get all repositories
        const octokit = new rest_1.Octokit({
            auth: data.access_token
        });
        // const response = await octokit.repos.listForAuthenticatedUser();
        // request user info from octacit
        const octokit_response = yield octokit.users.getAuthenticated();
        console.log(octokit_response);
        // Store user information in session
        req.session.gh_access_token = data.access_token;
        // // console.log('profile - ', profile);
        const _user = yield User_1.User.findOne({ githubId: octokit_response.data.id });
        // // // // console.log(_user)
        if (!_user) {
            const newUser = new User_1.User({
                username: octokit_response.data.login,
                photoURL: octokit_response.data.avatar_url,
                authMethod: 'github',
                githubAccessToken: data.access_token,
                githubId: octokit_response.data.id,
            });
            yield newUser.save();
        }
        res.redirect(redirectUri);
    }
    catch (error) {
        console.error('GitHub Auth Error:', error);
        next(error);
    }
});
exports.githubCallbackController = githubCallbackController;


/***/ }),
/* 27 */
/***/ ((module) => {

module.exports = require("axios");

/***/ }),
/* 28 */
/***/ ((module) => {

module.exports = require("@octokit/rest");

/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
/* eslint-disable @typescript-eslint/no-explicit-any */
const userGithubController_1 = __webpack_require__(30);
const authMiddeware_1 = __webpack_require__(31);
const User_1 = __webpack_require__(22);
const express_1 = tslib_1.__importDefault(__webpack_require__(2));
const router = express_1.default.Router();
// get all user repositories
// get request
// /api/user/repos
router.get('/repos', authMiddeware_1.requireUserSignIn, (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user; // user from clienf
        const _user = yield User_1.User.findById({ _id: user._id });
        console.log(_user);
        const accessToken = req.session.gh_access_token;
        console.log('get all repository of user from github', accessToken);
        return res
            .status(200)
            .send({
            accessToken: accessToken,
            message: 'getting all repos was successful',
        });
    }
    catch (error) {
        next(error);
    }
}));
// add github access token to user object
// get request
// /api/user/install-github
router.get('/install-github', authMiddeware_1.requireUserSignIn, userGithubController_1.userInstallGithubController);
exports["default"] = router;


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.userInstallGithubController = void 0;
const tslib_1 = __webpack_require__(1);
const clientId = process.env.GITHUB_CLIENT_ID;
const userInstallGithubController = (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const _user = req.user;
    if (!_user) {
        return res.status(400).send({ message: 'You shouod be logged in first' });
    }
    try {
        res.redirect(`https://github.com/login/oauth/authorize?client_id=${clientId}`);
    }
    catch (error) {
        next(error);
    }
});
exports.userInstallGithubController = userInstallGithubController;


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.requireUserSignIn = void 0;
const tslib_1 = __webpack_require__(1);
const jsonwebtoken_1 = tslib_1.__importDefault(__webpack_require__(21));
/**
 * @notice - functions give permissions to users with certain roles
 * @param {token} req - token from the client
 * @returns user object with id
 */
const requireUserSignIn = (req, res, next) => {
    console.log('req.headers', req.headers);
    if (req.headers.authorization) {
        // get token from headers
        const token = req.headers.authorization.replace('Bearer ', '');
        console.log('token', token);
        // verify if token is valid
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
            // if error occurred while validating token return that error
            if (err) {
                res.status(500).send({ error: err.message });
            }
            else if (user &&
                (user.role === 'user' || user.role === 'admin')) {
                req.user = user;
                next();
            }
            else {
                console.log('Elevated previledges required');
                return res
                    .status(500)
                    .send({ message: 'Only Users can perform that task' });
            }
        });
    }
    else {
        return res.status(500).send({ message: 'Authorization Required!' });
    }
};
exports.requireUserSignIn = requireUserSignIn;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/* eslint-disable @typescript-eslint/no-unused-vars */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
const express_1 = tslib_1.__importDefault(__webpack_require__(2));
const path = tslib_1.__importStar(__webpack_require__(3));
const helmet_1 = tslib_1.__importDefault(__webpack_require__(4));
const cors_1 = tslib_1.__importDefault(__webpack_require__(5));
const morgan_1 = tslib_1.__importDefault(__webpack_require__(6));
const dotenv_1 = tslib_1.__importDefault(__webpack_require__(7));
const mongo_1 = __webpack_require__(8);
const pulumiMethods_1 = __webpack_require__(10);
const express_session_1 = tslib_1.__importDefault(__webpack_require__(16));
// setting up dotenv for env variables
dotenv_1.default.config();
//connect to database
(0, mongo_1.connectDB)();
// Install necessary GCP plugins once upon boot
(0, pulumiMethods_1.ensurePlugins)();
// port to listen on development
const port = process.env.PORT || 3333;
// initializing app
const app = (0, express_1.default)();
// Use express-session middleware
app.use((0, express_session_1.default)({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days in milliseconds
    },
}));
// configuring cors
const allowedOrigins = ['*'];
const options = {
    origin: process.env.NODE_ENV === 'development' ? '*' : allowedOrigins,
};
// app level middleware
app.use('/assets', express_1.default.static(path.join(__dirname, 'assets')));
app.use((0, helmet_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('common'));
app.use(express_1.default.json());
app.use((0, cors_1.default)(options));
// Initialize passport
// app.use(passport.initialize());
// app.use(passport.session());
app.use('/assets', express_1.default.static(path.join(__dirname, 'assets')));
// default route for api
app.get('/', (req, res) => {
    res.send({ message: 'Welcome to locations-api!' });
});
// user defined routes
const auth_1 = tslib_1.__importDefault(__webpack_require__(17));
const static_sites_1 = tslib_1.__importDefault(__webpack_require__(23));
const github_1 = tslib_1.__importDefault(__webpack_require__(25));
const user_1 = tslib_1.__importDefault(__webpack_require__(29));
// user defined routers
app.use('/api/auth', auth_1.default);
app.use('/api/static-sites', static_sites_1.default);
app.use('/auth', github_1.default);
app.use('/api/user', user_1.default);
// eror handler
app.use((req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});
//error handling middleware
app.use((error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    console.log(error);
    res.send({
        message: error.message,
        stack: process.env.NODE_ENV === 'production'
            ? 'you are in production'
            : error.stack,
    });
});
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
server.on('error', console.error);

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;