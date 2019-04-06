const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const facebookStartegy = require("passport-facebook").Strategy;
const keys = require("../config/keys");

passport.serializeUser((user, done) => {
  done(null, user[0].user_id);
});

passport.deserializeUser(async (id, done) => {
  const user = await knex("users").where("user_id", id);
  done(null, user[0]);
});

passport.use(
  new googleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/api/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existUser = await knex
        .select()
        .where("google_id", profile.id)
        .from("users");

      if (existUser.length >= 1) {
        done(null, existUser);
      } else {
        await knex("users").insert({
          name: profile.displayName,
          email: profile.emails[0].value,
          role_id: 2,
          google_id: profile.id
        });

        const newUser = await knex
          .select()
          .where("google_id", profile.id)
          .from("users");

        console.log(newUser);
        done(null, newUser);
      }
    }
  )
);

passport.use(
  new facebookStartegy(
    {
      clientID: keys.facebookId,
      clientSecret: keys.facebookSecretKey,
      callbackURL: "/api/auth/facebook/callback",
      profileFields: [
        "id",
        "displayName",
        "email",
        "birthday",
        "friends",
        "first_name",
        "last_name",
        "middle_name",
        "gender",
        "link"
      ]
    },
    async (accessToken, refreshToken, profile, done) => {
      //console.log(profile._json); // {id, name, first_name, lastname}
      const existUser = await knex("users").where(
        "facebook_id",
        profile._json.id
      );
      if (existUser.length >= 1) {
        return done(null, existUser);
      } else {
        await knex("users").insert({
          name: profile._json.name,
          role_id: 2,
          facebook_id: profile._json.id
        });
        const newUser = await knex
          .select()
          .where("facebook_id", profile._json.id)
          .from("users");

        //console.log(newUser);
        done(null, newUser);
      }
    }
  )
);
