
import morgan from "morgan";
import logger from "../utils/logger.js";

const requestLogger = morgan(
  ":method :url :status :response-time ms",
  {
    stream: {
      write: (message: string) => {
        logger.info(message.trim(), {
          type: "HTTP_REQUEST",
        });
      },
    },
  }
);

export default requestLogger;
