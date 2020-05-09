import React from "react";
import './styles.css';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';

function ButtonAttachment({to, title, className, ...rest}) {
    return (
        <button type='button' className={`button-attachment ${className}`} {...rest}>
            {title}
            <PhotoCameraOutlinedIcon style={{color: '#ffffff'}} />
        </button>
    );
}

export default ButtonAttachment;