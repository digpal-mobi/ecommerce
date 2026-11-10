import app from "./app";
import { env } from "./config/env";
import { connectDatabase } from "./config/database";
import logger from "./utils/logger";

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    app.listen(env.PORT, () => {
      logger.info(`Server is running at http://localhost:${env.PORT}`);
    });
  } catch (error) {
    logger.error("Failed to start server", { error });
    process.exit(1);
  }
};

startServer();
