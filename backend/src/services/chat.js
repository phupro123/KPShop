const request = require("request");
const Product = require("../app/models/Product");

const MY_TOKEN = 'token';
const PAGE_ACCESS_TOKEN="EABZAL7imO8xYBALhyrrR3uZBLoPYiDeXfcjXft9DN4BUoC93HbgOIOdOsVXJPEtjlFpHMQJC5ZCg6lRYgU8TycRC8z38rOsiWIQhmqP21e25D246ltRbfn2xJrqaCuc3m9QMWDYO3tyZAvOxOL2Y1vZChO7VvbGxWwb7r1dZCMKLBBrAHgP2xJ"


async function handleMessage(sender_psid, received_message){
    //check the incoming message is a quick reply?
    if (received_message && received_message.quick_reply && received_message.quick_reply.payload) {
        let payload = received_message.quick_reply.payload;
        if (payload === "CATEGORIES") {
            await sendCategories(sender_psid);

        } else if (payload === "LOOKUP_ORDER") {
            await sendLookupOrder(sender_psid);

        } else if (payload === "TALK_AGENT") {
            await requestTalkToAgent(sender_psid);
        }

        return;
    }


    let response;

    // Check if the message contains text
    if (received_message.text == "thanh toán") {
        // Create the payload for a basic text message
        response = {
            "text": `Shop có 2 hình thức thanh toán là: 
                    Thanh toán trực tiếp bằng tiền mặt
                    Thanh toán bằng ví Momo`
        }
    } else if (received_message.attachments) {
        // Get the URL of the message attachment
        let attachment_url = received_message.attachments[0].payload.url;
        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Is this the right picture?",
                        "subtitle": "Tap a button to answer.",
                        "image_url": attachment_url,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Yes!",
                                "payload": "yes",
                            },
                            {
                                "type": "postback",
                                "title": "No!",
                                "payload": "no",
                            }
                        ],
                    }]
                }
            }
        }
    }
}
async function handlePostback (sender_psid, received_postback) {
    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    switch (payload) {
        case "GET_STARTED":
        case "RESTART_CONVERSATION":
            await sendMessageWelcomeNewUser(sender_psid);
            break;
        case "TALK_AGENT":
            await requestTalkToAgent(sender_psid);
            break;
        case "SHOW_HEADPHONES":
            await showHeadphones(sender_psid);
            break;
        case "SHOW_TV":
            await showTVs(sender_psid);
            break;
        case "SHOW_PLAYSTATION":
            await showPlaystation(sender_psid);
            break;
        case "BACK_TO_CATEGORIES":
            await backToCategories(sender_psid);
            break;
        case "BACK_TO_MAIN_MENU":
            await backToMainMenu(sender_psid);
            break;
        default:
            console.log("run default switch case")

    }
};
// Sends the response message


