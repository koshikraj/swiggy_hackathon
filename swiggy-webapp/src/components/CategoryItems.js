import React, { Component } from 'react';
// import {getMenuList} from "../api/getMenuList.js";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import '../App.css';
import Modal from "../containers/Modal";
import veg from '../veg.png';
import nonveg from '../nonveg.png';
import rupee from '../rupee.png';

class CategoryItems extends Component {

  render() {
    return (
      <div style={{paddingBottom:15}}>
      <div style={{display: 'flex',flex_wrap: 'nowrap', paddingBottom:10}}>
      <div>{(this.props.ItemData.is_veg)?<img style={{width:15, paddingRight:8}} src={veg}/>:<img style={{width:15, paddingRight:8}} src={nonveg}/>}</div>
      <div style={{fontWeight:'bold'}}>{this.props.ItemData.item_name}</div>
      <div ><Modal ItemData={this.props.ItemData}/></div>
      </div>
      <div style={{display: 'flex',flex_wrap: 'nowrap'}}>
      <img src={rupee} style={{width:10, height:14, marginLeft:22}}/>
      <div>{this.props.ItemData.price}</div>
      </div>
      </div>
    );
  }
}

export default CategoryItems;
