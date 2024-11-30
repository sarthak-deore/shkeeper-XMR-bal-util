const dotenv = require("dotenv").config();
const request = require("request");
const util = require("util");

const RPC_URL = process.env.RPC_ENDPOINT_URL;
const username = process.env.RPC_USER;
const password = process.env.RPC_PASS;

// Promisify the request function
const requestPromise = util.promisify(request);

async function getBalance() {
  const options = {
    url: RPC_URL,
    method: "POST",
    json: {
      jsonrpc: "2.0",
      id: "0",
      method: "get_balance",
    },
    auth: {
      user: username,
      pass: password,
      sendImmediately: false, // Important for digest auth
    },
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await requestPromise(options);
    const body = response.body;

    if (!body || !body.result) {
      throw new Error("Invalid response from the Monero RPC");
    }

    const piconeros = body.result.unlocked_balance;
    const xmr = piconeros / 1e12;
    // piconer is 10e-12 of a XMR
    console.log("XMR balance:", xmr);
    return xmr;
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error;
  }
}

getBalance();
