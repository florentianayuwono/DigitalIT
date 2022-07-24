// theme/index.js
import { extendTheme } from "@chakra-ui/react";

// Global style overrides
import { styles } from "./styles";

// Foundational style overrides

// Component style overrides
import Button from "./components/button";

const overrides = {
  styles,
  // Other foundational style overrides go here
  components: {
    Button,
    // Other components go here
  },
};

export const theme = extendTheme(overrides);
