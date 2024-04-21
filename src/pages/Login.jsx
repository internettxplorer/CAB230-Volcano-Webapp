import { useNavigate } from "react-router-dom";
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

/**
 * @desc User login form
 * 
 * @todo error handling for fetch request
 */
export default function Login() {
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
        const user = loginForm.getValues();

        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
        .then(response => {
            response => response.json();
            if (response.ok) {
                localStorage.setItem("token", response.token);
                console.log(response);
                // setLoggedIn(true);

                notifications.show({
                    title: "Welcome back to Volcaneer!",
                    message: "You are now logged in",
                    color: "green",
                    autoClose: 4500,
                    withCloseButton: false,
                    className: "notif-root-class",
                });
            }
            else if (!response.ok) {
                notifications.show({
                    title: "Incorrect email or password",
                    message: "Try again or create an account",
                    color: "red",
                    autoClose: 4500,
                    withCloseButton: false,
                    className: "notif-root-class",
                });
            } 
            else {
                throw new Error('Fetch unsuccessful'); // CHANGE to notification?
            }
        })
        .catch((err) => console.log(err)) // CHANGE to notification?
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