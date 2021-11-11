import MenuNavbar from "../components/material/MenuNavbar";
import Button from '@mui/material/Button';
import React from "react";
import './Home.css';
import {useNavigate} from 'react-router-dom';


export default function Home() {
    const navigate = useNavigate();

    return (
        <div className={"Page-content"}>
            <MenuNavbar/>
            <div className={'home-content'}>
                <p style={{fontFamily: 'Mochiy Pop One', fontSize:'10vw', maxHeight: '30vh'}}>FollowMe!</p>
            </div>
            <div style={{marginInline: 25, alignItems: 'center', textAlign: 'center'}}>
                <p style={{
                    verticalAlign: 'middle',
                    lineHeight: '1.5',
                    display: 'inline-block'
                }}>
                    Tired to search your friend's different username in all social medias ? <br/>
                    You find it painful to give all your socials everytime you meet someone new ? <br/>
                    Angry to miss content because the creator put Instagram before TikTok ? <br/><br/>
                    This is the solution. All the socials in one page. One page to rule them all. <br/>
                </p>
            </div>
            <div className={'home-content'}>
                <Button variant="contained" onClick={() => navigate('login')}>Let's go !</Button>
            </div>

        </div>
    );
};
