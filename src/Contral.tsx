import {
  Box,
  SimpleGrid,
  InputGroup,
  InputLeftAddon,
  Input,
  Button,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

import React, { useState, useEffect } from "react";

const Contral: React.FC = (props) => {
  const [formData, setFormData] = useState({
    a: 10,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0,
  });
  const getrate = (e) => {
    //   fetch()
    console.log(e);
  };

  const setrate = (e) => {
    //
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getrate([
      formData.a,
      formData.b,
      formData.c,
      formData.d,
      formData.e,
      formData.f,
    ]);
  };
  return (
    <FormControl id="amount">
      <SimpleGrid columns={2} spacing={1}>
        <Box>
          <InputGroup>
            <InputLeftAddon p={1} fontSize="sm" children="湿度原始值" />
            <NumberInput
              value={formData.a}
              onChange={(e) => setFormData({ ...formData, a: e.target.value })}
            >
              <NumberInputField />
            </NumberInput>
          </InputGroup>
        </Box>
        <Box>
          <InputGroup>
            <InputLeftAddon p={1} fontSize="sm" children="湿度斜率" />
            <NumberInput
              value={formData.b}
              onChange={(e) => setFormData({ ...formData, b: e.target.value })}
            >
              <NumberInputField />
            </NumberInput>
          </InputGroup>
        </Box>
        <Box>
          <InputGroup>
            <InputLeftAddon p={1} fontSize="sm" children="甲醛原始值" />
            <NumberInput
              value={formData.c}
              onChange={(e) => setFormData({ ...formData, c: e.target.value })}
            >
              <NumberInputField />
            </NumberInput>
          </InputGroup>
        </Box>
        <Box>
          {" "}
          <InputGroup>
            <InputLeftAddon p={1} fontSize="sm" children="甲醛斜率" />
            <NumberInput
              value={formData.d}
              onChange={(e) => setFormData({ ...formData, d: e.target.value })}
            >
              <NumberInputField />
            </NumberInput>
          </InputGroup>
        </Box>
        <Box>
          {" "}
          <InputGroup>
            <InputLeftAddon p={1} fontSize="sm" children="乙醇原始值" />
            <NumberInput
              value={formData.e}
              onChange={(e) => setFormData({ ...formData, e: e.target.value })}
            >
              <NumberInputField />
            </NumberInput>
          </InputGroup>
        </Box>
        <Box>
          {" "}
          <InputGroup>
            <InputLeftAddon p={1} fontSize="sm" children="乙醇斜率" />
            <NumberInput
              value={formData.f}
              onChange={(e) => setFormData({ ...formData, f: e.target.value })}
            >
              <NumberInputField />
            </NumberInput>
          </InputGroup>
        </Box>
      </SimpleGrid>
      <Button mt={4} type="submit" onClick={handleSubmit}>
        提交
      </Button>
    </FormControl>
  );
};

export default Contral;