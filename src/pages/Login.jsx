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
} from "@mantine/core";

export default function Login() {

    const [ visible, { toggle }] = useDisclosure(false);
    const nav = useNavigate();

    const loginForm = useForm({
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
            <Text size="xl">Sign in</Text>
            <form onSubmit={loginForm.onSubmit(console.log)}>
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

                <Group justify="space-between" mt="md">
                    <Button variant="outline" onClick={() => nav(`/register`)}>
                        Create an account
                    </Button>
                    <Button type="submit">Submit</Button>
                </Group>
            </form>
        </Box>
    );
}