import { createTheme, MantineColorsTuple, Notification, NavLink } from "@mantine/core";
import '../assets/Bilthers/Bilthers.css';
import '../assets/KayakSans/KayakSans.css';

const colours: MantineColorsTuple = [
    '#fff4e2',
    '#ffe7cc',
    '#ffcf9b',
    '#ffb564',
    '#fe9e38',
    '#fe901b',
    '#ff8909',
    '#e47600',
    '#ca6800',
    '#b05800'
  ];

export const theme = createTheme({
    fontFamily: 'Kayak Sans Regular, sans-serif',
    defaultRadius: 'md',
    // headings: { fontFamily: 'Bilthers, sans-serif'},
    colors: {
        colours,
    },
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
        })

    },
    
});

// const themeOverride = createTheme({
//     primaryColor: 'orange',
//     defaultRadius: 0,
// });

// export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);