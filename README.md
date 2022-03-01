## Usage

```js
const { computeSubnet } = require("./compute-subnet");

const cidr = 20;
const ip = [192, 168, 0, 10];

const subnet = computeSubnet(ip, cidr);
```

#### Formatting

```js
const {
  count,
  subnetMask,
  wildcardMask,
  hostAddresses,
  networkAddress,
  broadcastAddress,
} = subnet;

console.table({
  cidr,
  ip: ip.join("."),
});

console.table({
  subnet: subnetMask.join("."),
  wildcard: wildcardMask.join("."),
  network: networkAddress.join("."),
  broadcast: broadcastAddress.join("."),
  hosts: `${hostAddresses.start.join(".")} - ${hostAddresses.end.join(".")}`,
  count,
});
```

#### Output

![image](https://user-images.githubusercontent.com/25634165/156124532-93f0d7fd-70c5-4b3a-8963-82144c90a961.png)
