/**
 * @param {number} cidr - CIDR
 * @returns {object}
 */
function getNetworkMasks(cidr) {
  let wildcardMask = [0, 0, 0, 0];
  let subnetMask = [255, 255, 255, 255];

  if (cidr === 0) {
    return {
      subnetMask: wildcardMask,
      wildcardMask: subnetMask,
    };
  }

  if (cidr === 32) {
    return {
      subnetMask,
      wildcardMask,
    };
  }

  const exp = (32 - cidr) % 8;
  const pos = Math.max(0, parseInt((cidr - 1) / 8));

  const mask = parseInt(255 / 2 ** exp) * 2 ** exp;

  subnetMask[pos] = mask;
  subnetMask = subnetMask.fill(0, pos + 1, subnetMask.length);

  wildcardMask[pos] = 255 - mask;
  wildcardMask = wildcardMask.fill(255, pos + 1, subnetMask.length);

  return {
    subnetMask,
    wildcardMask,
  };
}

/**
 * @param {array} ip
 * @param {array} subnetMask
 * @param {array} wildcardMask
 * @returns {object}
 */
function getNetwork(ip, subnetMask, wildcardMask) {
  const networkAddress = [];
  const broadcastAddress = [];

  let count = 1;

  for (let i = 0; i < ip.length; i++) {
    networkAddress[i] = ip[i] & subnetMask[i];
    broadcastAddress[i] = ip[i] | wildcardMask[i];

    count *= broadcastAddress[i] - networkAddress[i] + 1;
  }

  return { networkAddress, broadcastAddress, count };
}

/**
 * @param {number} cidr
 * @param {array} networkAddress
 * @param {array} broadcastAddress
 * @returns {object}
 */
function getHosts(cidr, networkAddress, broadcastAddress) {
  const hostAddresses = {
    start: [...networkAddress],
    end: [...broadcastAddress],
  };

  if (cidr < 32 - 1) {
    hostAddresses.start[3]++;
    hostAddresses.end[3]--;
  }

  return hostAddresses;
}

/**
 * @param {array} ip
 * @param {number} cidr
 */
function validate(ip, cidr) {
  if (typeof cidr !== "number" || cidr < 0 || cidr > 32)
    throw new Error("`cidr` must be a number from 0 - 32.");

  if (!Array.isArray(ip) || ip.length !== 4)
    throw new Error(
      "`ip` must be an array of numbers of length 4, each element from 0 - 255."
    );

  ip.forEach((segment) => {
    if (typeof segment !== "number" || segment < 0 || segment > 255) {
      throw new Error(
        "`ip` must be an array of numbers of length 4, each element from 0 - 255."
      );
    }
  });
}

/**
 * @param {array} ip
 * @param {number} cidr
 * @returns {object}
 */
function computeSubnet(ip, cidr) {
  validate(ip, cidr);

  const { subnetMask, wildcardMask } = getNetworkMasks(cidr);

  const { networkAddress, broadcastAddress, count } = getNetwork(
    ip,
    subnetMask,
    wildcardMask
  );

  const hostAddresses = getHosts(cidr, networkAddress, broadcastAddress);

  return {
    ip,
    cidr,
    count,
    subnetMask,
    wildcardMask,
    hostAddresses,
    networkAddress,
    broadcastAddress,
  };
}

module.exports = {
  getHosts,
  getNetwork,
  computeSubnet,
  getNetworkMasks,
};
