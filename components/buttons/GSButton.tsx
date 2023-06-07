import { Button, Group} from "@mantine/core";
import useStyles from '../style/GreaterThanSmall.style';

    
export const GsButton = ({ ...rest }) =>  {
    const { classes } = useStyles();
    return (
    <Group className={classes.links}>
        <Button radius="xl" h={40}  { ...rest }>GetStarted</Button>
    </Group>
    );
}
export const GsLogoutButton = ({ ...rest }) =>  {
    const { classes } = useStyles();
    return (
    <Group className={classes.links}>
        <Button radius="md" h={40}  { ...rest }>LogOut</Button>
    </Group>
    );
}
