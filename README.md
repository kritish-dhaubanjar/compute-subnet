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

```json
┌─────────┬────────────────┐
│ (index) │     Values     │
├─────────┼────────────────┤
│  cidr   │       20       │
│   ip    │ '192.168.0.10' │
└─────────┴────────────────┘
┌───────────┬────────────────────────────────┐
│  (index)  │             Values             │
├───────────┼────────────────────────────────┤
│  subnet   │        '255.255.240.0'         │
│ wildcard  │          '0.0.15.255'          │
│  network  │         '192.168.0.0'          │
│ broadcast │        '192.168.15.255'        │
│   hosts   │ '192.168.0.1 - 192.168.15.254' │
│   count   │              4096              │
└───────────┴────────────────────────────────┘

```
