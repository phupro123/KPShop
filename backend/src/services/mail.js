const nodemailer = require('nodemailer');
const Otp = require('../app/models/Otp');
const bcrypt = require("bcrypt");
const User = require('../app/models/User');
const {  numberWithCommas } = require('../config/db/numberWithCommas');
const m = "huynhlaiphu2001@gmail.com"
const p = "wmniwmqhjlknzfmk"
var transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:m,
        pass:p,
    }
})


class MailController {
    //-----------------------------------------------------------------------
    async changeEmail (req,res){
        const OTP = Math.floor(100000 + Math.random() * 900000)
        const phone = req.body.phone;
        const mail_configs={
            from:m,
            to: req.body.phone,
            subject:'Xác minh địa chỉ email của bạn',
            html:`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Document</title>
            </head>
            <body>
            <div style="padding:0;font-family:'Segoe UI Light','Segoe UI','Helvetica Neue Medium',Arial,sans-serif;font-size:41px;color:#2672ec">Xác minh địa chỉ email của bạn</div>
            <br>
            <div id="m_5038124442963670510i4" style="padding:0;padding-top:25px;font-family:'Segoe UI',Tahoma,Verdana,Arial,sans-serif;font-size:14px;color:#2a2a2a">Để hoàn thành thiết lập tài khoản KPShop, chúng tôi chỉ cần đảm bảo địa chỉ email này là của bạn.</div>
            <div style="padding:0;padding-top:25px;font-family:'Segoe UI',Tahoma,Verdana,Arial,sans-serif;font-size:14px;color:#2a2a2a">Để xác minh địa chỉ email của bạn, hãy sử dụng mã bảo mật này: <span style="font-family:'Segoe UI Bold','Segoe UI Semibold','Segoe UI','Helvetica Neue Medium',Arial,sans-serif;font-size:18px;font-weight:bold;color:#2a2a2a">${OTP}</span></div>
            <div style="padding:0;padding-top:25px;font-family:'Segoe UI',Tahoma,Verdana,Arial,sans-serif;font-size:14px;color:#2a2a2a">Xin cám ơn,</div>
            <div id="m_5038124442963670510i8" style="padding:0;font-family:'Segoe UI',Tahoma,Verdana,Arial,sans-serif;font-size:14px;color:#2a2a2a">KPShop</div>
            </body>
            </html>`
            }

        transporter.sendMail(mail_configs,function(error,info){
            if(error){
                console.log(error)
            }
        })
        const otp = new Otp({ phone: phone, otp: OTP });
        const salt = await bcrypt.genSalt(10)
        otp.otp = await bcrypt.hash(otp.otp, salt);
        const result = await otp.save();
        return res.status(200).send("Otp send successfully!");
      }
    
      //-----------------------------------------------------------------------
      async verifyOTP(req,res){
            const otpHolder = await Otp.find({
            phone: req.body.phone
            });
            if (otpHolder.length === 0) return res.status(200).json("Your OTP was wrong!");
            const rightOtpFind = otpHolder[otpHolder.length - 1];
            const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);
        