function sendMessageWelcomeNewUser  (sender_psid)  {
    return new Promise(async (resolve, reject) => {
        try {
            
            //send text message
            let response1 = {
                "text": `Chào mừng bạn đến với KP Shop.`
            };
            //send a quick reply
            let response4 = {
                "text": "Bạn cần giúp gì?",
                "quick_replies": [
                    {
                        "content_type": "text",
                        "title": "Danh mục",
                        "payload": "CATEGORIES",
                    },
                    {
                        "content_type": "text",
                        "title": "Mã giảm giá",
                        "payload": "LOOKUP_ORDER",
                    },
                    {
                        "content_type": "text",
                        "title": "Nhắn với nhân viên",
                        "payload": "TALK_AGENT",
                    },
                ]
            };

            await sendMessage(sender_psid, response1);
            await sendMessage(sender_psid, response4);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

 function sendTypingOn (sender_psid) {
    return new Promise((resolve, reject) => {
        try {
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "sender_action": "typing_on"
            };

            let url = `https://graph.facebook.com/v6.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
            request({
                "uri": url,
                "method": "POST",
                "json": request_body

            }, (err, res, body) => {
                if (!err) {
                    resolve("done!");
                } else {
                    reject("Unable to send message:" + err);
                }
            });

        } catch (e) {
            reject(e);
        }
    });
};

 function markMessageRead  (sender_psid)  {
    return new Promise((resolve, reject) => {
        try {
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "sender_action": "mark_seen"
            };

            let url = `https://graph.facebook.com/v6.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
            request({
                "uri": url,
                "method": "POST",
                "json": request_body

            }, (err, res, body) => {
                if (!err) {
                    resolve("done!");
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    })
};

function sendMessage (sender_psid, response)  {
    return new Promise(async (resolve, reject) => {
        try {
            await markMessageRead(sender_psid);
            await sendTypingOn(sender_psid);
            // Construct the message body
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "message": response
            };

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v6.0/me/messages",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    resolve('message sent!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

function requestTalkToAgent  (sender_psid) {
    return new Promise(async (resolve, reject) => {
        try {
            //send a text message
            let response1 = {
                "text": "Nhân viên sẽ kết nối với bạn trong vài phút."
            };

            await sendMessage(sender_psid, response1);

            //change this conversation to page inbox
            // let app = "page_inbox"
            // await passThreadControl(sender_psid, app);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};


function sendCategories (sender_psid)  {
    return new Promise(async (resolve, reject) => {
        try {
            //send a generic template message
            let response = sendCategoriesTemplate();
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

function sendLookupOrder  (sender_psid)  {
    return new Promise(async (resolve, reject) => {
        try {
            let response =sendLookupOrderTemplate();
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

function showHeadphones  (sender_psid)  {
    return new Promise(async (resolve, reject) => {
        try {
            let response = sendHeadphonesTemplate();
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    })
};
function showTVs  (sender_psid)  {
    return new Promise(async(resolve, reject) => {
        try {
            let response = sendTvTemplate();
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    })
};

function showPlaystation  (sender_psid)  {
    return new Promise(async(resolve, reject) => {
        try {
            let response = sendPLTemplate();
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    })
};

function backToCategories (sender_psid)  {
    sendCategories(sender_psid)
};

function backToMainMenu (sender_psid) {
    return new Promise(async (resolve, reject) => {
        try {
            let response = backToMainMenuTemplate();
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

//--------------------
function takeControlConversation (sender_psid) {
    return new Promise((resolve, reject) => {
        try {
            // Construct the message body
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "metadata": "Pass this conversation from page inbox to the bot - primary app"
            };

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v6.0/me/take_thread_control",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, async (err, res, body) => {
                if (!err) {
                    //send messages
                    await sendMessage(sender_psid, {"text": "The super bot came back !!!"});
                    await backToMainMenu(sender_psid);
                    resolve('message sent!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

    
function sendCategoriesTemplate  () {
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Điện thoại",
                        "image_url": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRvWOo5rt83hthB4Hy2_VgG3pbslNYtnBlK7UYodpN_N_klyXXQb9hRQX4GhvVl8rF47o3Hi3fiSuIeFi77N2wkwHoYrpIdiPqVbHEZOp6QTjcJHV8BX5vxKA&usqp=CAc",
                        "subtitle": "Điện thoại thông minh với giá ưu đãi",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://kpshop-client.vercel.app/phone",
                            "webview_height_ratio": "tall",
                        },
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": "https://kpshop-client.vercel.app/phone",
                                "title": "Chi tiết"
                            },
                            {
                                "type": "postback",
                                "title": "Xêm thêm",
                                "payload": "SHOW_HEADPHONES"
                            }
                        ]
                    },
                    {
                        "title": "Laptop",
                        "image_url": "https://cdn.tgdd.vn/Products/Images/44/231244/macbook-air-m1-2020-gray-600x600.jpg",
                        "subtitle": "Mạnh mẽ & chất lượng",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://kpshop-client.vercel.app/laptop",
                            "webview_height_ratio": "tall",
                        },
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": "https://kpshop-client.vercel.app/laptop",
                                "title": "Chi tiết"
                            }, {
                                "type": "postback",
                                "title": "Xêm thêm",
                                "payload": "SHOW_TV"
                            }
                        ]
                    },
                    {
                        "title": "Tablet",
                        "image_url": "https://cdn.tgdd.vn/Products/Images/522/241299/huawei-matepad-11-9-600x600.jpg",
                        "subtitle": "Máy tính bảng nhỏ gọn, tiện lợi",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://kpshop-client.vercel.app/tablet",
                            "webview_height_ratio": "tall",
                        },
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": "https://kpshop-client.vercel.app/tablet",
                                "title": "Chi tiết"
                            }, {
                                "type": "postback",
                                "title": "Xêm thêm",
                                "payload": "SHOW_PLAYSTATION"
                            }
                        ]
                    },
                ]
            }
        }
    };
};

function sendHeadphonesTemplate  () {
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Samsung Galaxy A32",
                        "image_url": "https://cdn.tgdd.vn/Products/Images/42/234315/samsung-galaxy-a32-4g-thumb-tim-600x600-600x600.jpg",
                        "subtitle": "5.490.000đ",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://kpshop-client.vercel.app/phone/samsung-galaxy-a32",
                            "webview_height_ratio": "tall",
                        },
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Back",
                                "payload": "BACK_TO_CATEGORIES"
                            },
                            {
                                "type": "postback",
                                "title": "Main menu",
                                "payload": "BACK_TO_MAIN_MENU"
                            }
                        ]
                    },
                    {
                        "title": "Samsung Galaxy S22 Ultra",
                        "image_url": "https://cdn.tgdd.vn/Products/Images/42/235838/samsung-galaxy-s22-ultra-090222-104147-600x600.jpg",
                        "subtitle": "30.990.000đ",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://kpshop-client.vercel.app/phone/samsung-galaxy-s22-ultra",
                            "webview_height_ratio": "tall",
                        },
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Back",
                                "payload": "BACK_TO_CATEGORIES"
                            },
                            {
                                "type": "postback",
                                "title": "Main menu",
                                "payload": "BACK_TO_MAIN_MENU"
                            }
                        ]
                    },
                    {
                        "title": "Samsung Galaxy M33",
                        "image_url": "https://cdn.tgdd.vn/Products/Images/42/256197/samsung-galaxy-m33-5g-1-600x600.jpg",
                        "subtitle": "7.690.000đ",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://kpshop-client.vercel.app/phone/samsung-galaxy-m33",
                            "webview_height_ratio": "tall",
                        },
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Back",
                                "payload": "BACK_TO_CATEGORIES"
                            },
                            {
                                "type": "postback",
                                "title": "Main menu",
                                "payload": "BACK_TO_MAIN_MENU"
                            }
                        ]
                    },
                    {
                        "title": "Vivo Y15s",
                        "image_url": "https://cdn.tgdd.vn/Products/Images/42/249720/vivo-y15s-2021-261021-114837-600x600.jpg",
                        "subtitle": "3.490.000đ",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://kpshop-client.vercel.app/phone/vivo-y15s",
                            "webview_height_ratio": "tall",
                        },
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Back",
                                "payload": "BACK_TO_CATEGORIES"
                            },
                            {
                                "type": "postback",
                                "title": "Main menu",
                                "payload": "BACK_TO_MAIN_MENU"
                            }
                        ]
                    },
                ]
            }
        }
    };
};
function sendTvTemplate  () {
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Acer Aspire A514 54 511G i5 NX.A28SV.009",
                        "image_url": "https://cdn.tgdd.vn/Products/Images/44/271043/acer-aspire-a514-54-511g-i5-nxa28sv009-thumb-600x600.jpg",
                        "subtitle": "14.992.500₫",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://kpshop-client.vercel.app/laptop/acer-aspire-a514-54-511g-i5-nxa28sv009",
                            "webview_height_ratio": "tall",
                        },
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Back",
                                "payload": "BACK_TO_CATEGORIES"
                            },
                            {
                                "type": "postback",
                                "title": "Main menu",
                                "payload": "BACK_TO_MAIN_MENU"
                            }
                        ]
                    },
                    {
                        "title": "Acer Nitro 5 Gaming AN515 45 R6EV R5 NH.QBMSV.006",
                        "image_url": "https://cdn.tgdd.vn/Products/Images/44/263980/acer-nitro-5-gaming-an515-45-r6ev-r5-5600h-8gb-600x600.jpg",
                        "subtitle": "19.566.300₫",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://kpshop-client.vercel.app/laptop/acer-nitro-5-gaming-an515-45-r6ev-r5-nhqbmsv006",
                            "webview_height_ratio": "tall",
                        },
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Back",
                                "payload": "BACK_TO_CATEGORIES"
                            },
                            {
                                "type": "postback",
                                "title": "Main menu",
                                "payload": "BACK_TO_MAIN_MENU"
                            }
                        ]
                    },
                    {
                        "title": "Apple MacBook Air M1 2020 MGN93SAA",
                        "image_url": "https://cdn.tgdd.vn/Products/Images/44/231244/macbook-air-m1-2020-gold-01-org.jpg",
                        "subtitle": "21.992.000₫",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://kpshop-client.vercel.app/laptop/apple-macbook-air-m1-2020-mgn63saa",
                            "webview_height_ratio": "tall",
                        },
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Back",
                                "payload": "BACK_TO_CATEGORIES"
                            },
                            {
                                "type": "postback",
                                "title": "Main menu",
                                "payload": "BACK_TO_MAIN_MENU"
                            }
                        ]
                    },
                    {
                        "title": "Asus ROG Strix Gaming G513IH R7 HN015W",
                        "image_url": "https://cdn.tgdd.vn/Products/Images/44/270031/asus-rog-strix-gaming-g513ih-r7-4800h-8gb-512gb-4gb-600x600.jpg",
                        "subtitle": "20.670.600₫",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://kpshop-client.vercel.app/laptop/asus-rog-strix-gaming-g513ih-r7-hn015w",
                            "webview_height_ratio": "tall",
                        },
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Back",
                                "payload": "BACK_TO_CATEGORIES"
                            },
                            {
                                "type": "postback",
                                "title": "Main menu",
                                "payload": "BACK_TO_MAIN_MENU"
                            }
                        ]
                    },
                ]
            }
        }
    };
};

