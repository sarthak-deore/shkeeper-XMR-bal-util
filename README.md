Extension utility for Shkeeper: https://github.com/vsys-host/shkeeper.io/tree/main/shkeeper

Utility Description:
- Shkeeper XMR rpc wallet balance checking utility, exposing the json rpc api on port 30000
- The yaml file when applied, translates port 2222 (target port) to external port (30000 in this case)
- fetcher.js is sample code to fetch the xmr (index: 0) main wallet balance

Usage: NodePort in shkeeper namespace usage
- create or copy "port-runner.yaml" in the shkeeper project folder
- RUN: kubectl apply -f port-runner.yaml

Usage: Nodejs app usage
- RUN npm install
- create .env file, add your shkeeper RPC url+username+pass
- RUN: node .\fetcher.js
