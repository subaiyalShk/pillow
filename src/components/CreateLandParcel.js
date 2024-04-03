import React, {useEffect, useState} from 'react';
import { Button, Box, Card, TextField, Flex, Heading, DataList, Badge, Code, IconButton, Link } from '@radix-ui/themes';
import { create } from "ipfs-http-client"

const projectId = process.env.REACT_APP_INFURA_API_KEY;
const projectSecret = process.env.REACT_APP_INFURA_API_SECRET;
console.log(projectId, projectSecret)
const authorization = "Basic " + btoa(projectId + ':' + projectSecret);

const client = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: authorization,
    },
})


function CreateLandParcel ({draw, setDraw, features}) {
    const [metaData, setMetaData] = useState({})
    const [area, setArea] = useState(0)

    useEffect(() =>{
        setMetaData(Object.values(features)[0]);
        if(Object.keys(features).length != 0){
            const enclosedArea = calculateEnclosedArea(Object.values(features)[0].geometry.coordinates[0]);
            setArea(enclosedArea)
        }
    },[features]);

    const mintLandParcel = async () => {
        // first upload metaData to IPFS
   
        // then mint the land parcel as an NFT

        try {
            const { path } = await client.add(JSON.stringify(metaData));
            console.log(path);
          } catch (error) {
            console.error('Error uploading JSON to IPFS:', error);
          }
    }

    return(
        <Flex className='claim-land-form' direction={'column'}  gap="5">
            <Box>
                <Heading>Claim Your land</Heading>
            </Box>
            {draw?
            <Box>
                <DataList.Root>
                    <DataList.Item align="center">
                        <DataList.Label minWidth="88px">Status</DataList.Label>
                        <DataList.Value>
                            <Badge color="jade" variant="soft" radius="full">
                                Available
                            </Badge>
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label minWidth="88px">ID</DataList.Label>
                        <DataList.Value>
                        <Flex align="center" gap="2">
                            <Code variant="ghost">{metaData?.id}</Code>
                            <IconButton
                                size="1"
                                aria-label="Copy value"
                                color="gray"
                                variant="ghost"
                            >
                            </IconButton>
                        </Flex>
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label minWidth="88px">Owner</DataList.Label>
                        <DataList.Value><TextField.Root size="2" placeholder="enter your name" /></DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label minWidth="88px">Cost</DataList.Label>
                        <DataList.Value>
                            0.5eth
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label minWidth="88px">Area</DataList.Label>
                        <DataList.Value>
                            {Math.ceil(area)+" sqtf"}
                        </DataList.Value>
                    </DataList.Item>
                </DataList.Root>
            </Box>:
            <Button onClick={()=>setDraw(true)}>Draw</Button>}
            
            {draw?<Button onClick={mintLandParcel}>Confirm</Button>:null}
        
        </Flex>
    )
}
export default CreateLandParcel;

function calculateEnclosedArea(geopoints) {
    const EARTH_RADIUS_IN_FEET = 20902231; // Earth's radius in feet

    // Function to convert degrees to radians
    function degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    // Function to calculate distance between two points in feet
    function distanceInFeet(lat1, lon1, lat2, lon2) {
        const dLat = degreesToRadians(lat2 - lat1);
        const dLon = degreesToRadians(lon2 - lon1);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS_IN_FEET * c;
    }

    // Calculate area using shoelace formula
    function calculateShoelaceArea(points) {
        let area = 0;
        for (let i = 0; i < points.length; i++) {
            const j = (i + 1) % points.length;
            area += (points[i][0] * points[j][1]) - (points[j][0] * points[i][1]);
        }
        return Math.abs(area) / 2;
    }

    // Convert geopoints to (x, y) coordinates in feet
    const pointsInFeet = geopoints.map(point => {
        const x = distanceInFeet(geopoints[0][0], geopoints[0][1], point[0], geopoints[0][1]);
        const y = distanceInFeet(geopoints[0][0], geopoints[0][1], geopoints[0][0], point[1]);
        return [x, y];
    });

    // Calculate area using shoelace formula
    const area = calculateShoelaceArea(pointsInFeet);

    return area;
}