import { ActionIcon } from '@mantine/core';
import { IconMenu2 } from '@tabler/icons-react';
import useStyles from '../style/SmallerThanSmall.style'



export const Burgy = ({ ...rest }) => {
    const { classes } = useStyles();
return  (
    <ActionIcon color="violet" size="lg" radius="md" variant="transparent" className={classes.burgerCss} { ...rest } >
        <IconMenu2 size="1.625rem" />
    </ActionIcon>
);
}