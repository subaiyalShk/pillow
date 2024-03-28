import React from 'react';
import { Button, Box, Card, TextField, Flex, Heading } from '@radix-ui/themes';

function CreateLandParcel () {
    return(
        <Flex className='claim-land-form' direction={'column'}  gap="3">
            <Heading>Type in your name to claim land</Heading>
            <TextField.Root size="2" placeholder="enter your name" />
        </Flex>
    )
}
export default CreateLandParcel;