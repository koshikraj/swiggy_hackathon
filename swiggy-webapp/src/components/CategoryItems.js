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

class CategoryItems extends Component {

  render() {
    return (
      <div style={{paddingBottom:15}}>
      <div>{(this.props.ItemData.is_veg)?'veg':'non veg'}
      {this.props.ItemData.item_name}
      <div className="right-align"><Modal ItemData={this.props.ItemData}/></div>
      </div>
      <div>{this.props.ItemData.price}</div>
      </div>
    );
  }
}

export default CategoryItems;
