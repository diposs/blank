import { Button, Group} from "@mantine/core";
import useStyles from '../style/GreaterThanSmall.style';

    const { classes } = useStyles();
export const GsButton = ({ ...rest }) =>  {
    return (
    <Group className={classes.links}>
        <Button radius="xl" h={40}  { ...rest }>GetStarted</Button>
    </Group>
    );
}
export const GsLogoutButton = ({ ...rest }) =>  {
    return (
    <Group className={classes.links}>
        <Button radius="md" h={40}  { ...rest }>LogOut</Button>
    </Group>
    );
}
