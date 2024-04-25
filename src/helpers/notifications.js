/**
 * Collection of notifications displayed in various parts of the website
 */
import { notifications } from "@mantine/notifications";

export function wrongEmailNotif() {
    return notifications.show({
        title: "Incorrect email or password",
        message: "Try again or create an account",
        color: "red",
        autoClose: 4500,
        withCloseButton: false,
        className: "notif-root-class",
    });
}

export function alreadyLoggedInNotif() {
    return notifications.show({
        title: "Error",
        message: "User already logged in",
        color: "red",
        autoClose: 4500,
        withCloseButton: false,
        className: "notif-root-class",
    });
}

export function loginSuccessNotif() {
    notifications.show({
        title: "Welcome back to Volcaneer!",
        message: "You are now logged in",
        color: "green",
        autoClose: 4500,
        withCloseButton: false,
        className: "notif-root-class",
    });
}

export function accountExistsNotif() {
    notifications.show({
        title: "Account already exists",
        message: "Please log in",
        color: "red",
        autoClose: 4500,
        withCloseButton: false,
        className: "notif-root-class"
    });
}

export function accountCreatedNotif() {
    notifications.show({
        title: "Account created",
        message: "You can log in now",
        color: "green",
        autoClose: 4500,
        withCloseButton: false,
        className: "notif-root-class"
    });
}

export function miscErrorNotif() {
    return notifications.show({
        title: "Unexpected error occurred",
        message: "Oops, something's gone wrong",
        color: "red",
        autoClose: 4500,
        withCloseButton: false,
        className: "notif-root-class",
    });
}