import { 
    createTheme, 
    Notification, 
    NavLink, 
} from "@mantine/core";
import '../assets/Bilthers/Bilthers.css';
import '../assets/KayakSans/KayakSans.css';

export const theme = createTheme({
    fontFamily: 'Kayak Sans Regular, sans-serif',
    defaultRadius: 'md',
    headings: { fontFamily: 'Bilthers, sans-serif'},
    components: {
        Notification: Notification.extend({
            classNames: {
                root: 'notif-root-class'
            },
            styles: {
                root: {
                    maxWidth: 400,
                }
            }
        }),

        NavLink: NavLink.extend({
            classNames: {
                label: 'header-navlink-label'
            },
            styles: {
                label: {
                    fontSize: 30,
                    color: '#aeaeae',
                }
            }
        }),
    },
});