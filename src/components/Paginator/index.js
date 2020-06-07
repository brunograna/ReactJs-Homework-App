import React from "react";
import './styles.css'
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';

export default function Paginator({onPrev, onNext, hasNext, hasPrev}) {
    return (
      <>
          <div className={'paginator'}>
              <button type={'button'} className={hasPrev ? '' : 'hide'} onClick={onPrev}>
                  <ArrowBackIosOutlinedIcon />
              </button>
              <button type={'button'} className={hasNext ? '' : 'hide'} onClick={onNext}>
                <ArrowForwardIosOutlinedIcon />
              </button>
          </div>
      </>
    );
}