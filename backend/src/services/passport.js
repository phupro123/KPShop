const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;



const passport = require("passport");


const GOOGLE_CLIENT_ID ="980008302286-b9ar3crpidujm6abjdpptabhjvuicbub.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

FACEBOOK_APP_ID = "1453202605185152";
FACEBOOK_APP_SECRET = "bfb6d1ac960003b288e75efcced7b7fd";
const User = require("../app/models/User");

const Counter = require("../app/models/Counter");

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true
    },
    (req,accessToken, refreshToken, profile, done) => {
      process.nextTick(() => {
      const {userId,connect} = JSON.parse(req.query.state)
      
      if (connect =='0') {
        
          User.findOne({ googleId: profile.id }).then(existingUser => {
            if (existingUser) {
              done(null, existingUser);
            } else {
                // insert new user id
                Counter.findOneAndUpdate({collectionName:"user"},
                {"$inc":{seq:1}},{new:true},
                (err,cd)=>{
                    let id = cd.seq
                    new User({
                      userId: id,
                        username:profile.emails[0].value,
                        phone:"",
                        verifyMail:true,
                        googleId:profile.id,
                        fullname: profile.displayName,
                        gender:"",
                        birthday:"",
                        image: profile._json.picture
                    }).save()
                    .then((info) => done(null, info ))         
                })
            }
          });
          
      } else {
        User.findOne({userId:userId}).then((user)=>{
          User.findOne({ googleId: profile.id }).then(existingUser => {
            if (existingUser) {
              done(null,user);
            } else {
                  User.updateOne({ _id: user._id }, {googleId:profile.id})
                    .then(() => {
                      User.findOne({ _id: user._id }).then(existingUser => {
                        if (existingUser) {
                          done(null, existingUser);
                        }})
                    })
                    .catch((err) => {
                      return res.status(500).json(err);
                    });
            }})
        })
        
      }
    }
      )
    }
  )
);

// // For facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
      passReqToCallback: true
    },
    (req,accessToken, refreshToken, profile, done) => {
      process.nextTick(() => {
      const {userId,connect} = JSON.parse(req.query.state)
      console.log(userId,connect);
      if (connect =='0') {
        
          User.findOne({ fbId: profile.id }).then(existingUser => {
            if (existingUser) {
              done(null, existingUser);
            } else {
              // new user case
              Counter.findOneAndUpdate({collectionName:"user"},
              {"$inc":{seq:1}},{new:true},
              (err,cd)=>{
                  let id = cd.seq
                  new User({
                    userId: id,
                      // username:profile.emails[0].value,
                      phone:"",
                      fbId:profile.id,
                      fullname: profile.displayName,
                      gender:"",
                      birthday:"",
                      // image: profile._json.picture
                  }).save()
                  .then((info) => done(null, info ))         
              })
            }
          });
          
      } else {
        User.findOne({userId:userId}).then((user)=>{
          User.findOne({ fbId: profile.id }).then(existingUser => {
            if (existingUser) {
              done(null,user);
            } else {

                     User.updateOne({ _id: user._id }, {fbId:profile.id})
                    .then(() => {
                      User.findOne({ _id: user._id }).then(existingUser => {
                        if (existingUser) {
                          done(null, existingUser);
                        }})
                    })
                    .catch((err) => {
                      return res.status(500).json(err);
                    });
            }})
        })
        
      }
    }
      )
    }
  )
);

passport.serializeUser((user, done) => {
  
  done(null, user.userId);
});

passport.deserializeUser((userId, done) =>  {
  
  try {
    
    User.findOne({  userId },(err,user)=>{
      const { password, ...others } = user._doc;
      done(null,others)
    } );
     
  } catch (err) {
    done(err);
  }
});