            if (rightOtpFind.phone === req.body.phone && validUser) {
        
                Otp.deleteMany({
                phone: rightOtpFind.phone
                });
               
                await User.updateOne({ _id: req.body.user },{username:req.body.phone})
                    .then(() => {
                    User.findById(req.body.user).then((user) => {
                    
                        res.status(200).json(user);
                    });
                    })
                    .catch((err) => {
                    return res.status(500).json(err);
                    });
                
                
            } else {
                return res.status(200).json("Your OTP was wrong!")
            }
        } 
    //-----------------------------------------------------------------------
    async forgetPass (req,res){
        
        const username = req.body.username;
       let user =await User.findOne({username:username})

       const OTP = Math.floor(1000000 + Math.random() * 900000)
       const id = `$@#Ac${OTP}@1axcA`
        const link = `http://localhost:3000/forget-password/a21Veq${user._id}${id}`

        const mail_configs={
            from:m,
            to: username,
            subject:'Yêu cầu thay đổi mật khẩu',
            html:`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Document</title>
            </head>
            <body>
            <div style="padding:0;font-family:'Segoe UI Light','Segoe UI','Helvetica Neue Medium',Arial,sans-serif;font-size:41px;color:#2672ec">Thay đổi mật khẩu KPShop</div>
            <br>
            <div style="padding:0;padding-top:25px;font-family:'Segoe UI',Tahoma,Verdana,Arial,sans-serif;font-size:14px;color:#2a2a2a">Để hoàn thành thiết lập mật khẩu mới, hãy truy cập đường link này: <span style="font-family:'Segoe UI Bold','Segoe UI Semibold','Segoe UI','Helvetica Neue Medium',Arial,sans-serif;font-size:18px;font-weight:bold;color:#2a2a2a"><a href="${link}">Link</a></span></div>
            <div id="m_5038124442963670510i4" style="padding:0;padding-top:25px;font-family:'Segoe UI',Tahoma,Verdana,Arial,sans-serif;font-size:14px;color:#2a2a2a"> Lưu ý: đường dẫn chỉ có hiệu lực trong vòng 30 phút.</div>
            <div style="padding:0;padding-top:25px;font-family:'Segoe UI',Tahoma,Verdana,Arial,sans-serif;font-size:14px;color:#2a2a2a">Xin cám ơn,</div>
            <div id="m_5038124442963670510i8" style="padding:0;font-family:'Segoe UI',Tahoma,Verdana,Arial,sans-serif;font-size:14px;color:#2a2a2a">KPShop</div>
            </body>
            </html>`
            }

        transporter.sendMail(mail_configs,function(error,info){
            if(error){
                console.log(error)
            }
        })
        return res.status(200).send("Otp send successfully!");
    }

    async editForgetPass(req,res){
        const id = req.body.id
        const _id = id.slice(6,30)
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
            await User.updateOne({ _id: _id  },{password:password})
                .then((user) => {
               
                
                    res.status(200).json(user);
              
                })
                .catch((err) => {
                return res.status(500).json(err);
                });
       
     } 

    async sentMail(req, res, next) {
        return new Promise((resolve, reject) => {
            const mail_configs={
                from:m,
                to:'buapro874@gmail.com',
                subject:'Testing',
                text:'day la test'
            }

            transporter.sendMail(mail_configs,function(error,info){
                if(error){
                    return reject({message: error})
                }
                return resolve({message:"Email sent succesfuly"})
            })
        });
    }

    async orderSucess (req,res){
        const data = req.body
        const userId = data?.customer_id;
       let user =await User.findOne({userId:userId})

       
        const mail_configs={
            from:m,
            to: user.username,
            subject:'Đặt hàng thành công từ KPShop',
            html:`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
             <head>
              <meta charset="UTF-8">
              <meta content="width=device-width, initial-scale=1" name="viewport">
              <meta name="x-apple-disable-message-reformatting">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta content="telephone=no" name="format-detection">
              <title>New email template 2023-07-04</title><!--[if (mso 16)]>
                <style type="text/css">
                a {text-decoration: none;}
                </style>
                <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
            <xml>
                <o:OfficeDocumentSettings>
                <o:AllowPNG></o:AllowPNG>
                <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
            </xml>
            <![endif]--><!--[if !mso]><!-- -->
              <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap" rel="stylesheet"><!--<![endif]-->
              <style type="text/css">
            .rollover:hover .rollover-first {
              max-height:0px!important;
              display:none!important;
              }
              .rollover:hover .rollover-second {
              max-height:none!important;
              display:inline-block!important;
              }
              .rollover div {
              font-size:0px;
              }
              u ~ div img + div > div {
              display:none;
              }
              #outlook a {
              padding:0;
              }
              span.MsoHyperlink,
            span.MsoHyperlinkFollowed {
              color:inherit;
              mso-style-priority:99;
              }
              a.es-button {
              mso-style-priority:100!important;
              text-decoration:none!important;
              }
              a[x-apple-data-detectors] {
              color:inherit!important;
              text-decoration:none!important;
              font-size:inherit!important;
              font-family:inherit!important;
              font-weight:inherit!important;
              line-height:inherit!important;
              }
              .es-desk-hidden {
              display:none;
              float:left;
              overflow:hidden;
              width:0;
              max-height:0;
              line-height:0;
              mso-hide:all;
              }
              .es-header-body a:hover {
              color:#3B8026!important;
              }
              .es-content-body a:hover {
              color:#3B8026!important;
              }
              .es-footer-body a:hover {
              color:#ffffff!important;
              }
              .es-infoblock a:hover {
              color:#cccccc!important;
              }
              .es-button-border:hover > a.es-button {
              color:#ffffff!important;
              }
            @media only screen and (max-width:600px) {.es-m-p20b { padding-bottom:20px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0px!important } .es-m-p20b { padding-bottom:20px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0px!important } .es-m-p20b { padding-bottom:20px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0px!important } *[class="gmail-fix"] { display:none!important } p, a { line-height:150%!important } h1, h1 a { line-height:120%!important } h2, h2 a { line-height:120%!important } h3, h3 a { line-height:120%!important } h4, h4 a { line-height:120%!important } h5, h5 a { line-height:120%!important } h6, h6 a { line-height:120%!important } .es-header-body p { } .es-content-body p { } .es-footer-body p { } .es-infoblock p { } h1 { font-size:30px!important; text-align:center } h2 { font-size:24px!important; text-align:left } h3 { font-size:20px!important; text-align:left } h4 { font-size:24px!important; text-align:left } h5 { font-size:20px!important; text-align:left } h6 { font-size:16px!important; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:24px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px!important } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px!important } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px!important } .es-menu td a { font-size:14px!important } .es-header-body p, .es-header-body a { font-size:14px!important } .es-content-body p, .es-content-body a { font-size:14px!important } .es-footer-body p, .es-footer-body a { font-size:12px!important } .es-infoblock p, .es-infoblock a { font-size:12px!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right!important } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img, .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline!important } .es-m-txt-r .rollover div, .es-m-txt-c .rollover div, .es-m-txt-l .rollover div { line-height:0!important; font-size:0!important } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:18px!important } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block!important } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block!important } .es-adaptive table, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .adapt-img:not([src*="default-img"]) { width:100%!important; height:auto!important } .es-mobile-hidden, .es-hidden { display:none!important } .es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } .es-social td { padding-bottom:10px } a.es-button, button.es-button { display:inline-block!important } .es-button-border { display:inline-block!important } }
            </style>
             </head>
             <body style="width:100%;height:100%;padding:0;Margin:0">
              <div class="es-wrapper-color" style="background-color:#FF6E12"><!--[if gte mso 9]>
                        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                            <v:fill type="tile" color="#FF6E12"></v:fill>
                        </v:background>
                    <![endif]-->
               <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FF6E12">
                 <tr>
                  <td valign="top" style="padding:0;Margin:0">
                   <table cellpadding="0" cellspacing="0" class="es-header" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
                     <tr>
                      <td align="center" style="padding:0;Margin:0">
                       <table bgcolor="#ffffff" class="es-header-body" align="center" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                         <tr>
                          <td align="left" bgcolor="#1A93FE" style="padding:20px;Margin:0;background-color:#1A93FE"><!--[if mso]><table style="width:560px" cellpadding="0"
                                        cellspacing="0"><tr><td style="width:241px" valign="top"><![endif]-->
                           <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                             <tr>
                              <td align="left" style="padding:0;Margin:0;width:241px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="center" style="padding:0;Margin:0;font-size:0"><img class="adapt-img" src="https://qisexl.stripocdn.email/content/guids/CABINET_312f7feecf2fa0b34b903082730043ea6e67f1c75d6e95fea6ad2326743e75c5/images/untitled.png" alt="" width="241" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table><!--[if mso]></td><td style="width:20px"></td><td style="width:299px" valign="top"><![endif]-->
                           <table cellpadding="0" cellspacing="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr>
                              <td align="left" style="padding:0;Margin:0;width:299px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="right" style="padding:0;Margin:0;font-size:0"><img class="adapt-img" src="https://qisexl.stripocdn.email/content/guids/CABINET_312f7feecf2fa0b34b903082730043ea6e67f1c75d6e95fea6ad2326743e75c5/images/image_yDr.png" alt="" width="3" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table><!--[if mso]></td></tr></table><![endif]--></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table>
                   <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
                     <tr>
                      <td align="center" style="padding:0;Margin:0">
                       <table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#ffffff;width:600px" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                         <tr>
                          <td align="left" bgcolor="#f5fdfd" style="padding:40px;Margin:0;background-color:#f5fdfd;background-image:url(https://qisexl.stripocdn.email/content/guids/CABINET_8441968d2b8b0fa0d5c16213495836ab5c998a12a39236014c008949c5a7d3c0/images/3760406_76332_converted_1.png);background-repeat:no-repeat;background-position:center center" background="https://qisexl.stripocdn.email/content/guids/CABINET_8441968d2b8b0fa0d5c16213495836ab5c998a12a39236014c008949c5a7d3c0/images/3760406_76332_converted_1.png"><!--[if mso]><table style="width:520px" cellpadding="0" cellspacing="0"><tr><td style="width:65px" valign="top"><![endif]-->
                           <table cellpadding="0" cellspacing="0" align="left" class="es-left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                             <tr class="es-mobile-hidden">
                              <td class="es-m-p20b" align="center" valign="top" style="padding:0;Margin:0;width:45px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="center" class="es-m-p0t es-m-p0b" height="40" style="padding:0;Margin:0"></td>
                                 </tr>
                               </table></td>
                              <td class="es-hidden" style="padding:0;Margin:0;width:20px"></td>
                             </tr>
                           </table><!--[if mso]></td><td style="width:390px" valign="top"><![endif]-->
                           <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                             <tr class="es-mobile-hidden">
                              <td class="es-m-p20b" align="center" valign="top" style="padding:0;Margin:0;width:390px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="center" class="es-m-p0t es-m-p0b" height="40" style="padding:0;Margin:0"></td>
                                 </tr>
                               </table></td>
                             </tr>
                             <tr>
                              <td align="center" valign="top" style="padding:0;Margin:0;width:390px">
                               <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:20px;background-color:#ff6e12" bgcolor="#ff6e12" role="presentation">
                                 <tr>
                                  <td align="center" style="Margin:0;padding-top:40px;padding-right:20px;padding-bottom:20px;padding-left:20px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:'Josefin Sans', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#ffffff;font-size:14px">Xin chào<br>${data?.fullname}</p></td>
                                 </tr>
                                 <tr>
                                  <td align="center" class="es-m-p0t es-m-p0b" style="Margin:0;padding-right:20px;padding-left:20px;padding-top:5px;padding-bottom:5px;font-size:0px">
                                   <table border="0" width="20%" height="100%" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:20% !important;display:inline-table" role="presentation">
                                     <tr>
                                      <td style="padding:0;Margin:0;border-bottom:4px dotted #3b8026;background:none;height:1px;width:100%;margin:0px"></td>
                                     </tr>
                                   </table></td>
                                 </tr>
                                 <tr>
                                  <td align="center" style="Margin:0;padding-right:20px;padding-left:20px;padding-top:20px;padding-bottom:40px"><h1 style="Margin:0;font-family:'Josefin Sans', helvetica, arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:40px;font-style:normal;font-weight:normal;line-height:48px;color:#ffffff">Đặt hàng</h1><h1 style="Margin:0;font-family:'Josefin Sans', helvetica, arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:40px;font-style:normal;font-weight:normal;line-height:48px;color:#ffffff">thành công</h1></td>
                                 </tr>
                               </table></td>
                             </tr>
                             <tr class="es-mobile-hidden">
                              <td class="es-m-p20b" align="center" valign="top" style="padding:0;Margin:0;width:390px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="center" class="es-m-p0t es-m-p0b" height="40" style="padding:0;Margin:0"></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table><!--[if mso]></td><td style="width:20px"></td><td style="width:45px" valign="top"><![endif]-->
                           <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                             <tr class="es-mobile-hidden">
                              <td align="center" valign="top" style="padding:0;Margin:0;width:45px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="center" class="es-m-p0t es-m-p0b" height="40" style="padding:0;Margin:0"></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table><!--[if mso]></td></tr></table><![endif]--></td>
                         </tr>
                         <tr>
                          <td align="left" style="Margin:0;padding-right:20px;padding-left:20px;padding-bottom:40px;padding-top:30px">
                           <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr>
                              <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td style="padding:0;Margin:0">
                                   <table cellpadding="0" cellspacing="0" width="100%" class="es-menu" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                     <tr class="links-images-top">
                                      <td align="center" valign="top" width="100%" id="esd-menu-id-0" style="Margin:0;border:0;padding-top:10px;padding-right:5px;padding-bottom:10px;padding-left:5px"><a target="_blank" href="" style="mso-line-height-rule:exactly;text-decoration:none;font-family:'Josefin Sans', helvetica, arial, sans-serif;display:block;color:#3B8026;font-size:18px"><img src="https://qisexl.stripocdn.email/content/guids/CABINET_8441968d2b8b0fa0d5c16213495836ab5c998a12a39236014c008949c5a7d3c0/images/icons8shoppingbag52.png" alt="Đơn hàng #${data?._id}" title="Đơn hàng #${data?._id}" align="absmiddle" width="22" style="display:inline !important;font-size:14px;border:0;outline:none;text-decoration:none;vertical-align:middle;padding-bottom:10px"><br>Đơn hàng #${data?._id}</a></td>
                                     </tr>
                                   </table></td>
                                 </tr>
                                 <tr>
                                  <td style="padding:0;Margin:0">
                                   <table cellpadding="0" cellspacing="0" width="100%" class="es-menu" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                     <tr class="links-images-top">
                                      <td align="center" valign="top" width="100%" id="esd-menu-id-0" style="Margin:0;border:0;padding-top:10px;padding-right:5px;padding-bottom:10px;padding-left:5px"><a target="_blank" href="" style="mso-line-height-rule:exactly;text-decoration:none;font-family:'Josefin Sans', helvetica, arial, sans-serif;display:block;color:#3B8026;font-size:18px"><img src="https://qisexl.stripocdn.email/content/guids/CABINET_8441968d2b8b0fa0d5c16213495836ab5c998a12a39236014c008949c5a7d3c0/images/icons8location48.png" alt="1940 Colonial Hills Line" title="1940 Colonial Hills Line" align="absmiddle" width="22" style="display:inline !important;font-size:14px;border:0;outline:none;text-decoration:none;vertical-align:middle;padding-bottom:10px"><br>${data.address}</a></td>
                                     </tr>
                                   </table></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                         <tr>
                          <td class="esdev-adapt-off" align="left" bgcolor="#fff2cc" style="Margin:0;padding-right:20px;padding-bottom:20px;padding-left:20px;padding-top:25px;background-color:#fff2cc;border-radius:20px 20px 0px 0px">
                           <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px">
                             <tr>
                              <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                               <table cellpadding="0" cellspacing="0" align="left" class="es-left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                 <tr>
                                  <td align="center" valign="top" style="padding:0;Margin:0;width:180px">
                                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                     <tr>
                                      <td align="center" style="padding:0;Margin:0"><h4 style="Margin:0;font-family:'Josefin Sans', helvetica, arial, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:14px;font-style:normal;font-weight:normal;line-height:17px;color:#333333">&nbsp;</h4></td>
                                     </tr>
                                   </table></td>
                                 </tr>
                               </table></td>
                              <td style="padding:0;Margin:0;width:20px"></td>
                              <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                               <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                 <tr>
                                  <td align="left" style="padding:0;Margin:0;width:130px">
                                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                     <tr>
                                      <td align="center" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:'Josefin Sans', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#38363A;font-size:14px">Tên</p></td>
                                     </tr>
                                   </table></td>
                                 </tr>
                               </table></td>
                              <td style="padding:0;Margin:0;width:20px"></td>
                              <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                               <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                 <tr>
                                  <td align="left" style="padding:0;Margin:0;width:95px">
                                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                     <tr>
                                      <td align="center" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:'Josefin Sans', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#38363A;font-size:14px">Số lượng</p></td>
                                     </tr>
                                   </table></td>
                                 </tr>
                               </table></td>
                              <td style="padding:0;Margin:0;width:20px"></td>
                              <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                               <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                 <tr>
                                  <td align="left" style="padding:0;Margin:0;width:95px">
                                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                     <tr>
                                      <td align="center" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:'Josefin Sans', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#38363A;font-size:14px">Giá</p></td>
                                     </tr>
                                   </table></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                         <tr>
                          <td align="left" bgcolor="#fff2cc" style="Margin:0;padding-right:20px;padding-left:20px;padding-top:10px;padding-bottom:10px;background-color:#fff2cc">
                           <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr>
                              <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="center" class="es-m-p0t es-m-p0b" style="Margin:0;padding-right:20px;padding-left:20px;padding-top:5px;padding-bottom:5px;font-size:0px">
                                   <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                     <tr>
                                      <td style="padding:0;Margin:0;border-bottom:4px dotted #3b8026;background:none;height:1px;width:100%;margin:0px"></td>
                                     </tr>
                                   </table></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                         ${data?.order_items?.map((e)=>{
                            return `
                                <tr>
                                <td class="esdev-adapt-off" align="left" bgcolor="#fff2cc" style="padding:0;Margin:0;padding-right:20px;padding-left:20px;padding-top:20px;background-color:#fff2cc">
                                 <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px">
                                   <tr>
                                    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                                     <table cellpadding="0" cellspacing="0" align="left" class="es-left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                       <tr>
                                        <td align="center" valign="top" style="padding:0;Margin:0;width:180px">
                                         <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                           <tr>
                                           <td align="center" style="padding:0;Margin:0;font-size:0px"><a target="_blank" href="" style="mso-line-height-rule:exactly;text-decoration:none;color:#3B8026;font-size:14px"><img class="p_image adapt-img" src=${e.img} alt="" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none;border-radius:10px" height="120"></a></td>
                                           </tr>
                                         </table></td>
                                       </tr>
                                     </table></td>
                                    <td style="padding:0;Margin:0;width:20px"></td>
                                    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                                     <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                       <tr>
                                        <td align="left" style="padding:0;Margin:0;width:130px">
                                         <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                           <tr>
                                            <td align="center" style="padding:0;Margin:0"><p class="p_name" style="Margin:0;mso-line-height-rule:exactly;font-family:'Josefin Sans', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#38363A;font-size:14px">${e.title}</p></td>
                                           </tr>
                                         </table></td>
                                       </tr>
                                     </table></td>
                                    <td style="padding:0;Margin:0;width:20px"></td>
                                    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                                     <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                       <tr>
                                        <td align="left" style="padding:0;Margin:0;width:95px">
                                         <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                           <tr>
                                            <td align="center" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:'Josefin Sans', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#38363A;font-size:14px">x${e.quantity}</p></td>
                                           </tr>
                                         </table></td>
                                       </tr>
                                     </table></td>
                                    <td style="padding:0;Margin:0;width:20px"></td>
                                    <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                                     <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                       <tr>
                                        <td align="left" style="padding:0;Margin:0;width:95px">
                                         <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                           <tr>
                                            <td align="center" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:'Josefin Sans', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#38363A;font-size:14px"><strong class="p_price">${numberWithCommas(e.price)}&nbsp;đ</strong></p></td>
                                           </tr>
                                         </table></td>
                                       </tr>
                                     </table></td>
                                   </tr>
                                 </table></td>
                               </tr>
                            `
                         })}
                        
                         <tr>
                          <td align="left" bgcolor="#fff2cc" style="Margin:0;padding-right:20px;padding-left:20px;padding-top:10px;padding-bottom:10px;background-color:#fff2cc">
                           <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr>
                              <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="center" class="es-m-p0t es-m-p0b" style="Margin:0;padding-right:20px;padding-left:20px;padding-top:5px;padding-bottom:5px;font-size:0px">
                                   <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                     <tr>
                                      <td style="padding:0;Margin:0;border-bottom:4px dotted #3b8026;background:none;height:1px;width:100%;margin:0px"></td>
                                     </tr>
                                   </table></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                         <tr>
                          <td class="esdev-adapt-off" align="left" bgcolor="#fff2cc" style="padding:20px;Margin:0;background-color:#fff2cc">
                           <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px">
                             <tr>
                              <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                               <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                                 <tr>
                                  <td align="left" style="padding:0;Margin:0;width:445px">
                                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                     <tr>
                                      <td align="right" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:'Josefin Sans', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#38363A;font-size:14px">Tạm tính:</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:'Josefin Sans', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#38363A;font-size:14px">Giảm giá:<br><strong>Tổng cộng</strong><br></p></td>
                                     </tr>
                                   </table></td>
                                 </tr>
                               </table></td>
                              <td style="padding:0;Margin:0;width:20px"></td>
                              <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                               <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                                 <tr>
                                  <td align="left" style="padding:0;Margin:0;width:95px">
                                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                     <tr>
                                      <td align="center" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:'Josefin Sans', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#38363A;font-size:14px">${numberWithCommas(data?.totalPrice)}&nbsp;đ</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:'Josefin Sans', helvetica, arial, sans-serif;line-height:21px;letter-spacing:0;color:#38363A;font-size:14px">${numberWithCommas(data?.discount)}&nbsp;&nbsp;&nbsp;đ<br><strong>${numberWithCommas(data?.totalPrice -data?.discount)}&nbsp;đ&nbsp;</strong></p></td>
                                     </tr>
                                   </table></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                         <tr>
                          <td align="left" style="padding:0;Margin:0">
                           <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr>
                              <td align="center" valign="top" style="padding:0;Margin:0;width:600px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://qisexl.stripocdn.email/content/guids/CABINET_312f7feecf2fa0b34b903082730043ea6e67f1c75d6e95fea6ad2326743e75c5/images/image_nbj.png" alt="" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none" width="600"></td>
                                 </tr>
                                 <tr>
                                  <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://qisexl.stripocdn.email/content/guids/CABINET_312f7feecf2fa0b34b903082730043ea6e67f1c75d6e95fea6ad2326743e75c5/images/image_nbj.png" alt="" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none;border-radius:0 0 65px 65px" width="600"></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                         <tr>
                          <td align="left" style="Margin:0;padding-right:20px;padding-left:20px;padding-top:20px;padding-bottom:40px">
                           <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr>
                              <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                               <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr>
                                  <td align="center" style="padding:0;Margin:0;padding-top:20px"><!--[if mso]><a href="" target="_blank" hidden>
                <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="" 
                            style="height:41px; v-text-anchor:middle; width:196px" arcsize="50%" stroke="f"  fillcolor="#ff6e12">
                    <w:anchorlock></w:anchorlock>
                    <center style='color:#ffffff; font-family:"Josefin Sans", helvetica, arial, sans-serif; font-size:15px; font-weight:400; line-height:15px;  mso-text-raise:1px'>Kiểm tra đơn hàng</center>
                </v:roundrect></a>
            <![endif]--><!--[if !mso]--><!-- --><span class="es-button-border msohide" style="border-style:solid;border-color:#2CB543;background:#ff6e12;border-width:0px;display:inline-block;border-radius:30px;width:auto;mso-hide:all"><a href="localhost:3000" class="es-button" target="_blank" style="mso-style-priority:100 !important;text-decoration:none !important;mso-line-height-rule:exactly;color:#FFFFFF;font-size:18px;padding:10px 20px 10px 20px;display:inline-block;background:#FF6E12;border-radius:30px;font-family:'Josefin Sans', helvetica, arial, sans-serif;font-weight:normal;font-style:normal;line-height:22px;width:auto;text-align:center;letter-spacing:0;mso-padding-alt:0;mso-border-alt:10px solid  #ff6e12">Kiểm tra đơn hàng</a></span><!--<![endif]--></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table>
              </div>
             </body>
            </html>
            `
            }

        transporter.sendMail(mail_configs,function(error,info){
            if(error){
                console.log(error)
            }
        })
        return res.status(200).send("Otp send successfully!");
    }

}

module.exports = new MailController();
