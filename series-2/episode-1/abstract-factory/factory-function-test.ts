import { getLogger } from "./factory-function";

const logger = getLogger();

logger.info("Info text");
logger.debug("Debug text");
logger.warn("Warn text");
logger.error("Error text");
