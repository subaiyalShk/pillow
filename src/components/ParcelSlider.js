import React, { useState, useEffect } from 'react';
import { Flex, Text, Button, Box, Card, Avatar, TabNav, Container, Inset, Strong } from '@radix-ui/themes';
import ParcelDetails from './ParcelDetails';
function PropertySlider () {
    return(
        <Box className='property-slider'>
            <Card className='property-card' size="2">
              <Inset clip="padding-box" side="top" pb="current">
                <img
                  src="https://assets.land.com/resizedimages/162/243/h/80/w/1-5039501273"
                  alt="Bold typography"
                  style={{
                    display: 'block',
                    objectFit: 'cover',
                    width: '100%',
                    height: 140,
                    backgroundColor: 'var(--gray-5)',
                  }}
                />
              </Inset>
              <Text as="p" size="3">
                <Strong>500 LAND Tokens - 108 Acres</Strong><br/> 744 Bourland Bend, Celina, TX 75009 - Collin County
              </Text>
              <ParcelDetails/>
            </Card>
            <Card className='property-card' size="2">
              <Inset clip="padding-box" side="top" pb="current">
                <img
                  src="https://assets.land.com/resizedimages/162/243/h/80/w/1-5082344708"
                  alt="Bold typography"
                  style={{
                    display: 'block',
                    objectFit: 'cover',
                    width: '100%',
                    height: 140,
                    backgroundColor: 'var(--gray-5)',
                  }}
                />
              </Inset>
              <Text as="p" size="3">
                <Strong>500 LAND Tokens - 108 Acres</Strong><br/> 744 Bourland Bend, Celina, TX 75009 - Collin County
              </Text>
              <ParcelDetails/>
            </Card>
            <Card className='property-card' size="2">
              <Inset clip="padding-box" side="top" pb="current">
                <img
                  src="https://assets.land.com/resizedimages/162/243/h/80/w/1-5161432189"
                  alt="Bold typography"
                  style={{
                    display: 'block',
                    objectFit: 'cover',
                    width: '100%',
                    height: 140,
                    backgroundColor: 'var(--gray-5)',
                  }}
                />
              </Inset>
              <Text as="p" size="3">
                <Strong>500 LAND Tokens - 108 Acres</Strong><br/> 744 Bourland Bend, Celina, TX 75009 - Collin County
              </Text>
              <ParcelDetails/>
            </Card>
          </Box>
    )
} 

export default PropertySlider;