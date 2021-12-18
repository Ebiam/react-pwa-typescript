import MenuNavbar from "../components/material/MenuNavbar";
import Button from '@mui/material/Button';
import React from "react";
import './Home.css';
import {/*useLocation,*/ useNavigate} from 'react-router-dom';

import {useAppDispatch} from '../redux2/store/hooks';
import {RootState} from '../redux2/store/store';
//import { login, logout } from '../redux2/user/userSlice';
import  {useAppSelector} from "../redux2/store/hooks";
//import Toast from "../components/material/Toast";
import { setOpen } from '../redux2/toast/toastSlice';


export default function Home() {
    const navigate = useNavigate();
    const isLogged = useAppSelector((state: RootState) => state.user.isLogged)//useAppSelector(r_isLogged);
    const dispatch = useAppDispatch();

    return (
        <div className={"Page-content"}>
            <MenuNavbar isLogged={isLogged}/>
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
                    Let's start now !
                </p>
            </div>
            <div className={'home-content'}>
                <Button variant="contained" onClick={() => navigate('login')}>Let's go !</Button>
                <Button variant="contained" onClick={() => navigate('user')}>Random user</Button>

                <Button variant="contained" onClick={() =>
                    dispatch(setOpen(true))
                }>Open toast</Button>
            </div>

        </div>
    );
};
