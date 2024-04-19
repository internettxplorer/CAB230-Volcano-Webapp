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

export default function Register() {
    const [ visible, { toggle }] = useDisclosure(false);
    const nav = useNavigate();

    const registerForm = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            pwd: ''
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
            pwd: (value) => (/^\S+\S+$/.test(value) ? null : 'Invalid password'),
        },
    });

    return (
        <Box maw={340} mx="auto">
            <Text size="xl">Register</Text>
            <Space h="sm" />
            <form onSubmit={registerForm.onSubmit(console.log)}>
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
                        {...registerForm.getInputProps('pwd')}
                    />
                </Stack>

                <Group justify="end" mt="md">
                    <Button type="submit">Sign me up!</Button>
                </Group>

                <Group justify="center" mt="md">
                    <Button variant="white" onClick={() => nav(`/login`)} >
                        Back to login
                    </Button>
                </Group>
            </form>
        </Box>
    );
}