function sendPLTemplate  () {
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Samsung Galaxy Tab S8 Ultra 5G",
                        "image_url": "https://cdn.tgdd.vn/Products/Images/522/247513/samsung-galaxy-tab-s8-ultra-1-600x600.jpg",
                        "subtitle": "30.990.000₫",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://kpshop-client.vercel.app/tablet/samsung-galaxy-tab-s8-ultra",
                            "webview_height_ratio": "tall",
                        },
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Back",
                                "payload": "BACK_TO_CATEGORIES"
                            },
                            {
                                "type": "postback",
                                "title": "Main menu",
                                "payload": "BACK_TO_MAIN_MENU"
                            }
                        ]
                    },
                    {
                        "title": "iPad 10 WiFi",
                        "image_url": "https://cdn.tgdd.vn/Products/Images/522/294103/ipad-gen-10-600x600.jpg",
                        "subtitle": "12.990.000₫",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://kpshop-client.vercel.app/tablet/ipad-gen-10",
                            "webview_height_ratio": "tall",
                        },
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Back",
                                "payload": "BACK_TO_CATEGORIES"
                            },
                            {
                                "type": "postback",
                                "title": "Main menu",
                                "payload": "BACK_TO_MAIN_MENU"
                            }
                        ]
                    },
                    {
                        "title": "iPad Pro M1 11 inch WiFi Cellular",
                        "image_url": "https://cdn.tgdd.vn/Products/Images/522/269329/pad-pro-m1-11-inch-wifi-cellular-1tb-2021-xam-thumb-600x600.jpeg",
                        "subtitle": "42.291.000₫",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://kpshop-client.vercel.app/tablet/ipad-pro-m1-11-inch-wifi-cellular",
                            "webview_height_ratio": "tall",
                        },
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Back",
                                "payload": "BACK_TO_CATEGORIES"
                            },
                            {
                                "type": "postback",
                                "title": "Main menu",
                                "payload": "BACK_TO_MAIN_MENU"
                            }
                        ]
                    },
                    {
                        "title": "Lenovo Yoga Tab 11",
                        "image_url": "https://cdn.tgdd.vn/Products/Images/522/244565/lenovo-yoga-tab-11-600x600.jpg",
                        "subtitle": "10.990.000đ",
                        "default_action": {
                            "type": "web_url",
                            "url": "https://kpshop-client.vercel.app/tablet/lenovo-tab-11",
                            "webview_height_ratio": "tall",
                        },
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Back",
                                "payload": "BACK_TO_CATEGORIES"
                            },
                            {
                                "type": "postback",
                                "title": "Main menu",
                                "payload": "BACK_TO_MAIN_MENU"
                            }
                        ]
                    },
                ]
            }
        }
    };
};
function sendLookupOrderTemplate  () {
    return {
        "attachment":{
            "type":"template",
            "payload":{
                "template_type":"button",
                "text":"Mã giảm giá giảm của Shop trong tháng này là KPKM5. Mã giảm giá 5% cho đơn hàng, mỗi tài khoản chỉ được dùng 1 lần ",
                "buttons":[
                    {
                        "type": "postback",
                        "title": "Quay lại",
                        "payload": "BACK_TO_MAIN_MENU"
                    }
                ]
            }
        }
    };
};

