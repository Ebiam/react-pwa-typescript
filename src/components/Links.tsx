import React from "react";
//import YouTubeIcon from '@mui/icons-material/YouTube';
//import InstagramIcon from '@mui/icons-material/Instagram';
import './Link.css';
import ApiHelper from "../services/ApiHelper";
import {useAppDispatch, useAppSelector} from "../redux2/store/hooks";
import {RootState} from "../redux2/store/store";
//import {array} from "prop-types";
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import {setState} from "../redux2/sw/swSlice";

function Task(props: any) {

    const [title, setTitle] = React.useState("");
    const [desc, setDesc] = React.useState("");

    if (props.edit)
    {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                borderRadius: '5px',
                backgroundColor: '#4ea8de',
                minHeight: '40px',
                marginBlock: '5px',
                border: 'solid 1px #000000',

            }}>
                <div style={{
                    width:'10%',
                    borderRadius: '5px',
                    backgroundColor: 'lightcoral',
                }}>
                    <Checkbox style={{height: '100%', width: '100%',}} size={'medium'}/>
                </div>
                <div style={{
                    width: '90%',
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: 'white'
                }}>
                    <TextField label="Title" style={{marginTop: '1%', width: '40%'}} value={title} onChange={(event) => setTitle(event.target.value)}>{title}</TextField>
                    <TextField label="Description" style={{margin: '1%', width: '50%'}}  onChange={(event) => setDesc(event.target.value)}>{desc}</TextField>
                    <button style={{margin: '1%', height: '90%', width: '10%'}} onClick={() => props.add(title, desc)}>+</button>
                </div>
            </div>
        )
    }

    return (
        <div className={"Link"}>
            <div className={"Link-header"}>
                <Checkbox style={{height: '100%', width: '100%',}} checked={props.task.done}/>
            </div>
            <div style={{
                width: '90%',
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: props.task.temp ? 'orange' : 'white'
            }}>
                <p style={{marginTop: '1%', width: '47%',}}>{props.task.title}</p>
                <p style={{margin: '1%', width: '47%'}}>{props.task.desc}</p>
                {props.task.temp ? <p style={{ width: '6%'}}>*</p> : null}
            </div>
        </div>
    )
}

function TasksList() {

    const username = useAppSelector((state: RootState) => state.user.username);
    const [array, setArray] = React.useState([]);
    const [edit, setEdit] = React.useState(false);
    const dispatch = useAppDispatch();

    const _get = () => {
        ApiHelper.getTasks(username).then((res: any) => {
            console.log('[Link] Get ok', res, res!.data!.tasks);

            if (res!.data!.tasks) {
                let a: any = [];
                res.data.tasks.map((t : any) => {
                    a.push(t)
                    return null;
                });
                setArray(a);
            }
            dispatch(setState('online'));
        }).catch((err) => {
            console.log(err);
            dispatch(setState('pending'));
        });
    };

    React.useEffect(() => {
        _get();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const _add = (title: any, desc :any) => {
        ApiHelper.addTasks(username, title,desc,false).then((res) => {
            console.log('[Link] Add ok', res);
            _get();

        }).catch((err) => {
            console.log("OW OW OW", err);
            let a : any = [];
            array.map((t : any) => {
                a.push(t);
                return null;
            });
            let b : any = {username, title,desc, done:false,  temp: true};
            a.push(b);
            setArray(a);
            dispatch(setState('pending'));
        });
    };

    return (
        <>
            <button onClick={
                () => {
                    setEdit(!edit);
                }
            }>Addddd</button>
            {edit ? <Task edit={true} add={_add} />: null}
            {array.map((t : any) => <Task key={'a'} task={t}/>)}
            <p>{array.length}</p>
        </>
    );
}



export default function Links(props: any){


    return (
        <div className={"Links-container"}>

            <TasksList />
            {/*<Link plateform={0}/>
            <Link plateform={1}/>
            <Link plateform={1}/>
            <Link plateform={1}/>
            <Link plateform={1}/>*/}
        </div>
    )
}
