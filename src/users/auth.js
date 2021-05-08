const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { UserModels } = require("../config/database");
const { comparePassword } = require("../utils/user");

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  UserModels.findAll({
    where: { id: id },
  }).then((users) => {
    done(users[0]);
  });
});

passport.use(
  "admin-login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    function (req, username, password, done) {
      UserModels.findAll({
        where: {
          username: username,
        },
      })
        .then((users) => {
          if (users === undefined || users.length == 0) {
            return done(null, false, { message: "User not found" });
          } else {
            const user = users[0];
            comparePassword(password, user.password, (err, response) => {
              if (err) {
                return done(err);
              }
              if (response) {
                return done(null, user);
              } else {
                return done(null, false, {
                  success: response,
                  message: "Incorrect password",
                });
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  )
);