function backToMainMenuTemplate  (){
    return {
        "text": "Bạn cần giúp gì",
        "quick_replies": [
            {
                "content_type": "text",
                "title": "Danh mục",
                "payload": "CATEGORIES",
            },
            {
                "content_type": "text",
                "title": "Mã giảm giá",
                "payload": "LOOKUP_ORDER",
            },
            {
                "content_type": "text",
                "title": "Nhắn với nhân viên",
                "payload": "TALK_AGENT",
            },
        ]
    };
};



class ChatController {
    async handleSetupProfileAPI  ()  {
        return new Promise((resolve, reject) => {
            try {
                let url = `https://graph.facebook.com/v7.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`;
                let request_body = {
                    "get_started": {
                        "payload": "GET_STARTED"
                    },
                    "persistent_menu": [
                        {
                            "locale": "default",
                            "composer_input_disabled": false,
                            "call_to_actions": [
                                
                                {
                                    "type": "postback",
                                    "title": "Start",
                                    "payload": "RESTART_CONVERSATION"
                                },
                                {
                                    "type": "web_url",
                                    "title": "Facebook",
                                    "url": "https://www.facebook.com/profile.php?id=100075586191577",
                                    "webview_height_ratio": "full"
                                },
                            ]
                        }
                    ],
                };
                // Send the HTTP request to the Messenger Platform
                request({
                    "uri": url,
                    "method": "POST",
                    "json": request_body
                }, (err, res, body) => {
                    if (!err) {
                        resolve("Done!")
                    } else {
                        reject("Unable to send message:" + err);
                    }
                });
            } catch (e) {
                reject(e);
            }
        });
    };
    
