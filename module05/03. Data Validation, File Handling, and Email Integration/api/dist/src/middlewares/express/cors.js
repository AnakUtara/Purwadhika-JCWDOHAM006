import { clientOrigin } from "../../config/env.config.js";
const corsOptions = {
    origin: clientOrigin,
    credentials: true,
};
export default corsOptions;
