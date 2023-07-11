const https = require("https");
const crypto = require("crypto");
const partnerCode = "MOMOCSGI20220815";
const accessKey = "LAEbzlz7j8oHtxgR";
const secretkey = "zAEzXDBNTKVOUhmyzaasA6NNfGnI2IAQ";
const requestType = "captureWallet";
const ipnUrl = "https://kpshop-backend.onrender.com/payment/momo/notify";

function reqPayUrl(request, response, params) {
  const requestId = partnerCode + new Date().getTime();
  let { orderId, orderInfo, redirectUrl, amount, extraData } = params;
  orderId = `${orderId}-${requestId}`;
  console.log("payment", params);
  const rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;
  const signature = crypto
    .createHmac("sha256", secretkey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
    lang: "en",
  });
  const options = {
    hostname: "test-payment.momo.vn",
    port: 443,
    path: "/v2/gateway/api/create",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
  };
  const req = https.request(options, (res) => {
    res.setEncoding("utf8");
    res.on("data", (body) => {
      console.log(body);
      console.log(requestBody);
      response.json({ payUrl: JSON.parse(body).payUrl });
    });
    res.on("end", () => {
      console.log("No more data in response.");
    });
  });

  req.on("error", (e) => {
    console.log(`problem with request: ${e.message}`);
  });
  console.log("Sending....");
  req.write(requestBody);
  req.end();
}

module.exports.reqPayUrl = reqPayUrl;
