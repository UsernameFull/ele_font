import { Box, SimpleGrid } from "@chakra-ui/react";

import React, { useState, useEffect } from "react";

const GasInfo: React.FC = (props) => {
  const { gasData } = props;
  return (
    <SimpleGrid align="left" p="8" columns={2} spacing={1}>
      <Box color="blue.500" height="30px">
        Relative Humidity:
      </Box>
      <Box
        color={
          gasData[0] < 0.7
            ? gasData[0] < 0.6
              ? "green.500"
              : "orange.500"
            : "red.500"
        }
        align="left"
        height="30px"
      >
        {gasData[0] * 100 + "%"}
      </Box>
      <Box color="blue.500" height="30px">
        Formaldehyde:
      </Box>
      <Box
        color={
          gasData[1] < 500
            ? gasData[1] < 100
              ? "green.500"
              : "orange.500"
            : "red.500"
        }
        height="30px"
      >
        {gasData[1].toString().slice(0,6) + "ppm"}
      </Box>
      <Box color="blue.500" height="30px">
        Ethanol:
      </Box>
      <Box height="30px">{gasData[2].toString().slice(0,6) + "ppm"}</Box>
    </SimpleGrid>
  );
};

export default GasInfo;
