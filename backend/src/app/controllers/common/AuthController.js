const User = require("../../models/User");
const Counter = require("../../models/Counter");

const RefreshToken = require("../../models/RefreshToken")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const axios = require("axios");
const otpGenerator = require('otp-generator');
const Otp = require("../../models/Otp")
const accountSid = "ACe0d93ad84b8c2d6b3f58e7d8abaa8010";
const authToken = "ed8d0826c472d43558e039ec76c70d53";
const twilio = require('twilio')(accountSid, authToken);
const MongoStore = require('connect-mongo')
const generateAccessToken= (user)=>{
  return jwt.sign(
    {
      id: user.userId,
      role: user.role
    },
    "access_key",
    { expiresIn: "10s" }
  );
}

const generateRefreshToken= (user)=>{
  return jwt.sign(
    {
      id: user.userId,
      role: user.role  
    },
    "refresh_key",
    { expiresIn: "14d" }
  );
}
class AuthController {
  //  [POST] /login/register
  async register(req, res, next) {
    // Get info
    const formData = req.body;
    // Encode pass
    const salt = await bcrypt.genSalt(10);
    formData.password = await bcrypt.hash(formData.password, salt);
    // Add db
     
    const user = new User({
        userId: formData.userId,
        username:formData.username,
        password:formData.password,
        phone: formData.phone
    })
    user.save()
      .then((user) => {
       
        res.status(200).json(user)})
      .catch((error) => {
     

        res.status(500).json(error);
      });
  
  }

  //  [POST] /login
  async login(req, res) {
    const user = await User.findOne({ username: req.body.username }).populate("wishlist");
   
      // Check account
   if (!user) {
    return res.status(404).json("Incorrect username");
  }
  // Check pass
  let validPassword =false
  if(user.password){
     validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
  }
  if (!validPassword) {
    return res.status(404).json("Incorrect password");
  }
  // Return token
  if (user && validPassword) {
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    // Save refreshToken to db
    const refreshTokens = new RefreshToken({name:refreshToken,userId:user.userId});
    await refreshTokens.save()
    // Save refreshToken to Cookie
    res.cookie("refreshtoken", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    req.session.refreshToken = refreshToken;
    // Exclude pass .0  
    const { password, ...others } = user._doc;
     res.status(200).json({ ...others, accessToken });
   
    }
  }

  //  [POST] /login/refresh
  async requestRefreshToken(req, res) {
    //Take refresh token from user
    
    const refreshToken = req.cookies.refreshtoken;

    console.log("==============================================",refreshToken)
   
    //Send error if token is not valid
    if (!refreshToken) return res.status(401).json("You're not authenticated");

    // Check RToken in Db
    const valid = await RefreshToken.findOne({ name: refreshToken});
    if (!valid) {
      return res.status(403).json("Refresh token is not valid");
    }

    // Delete old RToken
    await RefreshToken.deleteOne( { "name":  refreshToken} )

    jwt.verify(refreshToken, "refresh_key", (err, user) => {
      if (err) {
        console.log(err)
      }
      //create new access token, refresh token and send to user
      const newAccessToken = generateAccessToken(user)
      const newRefreshToken = generateRefreshToken(user)
      const refreshTokens = new RefreshToken({name:newRefreshToken});
      refreshTokens.save()
      res.cookie("refreshtoken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({
        accessToken: newAccessToken
      });
    });
  }

  //  [POST] /login/logout
  async logOut(req, res) {
    //Clear cookies when user logs out
    if(req?.user){
      req.logout();
    }
    
    await RefreshToken.deleteOne( { "name":   req.cookies.refreshToken} )
    res.clearCookie("refreshtoken");
    res.status(200).json("Logged out successfully!");
   
    //res.redirect(CLIENT_URL);
  }
  async logOutPassport(req,res){
    req.session.destroy(function (err) {
      res.redirect('/'); //Inside a callback… bulletproof!
    });
  }

  async loginSuccess(req,res){
    

    const user = req.user
      if(user){
       
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user)
        // Save refreshToken to db
        const refreshTeokens = new RefreshToken({name:refreshToken, userId:user.userId});
        await refreshTeokens.save()
        // Save refreshToken to Cookie
        res.cookie("refreshtoken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        // Exclude pass .0  
        // if(user.password){
        //   const { password, ...others } = user._doc;
        //   res.status(200).json({ ...others, accessToken });
        //   var returnedUser = Object.assign({},user,{password: undefined})
        // }
        // else {
        //   res.status(200).json({ user, accessToken });
        // }
        res.status(200).json({ ...user, accessToken });
      }
  }

