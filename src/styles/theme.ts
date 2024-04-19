import { createTheme, DEFAULT_THEME, mergeMantineTheme, MantineColorsTuple } from "@mantine/core";

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
    fontFamily: 'Open Sans, sans-serif',
    defaultRadius: 'md',
    colors: {
        colours,
    },
    
});

// const themeOverride = createTheme({
//     primaryColor: 'orange',
//     defaultRadius: 0,
// });

// export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);