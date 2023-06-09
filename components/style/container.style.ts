import { createStyles } from '@mantine/core';

export default createStyles ((theme) => ({
      inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
      },
      burgerCss: {
        [theme.fn.largerThan('sm')]: {
          display: 'none',
        },
      },
      controldd: {
          borderRadius: '12px 12px 0px 0px!important',
      },
})
)
