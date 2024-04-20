import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { TextInput, 
    PasswordInput, 
    Button, 
    Group, 
    Box, 
    Stack, 
    Text, 
    Space,
} from "@mantine/core";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

/**
 * @desc User login form
 * 
 * @todo error handling for fetch request
 */
export default function Login() {
    const VOLCANO_API_URL = import.meta.env.VITE_VOLCANO_API_URL;
    const [ visible, { toggle }] = useDisclosure(false);
    const [ loggedIn, setLoggedIn ] = useState(false);
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
        const user = loginForm.getValues();

        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        .then(response => response.json())
        .then((res) => {
            if (res.error === true) {
                if (res.message === "Incorrect email or password") {
                    notifications.show({
                        title: "Incorrect email or password",
                        message: "Try again or create an account",
                        color: "red",
                        autoClose: 4500,
                        withCloseButton: false,
                        className: "notif-root-class",
                    });
                }
            }
            else {
                localStorage.setItem("token", res.token);
                console.log(res);
                setLoggedIn(true);
            }
        })
        .catch((err) => console.log(err))
        .finally(() => {
            if (loggedIn) {
                notifications.show({
                    title: "Welcome back to Volcaneer!",
                    message: "You are now logged in",
                    color: "green",
                    autoClose: 4500,
                    withCloseButton: false,
                    className: "notif-root-class",
                });
            }
        })
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