import User from '../models/user';
import UserSession from '../models/userSession';
import sanitizeHtml from 'sanitize-html';

/**
 * Get user
 */
export function getUser(req, res) {
  User.findOne($and [{ active: true }, { _id: req.params.id }]).exec((err, person) => {
      if (err) {
        res.status(500).send(err);
      }

      res.json({ person });
  });
}


/**
 * Add user
 */
export function addUser(req, res) {
  if (!req.body.user.name || !req.body.user.surname || !req.body.user.user || !req.body.user.password) {
    res.status(403).end();
  }

  const newUser = sanitizeInputs(req.body.user);

  // Steps:
  // 1. Verify email doesn't exist
  // 2. Save
  User.find({
    user: newUser.user
  }, (err, previousUsers) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    } else if (previousUsers.length > 0) {
      return res.send({
        success: false,
        message: 'Error: Account already exist.'
      });
    }
    // Save the new user
    newUser.password = newUser.generateHash(newUser.password);
    newUser.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ user: saved });
    });
  });
}

const sanitizeInputs = (user) => {
  const newUser = new User(user);

  // Let's sanitize inputs
  newUser.name = sanitizeHtml(newUser.name);
  newUser.surname = sanitizeHtml(newUser.surname);
  newUser.user = sanitizeHtml(newUser.user);
  newUser.password = sanitizeHtml(newUser.password);
  newUser.type = sanitizeHtml(newUser.type);

  return newUser
};



/**
 * Login
 */
export function login(req, res) {
  if (!req.body.user.user || !req.body.user.password) {
    res.status(403).end();
  }
  let username = sanitizeHtml(req.body.user.user);
  let password = sanitizeHtml(req.body.user.password);

  User.find({
    user: username
  }, (err, users) => {
    if (err) {
      console.log('err 2:', err);
      return res.send({
        success: false,
        message: 'Error: server error'
      });
    }
    if (users.length != 1) {
      return res.send({
        success: false,
        message: 'Error: Invalid user'
      });
    }
    const user = users[0];
    if (!user.validPassword(password)) {
      return res.send({
        success: false,
        message: 'Error: Invalid'
      });
    }

    // Otherwise correct user
    const userSession = new UserSession();
    userSession.userId = user._id;
    userSession.save((err, doc) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      }
      return res.send({
        success: true,
        message: 'Valid sign in',
        token: doc._id
      });
    });
  });
}


/**
 * Logout
 */
export function logout(req, res) {
  const token = req.query.token;

  UserSession.findOneAndUpdate({
    _id: token,
    isDeleted: false
  }, {
    $set: {
      isDeleted:true
    }
  }, null, (err, sessions) => {
    if (err) {
      console.log(err);
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    }
    return res.send({
      success: true,
      message: 'Good'
    });
  });
}

/**
 * Logout
 */
export function isLoggedIn(req, res) {
  // Get the token
  const { query } = req;
  const { token } = query;
  // ?token=test

  // Verify the token is one of a kind and it's not deleted.
  UserSession.find({
    _id: token,
    isDeleted: false
  }, (err, sessions) => {
    if (err) {
      console.log(err);
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    }
    if (sessions.length != 1) {
      return res.send({
        success: false,
        message: 'Error: Invalid'
      });
    } else {
      // DO ACTION
      return res.send({
        success: true,
        message: 'Is logged in'
      });
    }
  });
}
