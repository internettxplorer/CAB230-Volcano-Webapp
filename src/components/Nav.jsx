import { Link } from "react-router-dom";

import volcano from "../assets/volcano.png";
import chevron_right from "../assets/chevron_right.png";
import login from "../assets/login.png";
// import logout from "../assets/logout.png";


import { Container, 
    Grid,
    ActionIcon,
    NavLink,
    Button, 
} from "@mantine/core";

/**
 * 
 * @todo global styles for page margins
 */
export default function Nav() {
    return (
        <Container size="110rem" style={{paddingTop: 20}}>
            <Grid>
                <Grid.Col span="content">
                    <Link to ="/">
                        <ActionIcon variant="transparent" aria-label="Home" size="65">
                            <img 
                                src={volcano} 
                                style={{ height: 65, width: 65}}
                                alt="home-button" />
                        </ActionIcon>
                    </Link>
                </Grid.Col>

                <Grid.Col span={2}>
                    <Link to="/list" style={{ textDecoration: 'none' }}>
                        <NavLink
                            label="Volcanoes"
                            rightSection={
                                <img
                                    src={chevron_right}
                                    style={{ height: 30, width: 30 }}
                                />
                            }
                            classNames={{label: 'header-navlink-label'}}
                        />
                    </Link>
                </Grid.Col>
                
                <Grid.Col span="content" offset={8} style={{paddingTop: 18}}>
                    <Link to="/login">
                        <Button
                            variant="filled"
                            size="lg"
                            color="orange"
                            radius="xs"
                            leftSection={
                                <img 
                                    src={login} 
                                    alt="sign-in-button" 
                                    style={{ height: 28, width: 28 }}
                                />
                            }
                            style={{ justifyContent: 'end', fontSize: 22 }}
                        >
                            Sign in
                        </Button>
                    </Link>
                </Grid.Col>
            </Grid>
        </Container>

        // <Container fluid>
        //     <Group gap="50">
                // <Link to ="/">
                //     <ActionIcon variant="transparent" aria-label="Home" size="65">
                //         <img 
                //             src={volcano} 
                //             style={{ height: 65, width: 65}}
                //             alt="home-button" />
                //     </ActionIcon>
                // </Link>
                // <Link to="/list" style={{ textDecoration: 'none' }}>
                //     <NavLink
                //         label="Volcanoes"
                //         rightSection={
                //             <img
                //                 src={chevron_right}
                //                 style={{ height: 30, width: 30 }}
                //             />
                //         }
                //         classNames={{label: 'header-navlink-label'}}
                //     />
                // </Link>
                // <Link to="/login">
                //     <Button
                //         leftSection={
                //             <img 
                //                 src={login} 
                //                 alt="sign-in-button" 
                //                 style={{ height: 20, width: 20 }}
                //             />
                //         }
                //         style={{ justifyContent: 'end' }}
                //     >
                //         Sign in
                //     </Button>
                // </Link>
        //     </Group>
        // </Container>

        // <nav>
        //     <ul>
        //         <li>
        //             <Link to="/">Home</Link>
        //         </li>
        //         <li>
        //             <Link to="/list">Volcano List</Link>
        //         </li>
        //         <li>
        //             <Link to="/login">Sign in</Link>
        //         </li>
        //     </ul>
        // </nav>
    );
}