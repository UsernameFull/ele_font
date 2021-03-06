import {
    Box,
    SimpleGrid,
    InputGroup,
    InputLeftAddon,
    Input,
    Button,
    FormControl,
} from "@chakra-ui/react";

import React, { useState, useEffect } from "react";

const Contral: React.FC = (props) => {

    useEffect(() => {
        getrate();
        console.log('执行了')
    }, []);
    const [formData, setFormData] = useState({
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0,
        h: 0,
        i: 0,
        j: 0,
    });
    const setrate = (e) => {
        fetch("http://47.110.147.58:55557/api/post", {
            method: "POST",
            mode: "cors",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
            },
            body: `shit=[${formData.a},${formData.b},${formData.c},${formData.d},${formData.e},${formData.f},${formData.h},${formData.i},${formData.j}]`
        })
    };

    const getrate = () => {
        fetch("http://47.110.147.58:55557/api/get", {
            method: "GET",
            mode: "cors",
        })
            .then((response) => (response.json()))
            .then((rate) => {
                let tmp = JSON.parse(rate.shit).map(e => e.toString());
                setFormData({
                    a: tmp[0],
                    b: tmp[1],
                    c: tmp[2],
                    d: tmp[3],
                    e: tmp[4],
                    f: tmp[5],
                    h: tmp[6],
                    i: tmp[7],
                    j: tmp[8],
                }
                )
            })
            .catch((error) => {
                console.log("getrate failed", error);
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setrate();
    };
    return (
        <FormControl>
            <SimpleGrid columns={1} spacing={1}>
                <Box>
                    <InputGroup>
                        <InputLeftAddon p={1} fontSize="sm" children="湿度原始值" />
                        <Input value={formData.a}
                            onChange={(e) => setFormData({ ...formData, a: e.target.value })}
                        />
                    </InputGroup>
                </Box>
                <Box>
                    <InputGroup>
                        <InputLeftAddon p={1} fontSize="sm" children="湿度电阻基值" />
                        <Input value={formData.b}
                            onChange={(e) => setFormData({ ...formData, b: e.target.value })}
                        />
                    </InputGroup>
                </Box>
                <Box>
                    <InputGroup>
                        <InputLeftAddon p={1} fontSize="sm" children="湿度斜率" />
                        <Input value={formData.c}
                            onChange={(e) => setFormData({ ...formData, c: e.target.value })}
                        />
                    </InputGroup>
                </Box>
                <Box>
                    <InputGroup>
                        <InputLeftAddon p={1} fontSize="sm" children="甲醛原始值" />
                        <Input value={formData.d}
                            onChange={(e) => setFormData({ ...formData, d: e.target.value })}
                        />
                    </InputGroup>
                </Box>
                <Box>
                    <InputGroup>
                        <InputLeftAddon p={1} fontSize="sm" children="甲醛电阻基值" />
                        <Input value={formData.e}
                            onChange={(e) => setFormData({ ...formData, e: e.target.value })}
                        />
                    </InputGroup>
                </Box>
                <Box>
                    <InputGroup>
                        <InputLeftAddon p={1} fontSize="sm" children="甲醛斜率" />
                        <Input value={formData.f}
                            onChange={(e) => setFormData({ ...formData, f: e.target.value })}
                        />
                    </InputGroup>
                </Box>
                <Box>
                    <InputGroup>
                        <InputLeftAddon p={1} fontSize="sm" children="乙醇原始值" />
                        <Input value={formData.h}
                            onChange={(e) => setFormData({ ...formData, h: e.target.value })}
                        />
                    </InputGroup>
                </Box>
                <Box>
                    <InputGroup>
                        <InputLeftAddon p={1} fontSize="sm" children="乙醇电阻基值" />
                        <Input value={formData.i}
                            onChange={(e) => setFormData({ ...formData, i: e.target.value })}
                        />
                    </InputGroup>
                </Box>
                <Box>
                    <InputGroup>
                        <InputLeftAddon p={1} fontSize="sm" children="乙醇斜率" />
                        <Input value={formData.j}
                            onChange={(e) => setFormData({ ...formData, j: e.target.value })}
                        />
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
