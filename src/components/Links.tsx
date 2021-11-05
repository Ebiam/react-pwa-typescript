import React from "react";
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import './Link.css';

function Link(props: any) {

    const find_icon = (type: number) => {
        switch (type){
            case 1:
                return <YouTubeIcon style={{fill: "red", height: '100%', width: '100%'}}/>;
            default:
                return <InstagramIcon style={{fill: 'linear-gradient(70deg, #3A2D78, #c000ff, #FF9A22)', height: '100%', width: '100%'}}/>;
        }
    };

    return (
        <div className={"Link"}>
            <div className={"Link-header"}>
                <div className={"Link-icon"}>
                    {find_icon(props.plateform)}
                </div>
            </div>
            <div className={"Link-content"}>
                <p style={{marginTop: '1%'}}>Title</p>
                <p style={{margin: '1%'}}>@enzo.biam</p>
            </div>
        </div>
    )
}



export default function Links(props: any){

    return (
        <div className={"Links-container"}>
            <Link plateform={0}/>
            <Link plateform={1}/>
            <Link plateform={1}/>
            <Link plateform={1}/>
            <Link plateform={1}/>
        </div>
    )
}
