import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const {success} = await rateLimit.limit(req.ip);
    if (!success) {
      return res.status(429).json({ message: 'Too many requests' });
    }
    next(); // siguiente funcion
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    next(error);
  }
};

export default rateLimiter;
