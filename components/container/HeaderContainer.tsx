import { useEffect } from 'react';
import { Container, Modal, Button, Stack, Burger, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import  useStyles  from '../style/container.style'
import { HeadGroup } from '../inputs/HeaderGroup';
import { MenuGroup } from '../inputs/MenuGroup';
import { GsButton, GsLogoutButton } from '../buttons/GSButton';
import { useAuth, usePolybase, useIsAuthenticated } from "@polybase/react";
import { secp256k1, aescbc, decodeFromString, encodeToString, EncryptedDataAesCbc256 } from '@polybase/util'
import { useBoundStore3, useBoundStore } from '../../stores/datastate'

export function HeaderContainer()  {
  const { classes } = useStyles();
  const { auth, state } = useAuth();
  const [opened, { open, close }] = useDisclosure(false);
  const openedburger = useBoundStore((state) => state.mmc);
  const update = useBoundStore((state) => state.update);
  const toggled = (() => {update(!openedburger)})
  const { inUser, pRecord, updateinUser, pKey, updatepRecord, updatepKey, pvKey, updatepvKey } = useBoundStore3();
  const valued = inUser;
  const [isLoggedIn] = useIsAuthenticated();
  const content = Array(12)
    .fill(0)
    .map((_, index) => <p key={index}>Drawer with scroll</p>);
  const polybase = usePolybase();
  const signInUser =  async() => {
    updatepvKey(null);
    updateinUser(null);
    updatepRecord(null);
    updatepKey(null);
    const res = await auth.signIn();
    let publicKeys: any  = res!.publicKey;
    updateinUser(publicKeys);
    const userData = await polybase.collection('userpvkeyAccount').record(publicKeys).get();
    const exists = userData.exists();
    if(exists == false){
      const privateKey = await secp256k1.generatePrivateKey();
      const keys = decodeFromString(publicKeys, 'hex');
      const key =  keys.subarray(0, 32);
      const encryptedData = await aescbc.symmetricEncrypt(key, privateKey);
      const encryptedDataJson = {version: encryptedData.version, nonce: encryptedData.nonce, ciphertext: encryptedData.ciphertext, };
      const encryptedDataJsonstr = JSON.stringify(encryptedDataJson);
      const strDataAsUint8Array = decodeFromString(encryptedDataJsonstr, 'utf8');
      const str = encodeToString(strDataAsUint8Array, 'hex');
      const upload = await polybase.collection('userpvkeyAccount').create([str]);
      const publicKey = await secp256k1.getPublicKey(privateKey);
      const precordalpha = encodeToString(publicKey, 'hex');
      const recordkey = '0x' + precordalpha.slice(4);
      updatepRecord(recordkey);
      updatepKey(publicKey);
      updatepvKey(privateKey);
    }else{
      const decryptedValue = decodeFromString(userData.data.pvkey,  'hex');
      const str = encodeToString(decryptedValue, 'utf8');
      const decryptedData = JSON.parse(str);
      const keys = decodeFromString(publicKeys, 'hex');
      const key =  keys.subarray(0, 32);
      var nonce = decryptedData.nonce;
      var resultnonce = [];
      var resultciphertext = [];
      var ciphertext = decryptedData.ciphertext;
      for(var i in nonce){
        resultnonce.push(nonce[i]);
      }
      for(var i in ciphertext){
        resultciphertext.push(ciphertext[i]);
      }
      const decryptedDataJson = {version: decryptedData.version, nonce: new Uint8Array(resultnonce), ciphertext: new Uint8Array(resultciphertext), };
      const strData = await aescbc.symmetricDecrypt(key, decryptedDataJson);
      const publicKey = await secp256k1.getPublicKey(strData);
      const precordalpha = encodeToString(publicKey, 'hex');
      const recordkey = '0x' + precordalpha.slice(4);
      updatepRecord(recordkey);
      updatepvKey(strData);
      updatepKey(publicKey);
     }
    };
  const signoutUser =  async() => {
    await auth.signOut();
    updatepvKey(null);
    updateinUser(null);
    updatepRecord(null);
    updatepKey(null);
  }
  useEffect(() => {
    auth!.onAuthUpdate((authState) => {
    })
  })
  return (
    <>
  <Container className={classes.inner} fluid>
    <HeadGroup/>
    <MenuGroup/>
    {isLoggedIn && (pKey != null) && (state!.publicKey == inUser)  ? (<GsLogoutButton onClick={signoutUser} />) : (<GsButton onClick={signInUser} />)}
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
