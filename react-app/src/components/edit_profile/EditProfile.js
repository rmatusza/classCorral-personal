import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Avatar, Typography, Button, Modal, TextField, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import 'fontsource-roboto';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: 'white',
        outline: '0',
        border: '2px solid white',
        borderRadius: '5px',
        boxShadow: theme.shadows[5],
        paddingLeft: '5rem',
        paddingRight: '5rem',
        paddingTop: '2rem',
        paddingBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    editHeading: {
        marginBottom: '1rem'
    },
    menuButton: {
        border: 'none',
        fontFamily: 'Roboto',
        fontSize: '16px',
        marginLeft: '-6px',
        backgroundColor: 'white',
        "&:hover": {
            backgroundColor: '#f5f5f5'
        },
        margin: theme.spacing(1),
    },
    element: {
        padding: '1rem',
    },
    button: {
        marginTop: '2rem',
    },
    btnContainer: {
        position: 'relative',
        left: '72%',
        bottom: '100%',
    },
    exitBtn: {
        position: 'relative',
        bottom: '1.95rem',
        left: '8.5rem',
        border: 'none',
        paddingRight: '0px',
        paddingLeft: '0px',
    },
    avatar: {
        marginBottom: '1rem',
        width: theme.spacing(7),
        height: theme.spacing(7)
    }
}));

const EditProfile = (state) => {
    // const currentUser = useSelector((state) => state.store.current_user)
    // const idd = currentUser.id
    const classes = useStyles();
    const [openModal, setOpenModal] = React.useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");

    // access current_user id object from redux store
    // ---------------------------------------
    // const id = localStorage.getItem('USERID')
    // ---------------------------------------
    //check form submission for updateProfile call


    const currentUser = useSelector((state) => state.store)
    // console.log(currentUser.current_user.id)

    if (!currentUser.current_user) return null;
    const id = currentUser.current_user.id




    const updateProfile = async () => {
        const response = await fetch(`/api/users/${id}/update`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password, avatarUrl }),
        });
        if (response.ok) {
            window.location.reload()
        }
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };


    const updateUsername = (e) => {
        setUsername(e.target.value);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    const updateAvatarUrl = (e) => {
        setAvatarUrl(e.target.value);
    };



    return (

        <div className='profile-edit__container'>

            <button type="button" className={classes.menuButton} onClick={handleOpenModal}>
                Edit Profile
            </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openModal}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <Typography variant='h5'>
                        <form className={classes.paper} noValidate autoComplete='off' onSubmit={updateProfile}>
                            {/* <form className={classes.paper} noValidate autoComplete='off'> */}
                            <Button size='large' variant='contained' onClick={handleCloseModal} className={classes.exitBtn} variant='outlined'>x</Button>
                            <Avatar alt="" src={avatarUrl} className={classes.avatar} size='large'></Avatar>
                            <Typography variant='h4' className={classes.editHeading}>
                                Edit Profile
                            </Typography>
                            <TextField id='standard-basic' value={username} onChange={updateUsername} label='Username' autoFocus />
                            <TextField id='standard-basic' value={email} onChange={updateEmail} label='Email' />
                            <TextField id='standard-basic' value={password} onChange={updatePassword} label='Password' />
                            <TextField id='standard-basic' value={avatarUrl} onChange={updateAvatarUrl} label='Avatar URL' />
                            <Button variant='contained' color='primary' className={classes.button} type='submit'>Submit</Button>
                        </form>
                    </Typography>
                </Fade>
            </Modal>




        </div>
    );
}

export default EditProfile;
