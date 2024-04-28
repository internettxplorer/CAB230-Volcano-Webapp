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
    miscErrorNotif 
} from "../helpers/notifications";

/**
 *  Login page using mantine-forms, with input validation and UI notifications
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

        // checks if email input contains '@', and if password is not empty;
        // returns error message under textinput if validation fails
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 1 ? 'Invalid password' : null)
        },
    });

    // redirect user to previous page
    function handleLoginRedirect() {
        loginSuccessNotif();
        setTimeout(nav(-1), 500000);
    }

    // post request to API with user-submitted form values
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
                // If fetch successful, store token, send login success notification and redirect
                if (res.token) {
                    localStorage.setItem("token", res.token);
                    setLoggedIn(true); 
                    handleLoginRedirect();
                }
            }
        })
        .catch(() => { miscErrorNotif(); })
    };

    // Display login form with buttons to submit or register account
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
                    <Button type="submit" color="orange">
                        Continue
                    </Button>
                </Group>
            </form>
            <Group justify="center" mt="md">
                <Button variant="outline" color="orange" onClick={() => nav(`/register`)} >
                    Create an account
                </Button>
            </Group>
        </Box>
    );
}

Login.propTypes = {
    setLoggedIn: PropTypes.func
}