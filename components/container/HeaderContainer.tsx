import { useState, useEffect } from 'react';
import { Container,Modal,Button,Stack,Burger,Drawer} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import  useStyles  from '../style/container.style'
import { HeadGroup } from '../inputs/HeaderGroup';
import { MenuGroup } from '../inputs/MenuGroup';
import { GsButton } from '../buttons/GSButton';
import { useAuth, usePolybase, useIsAuthenticated} from "@polybase/react";
import { secp256k1, encodeToString  } from '@polybase/util'
import * as eth from "@polybase/eth";
import { useBoundStore3, useBoundStore } from '../../stores/datastate'

export function HeaderContainer()  {
  const { classes } = useStyles();
  const { auth } = useAuth();
  const [opened, { open, close }] = useDisclosure(false);
  const openedburger = useBoundStore((state) => state.mmc);
  const update = useBoundStore((state) => state.update);
  const toggled = (() => {update(!openedburger)})
  const { inUser, updateinUser, pKey, updatepKey } = useBoundStore3();
  const valued = inUser;
  const [isLoggedIn] = useIsAuthenticated();
  const content = Array(12)
    .fill(0)
    .map((_, index) => <p key={index}>Drawer with scroll</p>);
  const polybase = usePolybase();
  const signInUser =  async() => {
    const res = await auth.signIn();
    let publicKeys: any  = res!.publicKey;
    var userData = await polybase.collection('userpvkeyAccount').record(publicKeys).get();
    const exists = userData.exists();
    if(exists == false){
      const { privateKey, publicKey } = await secp256k1.generateKeyPair();
      const accounts = await eth.requestAccounts();
      const account = accounts[0];
      const encodedstr = encodeToString(privateKey, 'hex')
      const encryptedValue = await eth.encrypt(encodedstr, account);
      console.log(encryptedValue,'ddd')
      console.log(encodedstr,'ddssd')
    }
    
    console.log(auth!,'jjj');
    };
  useEffect(() => {
    auth!.onAuthUpdate((authState) => {
    })
  },[auth,updatepKey])
  return (
    <>
  <Container className={classes.inner} fluid>
    <HeadGroup/>
    <MenuGroup/>
    {isLoggedIn ? (<GsButton onClick={signInUser} />) : (<GsButton onClick={signInUser} />)}
    <Burger opened={openedburger} onClick={toggled} className={classes.burgerCss} />
    <Modal opened={opened} onClose={close} size="auto" centered withCloseButton={false} closeOnClickOutside={false}>
      <Stack align="stretch" spacing="xs">
        <Button color="blue" size="lg">Sign Up Without Username</Button>
        <Button color="violet" size="lg">Sign Up</Button>
        <Button color="red" size="lg">Close</Button>
      </Stack>
    </Modal>
    <Drawer opened={openedburger} onClose={toggled} classNames={{root: classes.burgerCss, content: classes.controldd,}} position="bottom" size='60dvh' title="  " withCloseButton={false}>
      {content}
    </Drawer>
  </Container>
      </>
  );
}; 