  // [GET] /brand/all
    async getWebhook(req, res, next) {
        
       
        let mode = req.query['hub.mode'];
        let token = req.query['hub.verify_token'];
        let challenge = req.query['hub.challenge'];
        console.log(token)
        // Check if a token and mode is in the query string of the request
        if (mode && token) {
            // Check the mode and token sent is correct
            if (mode === "subscribe" && token === MY_TOKEN) {
                // Respond with the challenge token from the request
                console.log("WEBHOOK_VERIFIED");
                res.status(200).send(challenge);
            } else {
            // Respond with '403 Forbidden' if verify tokens do not match
                res.sendStatus(403);
            }
        }
    }

    async postWebhook(req, res, next) {
        const body =req.body
        if (body.object === 'page') {
            // Iterates over each entry - there may be multiple if batched
            body.entry.forEach(function (entry) {
                //check the incoming message from primary app or not; if secondary app, exit
                if (entry.standby) {
                    //if user's message is "back" or "exit", return the conversation to the bot
                    let webhook_standby = entry.standby[0];
                    if (webhook_standby && webhook_standby.message) {
                        if (webhook_standby.message.text === "back" || webhook_standby.message.text === "exit") {
                            // call function to return the conversation to the primary app
                            // chatbotService.passThreadControl(webhook_standby.sender.id, "primary");
                            takeControlConversation(webhook_standby.sender.id);
                        }
                    }
                    return;
                }
                //     // Gets the body of the webhook event
                let webhook_event = entry.messaging[0];
                console.log(webhook_event);
                // Get the sender PSID
                let sender_psid = webhook_event.sender.id;
                // Check if the event is a message or postback and
                // pass the event to the appropriate handler function
                if (webhook_event.message) {
                    handleMessage(sender_psid, webhook_event.message);
                } else if (webhook_event.postback) {
                    handlePostback(sender_psid, webhook_event.postback);
                }
            });
            // Returns a '200 OK' response to all requests
            res.status(200).send('EVENT_RECEIVED');
        } else {
            // Returns a '404 Not Found' if event is not from a page subscription
            res.sendStatus(404);
        }
    }
}
 
module.exports = new ChatController();
