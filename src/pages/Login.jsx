import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { TextInput, 
    PasswordInput, 
    Button, 
    Group, 
    Box, 
    Stack, 
    Text, 
    Space,
} from "@mantine/core";

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
        // const url = `${VOLCANO_API_URL}/user/login`;
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
                        {...loginForm.getInputProps('pwd')}
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