import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Container, 
    Grid,
    ActionIcon,
    NavLink,
    Button, 
} from "@mantine/core";

import volcano from "../assets/volcano.png";
import chevron_right from "../assets/chevron_right.png";
import login from "../assets/login.png";
import logout from "../assets/logout.png";

/**
 * 
 * @todo global styles for page margins
 */
export default function Nav({loggedIn, setLoggedIn}) {

    // Renders sign in OR log out button based on session state
    function loadSessionButton() {
        if (loggedIn) {
            return (
                // log out button
                <Link to="/">
                    <Button
                        onClick={() => {
                            localStorage.removeItem("token");
                            setLoggedIn(false);
                        }}
                        variant="outline"
                        size="lg"
                        color="orange"
                        radius="md"
                        leftSection={
                            <img src={logout} alt="log-out-button" style={{ height: 28, width: 28 }} />
                        }
                    >
                        Log out
                    </Button>
                </Link>
            );
        }

        return (
            <Link to="/login">
            <Button
                variant="outline"
                size="lg"
                color="orange"
                radius="md"
                leftSection={
                    <img src={login} alt="sign-in-button" style={{ height: 28, width: 28 }} />
                }
                style={{ justifyContent: 'end', fontSize: 22 }}
            >
                Sign in
            </Button>
        </Link>
        );
    }

    return (
        <Container size="110rem" style={{paddingTop: 20}}>
            <Grid>
                <Grid.Col span="content">
                    <Link to ="/">
                        <ActionIcon variant="transparent" aria-label="Home" size="65">
                            <img src={volcano} style={{ height: 65, width: 65}} alt="home-button" />
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
                    {loadSessionButton()}
                </Grid.Col>
            </Grid>
        </Container>
    );
}

Nav.propTypes = {
    loggedIn: PropTypes.bool,
    setLoggedIn: PropTypes.func
}