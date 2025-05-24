import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";

export default function Cards(props) {
  return (
    <>
      
 

  
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={props.img}
          alt="card-image"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {props.calamity}
        </Typography>
        <Typography>
          {props.content}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <a href={props.link} target="_blank" rel="noopener noreferrer">
          <Button>Read More</Button>
        </a>
      </CardFooter>
    </Card>
  

    </>
  )
}

