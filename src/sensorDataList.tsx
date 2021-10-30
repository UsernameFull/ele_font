import { Box, Flex, Text, Grid } from "@chakra-ui/react";

import React, { useState, useEffect } from "react";

const color = ["#000000", "#0000ff", "#ff0000", "#800080", "#008000"]

const SensorDataList: React.FC = (props) => {
    const { sensorData } = props
    return (
        <Grid templateColumns="repeat(6, 1fr)" p={4} gap={6}>
            <Box w="100%" h="10">Resistance:</Box>
            <Box w="100%" color={color[0]} h="10">{sensorData.sensor1 || 0}</Box>
            <Box w="100%" color={color[1]} h="10">{sensorData.sensor2 || 0}</Box>
            <Box w="100%" color={color[2]} h="10">{sensorData.sensor3 || 0}</Box>
            <Box w="100%" color={color[3]} h="10">{sensorData.sensor4 || 0}</Box>
            <Box w="100%" color={color[4]} h="10">{sensorData.sensor5 || 0}</Box>
        </Grid>
    );
};

export default SensorDataList;
