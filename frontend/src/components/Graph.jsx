import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";

export default function Graph(props) {
  return (
    <>
      
 

  
    <Card className="mt-10 w-150"  style={{ height: '400px' , margin: '100px'}}>
      <CardHeader color="blue-gray" className="h-46">
        <img
          src={props.img}
          alt="card-image"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-4">
          {props.calamity}
        </Typography>
        <Typography>
          {props.content}
        </Typography>
      </CardBody>
    </Card>
  

    </>
  )
}
