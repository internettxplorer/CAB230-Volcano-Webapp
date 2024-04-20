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

// import errors from './styles/errors.module.css';

/**
 * --. ACCOUNTS USED DURING TESTING .--
 * all passwords are '123'
 * golly@gosh.com
 * a@b.com
 * b@c.com
 * c@d.com
 * 
 * DELETE LATER -- 
 */

export default function Register() {
    const VOLCANO_API_URL = import.meta.env.VITE_VOLCANO_API_URL;
    const [ visible, { toggle }] = useDisclosure(false);
    const nav = useNavigate();
   
    const registerForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: "",
            password: ""
        },

        // ADD appropriate validations : check if user already exists, password requirements.
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 1 ? 'Invalid password' : null)
        },
    });

    const handleRegister = () => {
        const url = `${VOLCANO_API_URL}/user/register`;
        const user = registerForm.getValues(); // { email: "", password: "" }

        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        })
        .then((response) => response.json())
        .then((res) => {
            if (res.error === true) {
                if (res.message === "User already exists") {
                    notifications.show({
                        title: "Account already exists",
                        message: "Please log in",
                        color: "red",
                        autoClose: 4500,
                        withCloseButton: false,
                        className: "notif-root-class"
                    });
                }
            }
        })
        .catch((err) => {console.error(err)})
        .finally(() => { // CHANGE later -- is localStorage necessary for user details?
            if (!localStorage.getItem(`${user.email}`)) {
                localStorage.setItem(`${user.email}`, JSON.stringify(user));
                console.log(JSON.parse(localStorage.getItem(`${user.email}`)));
                notifications.show({
                    title: "Account created",
                    message: "You can log in now",
                    color: "green",
                    autoClose: 4500,
                    withCloseButton: false,
                    className: "notif-root-class"
                })
            }
        })
    };

    // Display login form and button to nav back to Login page
    return (
        <Box maw={340} mx="auto">
            <Text size="xl">Register</Text>
            <Space h="sm" />
            <form onSubmit={registerForm.onSubmit(handleRegister)}>
                <Stack>
                    <TextInput 
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"   
                        {...registerForm.getInputProps('email')}
                    />
                    <PasswordInput 
                        withAsterisk
                        label="Password"
                        visible={visible}
                        onVisibilityChange={toggle}
                        {...registerForm.getInputProps('password')}
                    />
                </Stack>

                <Group justify="end" mt="md">
                    <Button type="submit">Sign me up!</Button>
                </Group>
            </form>
            <Group justify="center" mt="md">
                    <Button variant="white" onClick={() => nav(`/login`)} >
                        Back to login
                    </Button>
            </Group>
        </Box>
    );
}

