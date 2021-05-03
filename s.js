const jwt = require("jsonwebtoken");
let obj = { "id": 1, "username": "mkhizeryounas" };
let privateKey = '-----BEGIN RSA PRIVATE KEY-----\nMIIBOQIBAAJBALrR1sxxFQCygc3woKNpKiuzNJOC+6zYA4v9I1j5BgQGNiidP9O2\nXTkq5ajNXIgx+E7UjoupcQ2Eha+Eh5mfd08CAwEAAQJAAzrPeNdXopxzbAkF7e1K\ngljlxssT6MgPP6NPsiET/ovJYT3RPUwJa8+p9hTq7HZmR79aKUaK8bGtbNjXID1k\nsQIhAOF9nkSKBtoXlqCjDcBXiYn37S0F0kyJM0f2tFswfcmpAiEA1BjDOPIuVUxD\nqEV+T0gVZX6HJbsBWG58XtFhsMxuhDcCIAyO9HuYvFz1J1x2+FMYDP70Ie95/YZp\ntcNySAU0JC1RAiBO9/1P6ZPovGGAeIdj23Hj/S0yliMVGuYBo7Hc0vDfFwIgBC+5\nqHsl59HAslEAJV5G6wRHm+RDouBe7gzgfkl9VtY=\n-----END RSA PRIVATE KEY-----';
obj["access_token"] = jwt.sign(obj, privateKey, { algorithm: "RS256" });
console.log("User", obj);