  async signup  (req,res){
    const OTP = Math.floor(100000 + Math.random() * 900000)
    console.log(req.body.phone)
    const phone = req.body.phone;
    const VN = "+84" + phone.slice(1,13)
    console.log("otp",OTP)
    if(phone==="0964293499"){
        twilio.messages 
              .create({         
                body: `Verification Code ${OTP}`,  
                messagingServiceSid: 'MGf91c0e22aae964ea44b64197162f4329',      
                to: VN 
              }) 
              .then(message => console.log(message.sid)) 
              .done();
    }

    const otp = new Otp({ phone: phone, otp: OTP });
    const salt = await bcrypt.genSalt(10)
    otp.otp = await bcrypt.hash(otp.otp, salt);
    const result = await otp.save();
    return res.status(200).send("Otp send successfully!");
  }

  async verifyOTP(req,res){
    const otpHolder = await Otp.find({
      phone: req.body.phone
    });
    if (otpHolder.length === 0) return res.status(400).send("You use an Expired OTP!");
    const rightOtpFind = otpHolder[otpHolder.length - 1];
    const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

    const exist = await User.find({phone:req.body.phone}).populate("wishlist")
    console.log(exist)
    if (rightOtpFind.phone === req.body.phone && validUser) {
         // insert new user if not yet exist

         Otp.deleteMany({
          phone: rightOtpFind.phone
        });
         if(exist[0]){
            const accessToken = generateAccessToken(exist[0])
            const refreshToken = generateRefreshToken(exist[0])
            // Save refreshToken to db
            new RefreshToken({name:refreshToken , userId:exist[0].userId}).save()
            // Save refreshToken to Cookie
            res.cookie("refreshtoken", refreshToken, {
              httpOnly: true,
              secure: false,
              path: "/",
              sameSite: "strict",
            });
            // Exclude pass .0  
            const { password, ...others } = exist[0]._doc;
              res.status(200).json({ ...others, accessToken });
         }
         else{
              Counter.findOneAndUpdate({collectionName:"user"},
            {"$inc":{seq:1}},{new:true},
            (err,cd)=>{
                let id = cd.seq
                new User({
                  userId: id,       
                    phone:req.body.phone,
                    verifyPhone:true,                               
                }).save()
                .then( user => 
                    {
                      const accessToken = generateAccessToken(user)
                      const refreshToken = generateRefreshToken(user)
                      // Save refreshToken to db
                      new RefreshToken({name:refreshToken , userId:id}).save()
                      // Save refreshToken to Cookie
                      res.cookie("refreshtoken", refreshToken, {
                        httpOnly: true,
                        secure: false,
                        path: "/",
                        sameSite: "strict",
                      });
                      // Exclude pass .0  
                      const { password, ...others } = user._doc;
                        res.status(200).json({ ...others, accessToken });
                    }
                  )
            })
         }
         
    } else {
        return res.status(400).send("Your OTP was wrong!")
    }
    }

    
    async loginSuccessPhone(req,res){
  
      const user = await User.findOne({ phone: req.body.phone });
    
        if(user){
         
          const accessToken = generateAccessToken(user)
          const refreshToken = generateRefreshToken(user)
          // Save refreshToken to db
          const refreshTeokens = new RefreshToken({name:refreshToken, userId:user.userId});
          await refreshTeokens.save()
          // Save refreshToken to Cookie
          res.cookie("refreshtoken", refreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
          });
          const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
          
        }
        else{
          Counter.findOneAndUpdate({collectionName:"user"},
        {"$inc":{seq:1}},{new:true},
        (err,cd)=>{
            let id = cd.seq
            new User({
              userId: id,       
                phone:req.body.phone,
                verifyPhone:true,                               
            }).save()
            .then( user => 
                {
                  const accessToken = generateAccessToken(user)
                  const refreshToken = generateRefreshToken(user)
                  // Save refreshToken to db
                  new RefreshToken({name:refreshToken , userId:id}).save()
                  // Save refreshToken to Cookie
                  res.cookie("refreshtoken", refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: "/",
                    sameSite: "strict",
                  });
                  // Exclude pass .0  
                  const { password, ...others } = user._doc;
                    res.status(200).json({ ...others, accessToken });
                }
              )
        })
     }
    }
    async loginAdmin(req, res) {
      const user = await User.findOne({ username: req.body.username }).populate("wishlist");
     
        // Check account
     if (!user) {
      return res.status(404).json("Incorrect username");
    }
    if(user.role !="0"){
      return res.status(404).json("Incorrect account");
    }
    // Check pass
    let validPassword =false
    if(user.password){
       validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
    }
    if (!validPassword) {
      return res.status(404).json("Incorrect password");
    }
    // Return token
    if (user && validPassword) {
      const accessToken = generateAccessToken(user)
      const refreshToken = generateRefreshToken(user)
      // Save refreshToken to db
      const refreshTokens = new RefreshToken({name:refreshToken,userId:user.userId});
      await refreshTokens.save()
      // Save refreshToken to Cookie
      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        // sameSite: "strict",
      });
      // req.session.refreshToken= refreshToken
      // Exclude pass .0  
      const { password, ...others } = user._doc;
       res.status(200).json({ ...others, accessToken });
     
      }
    }
  
}

module.exports = new AuthController();
