# TON Proxy Frontend
[![Based on TON][ton-svg]][ton]

# Description
**[TON Proxy Frontend](https://github.com/duelist-dev/ton-proxy-frontend/)** is frontend for [TON Sites Proxy](https://github.com/duelist-dev/ton-sites-proxy/) or another (you may change variable *VITE_DOMAIN_PROXY_URL* )

# USE
Start container:
```sh 
docker run -d -p 8080:80 -e VITE_DOMAIN_PROXY_URL='YOUR_PROXY_DOMAIN' duelistdev/ton-proxy-frontend
```

<!-- Badges -->
[ton-svg]: https://img.shields.io/badge/Based%20on-TON-blue
[ton]: https://ton.org
