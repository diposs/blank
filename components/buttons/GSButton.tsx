import { Button, Group} from "@mantine/core";
import useStyles from '../style/GreaterThanSmall.style';

export const GsButton = ({ ...rest }) =>  {
    const { classes } = useStyles();
    return (
    <Group className={classes.links}>
        <Button radius="xl" h={30}  { ...rest }>GetStarted</Button>
    </Group>
    );
}