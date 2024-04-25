import { useNavigate } from "react-router-dom";
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
    accountExistsNotif,
    accountCreatedNotif,
    miscErrorNotif,
} from "../helpers/notifications";



// import errors from './styles/errors.module.css';

/**
 * @desc User registration form
 * 
 * @todo error handling for fetch request (add !response.ok)
 * @todo review if localStorage for user details is necessary
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

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            password: (value) => (value.length < 1 ? 'Invalid password' : null)
        },
    });

    const handleRegister = () => {
        const url = `${VOLCANO_API_URL}/user/register`;
        const user = registerForm.getValues();

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
                if (res.message === "User already exists") { accountExistsNotif(); }
            }
            else { accountCreatedNotif(); }
        })
        .catch(() => { miscErrorNotif(); })
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

