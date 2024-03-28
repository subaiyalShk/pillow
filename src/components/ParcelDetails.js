import React from 'react';
import {TextField, Flex, Button, Dialog, Text, Table} from '@radix-ui/themes';

function ParcelDetails () {
    return(
        <Dialog.Root>
            <Dialog.Trigger>
                <Button>Inquire</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title>$14,520,000 - 121.03 Acres</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                    County Road 175, Celina, TX 75009 - Collin County
                </Dialog.Description>

                <Flex direction="column" gap="3">
                <Text size="4">Historical Data</Text>
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                        <Table.ColumnHeaderCell>Owner</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Purchase Price</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Date</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                        <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
                        <Table.Cell>$10,520,000</Table.Cell>
                        <Table.Cell>01/12/2012</Table.Cell>
                        </Table.Row>

                        <Table.Row>
                        <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
                        <Table.Cell>$9,520,000</Table.Cell>
                        <Table.Cell>05/06/1984</Table.Cell>
                        </Table.Row>

                        <Table.Row>
                        <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
                        <Table.Cell>$3,520,000</Table.Cell>
                        <Table.Cell>27/09/1845</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                    </Table.Root>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                    <Button variant="soft" color="gray">
                    Cancel
                    </Button>
                </Dialog.Close>
                <Dialog.Close>
                    <Button>Buy</Button>
                </Dialog.Close>
                </Flex>
            </Dialog.Content>
            </Dialog.Root>
    )
}
export default ParcelDetails;