
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SidebarHead from '../component/Sidebarhead/sidebarHead';
import { useState, useEffect } from 'react';
import './profileNew.css'
import Profile from './profile';

function ProfileNew() {

    const [useName, setName] = useState("");
    useEffect(() => {
        console.log("checking");
        fetch("http://localhost/ecommerceapi/api/viewuserbyid.php", {
            body: JSON.stringify({ userId: 4 }),

            method: "POST",
        })
            .then((res) => res.json())
            .then(
                (result) => {

                    console.log(result);

                    setName(result);



                },

                (error) => {
                    console.log(error);
                }
            );
    }, []);
    return (<>
        <SidebarHead />
        <div className='grid-container'>
            <div className='grid-item'>
            <div className='cent'>
                <Card sx={{ maxWidth: 500 }}>
                    <h2>User Profile</h2>
                    <CardMedia
                        component="img"
                        alt="dq"
                        height="300"
                        width="100"
                        src={require(`../images/dq.jpg`)}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {useName.userName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {useName.email}
                            <br />
                            {useName.phoneNumber}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Edit</Button>
                        <Button size="small">Change Password</Button>
                    </CardActions>
                </Card>
                </div>
            </div>
            <div className='grid-item'>
                <Profile />
            </div>
            
        </div>
        
    </>);


}

export default ProfileNew;