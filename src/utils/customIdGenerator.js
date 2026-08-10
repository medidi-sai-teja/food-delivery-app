const crypto = require("crypto")

function generateCustomId(){
    const rawBytes = crypto.randomBytes(4).toString('hex').toUpperCase();

    const part1 = rawBytes.substring(0, 4);
    const part2 = rawBytes.substring(4, 8);

    return `FD-${part1}-${part2}`;
    
}

module.exports = generateCustomId