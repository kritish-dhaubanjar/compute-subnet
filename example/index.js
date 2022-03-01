const { computeSubnet } = require("..");

const cidr = 20;
const ip = [192, 168, 0, 10];

const subnet = computeSubnet(ip, cidr);

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
