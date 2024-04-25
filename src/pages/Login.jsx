import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { TextInput, 
    PasswordInput, 
    Button, 
    Group, 
    Box, 
    Stack, 
    Text, 
    Space,
} from "@mantine/core";

import { 
    wrongEmailNotif, 
    alreadyLoggedInNotif, 
    loginSuccessNotif, 
    miscErrorNotif } from "../helpers/notifications";

/**
 * @desc User login form
 */
export default function Login({ setLoggedIn }) {
    const VOLCANO_API_URL = import.meta.env.VITE_VOLCANO_API_URL;
    const [ visible, { toggle }] = useDisclosure(false);
    const nav = useNavigate();

    const loginForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: "",
            password: ""
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 1 ? 'Invalid password' : null)
        },
    });

    const handleLogin = () => {
        const url = `${VOLCANO_API_URL}/user/login`;
        const user = loginForm.getValues(); // get login & pwd form input

        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        .then(response => {
            if (!response.ok) { wrongEmailNotif(); } // Send notif for incorrect user details
            return response.json();
        })
        .then(res => {
            if (localStorage.getItem("token")) { alreadyLoggedInNotif(); } // Send notif if user already logged in
            else {
                // If fetch successful (response with token), store token and send login success notification
                if (res.token) {
                    localStorage.setItem("token", res.token);
                    setLoggedIn(true); 
                    console.log(res); // DELETE
                    loginSuccessNotif();
                }
            }
        })
        .catch(() => { miscErrorNotif(); })
    };

    return (
        <Box maw={340} mx="auto">
            <Text size="xl">Log in</Text>
            <Space h="sm" />
            <form onSubmit={loginForm.onSubmit(handleLogin)}>
                <Stack>
                    <TextInput 
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        {...loginForm.getInputProps('email')}
                    />
                    <PasswordInput 
                        withAsterisk
                        label="Password"
                        visible={visible}
                        onVisibilityChange={toggle}
                        {...loginForm.getInputProps('password')}
                    />
                </Stack>

                <Group justify="end" mt="md">
                    <Button type="submit">Continue</Button>
                </Group>
            </form>
            <Group justify="center" mt="md">
                <Button variant="white" onClick={() => nav(`/register`)} >
                    Create an account
                </Button>
            </Group>
        </Box>
    );
}

Login.propTypes = {
    setLoggedIn: PropTypes.func
}