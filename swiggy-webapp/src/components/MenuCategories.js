import React, { Component } from 'react';
// import {getMenuList} from "../api/getMenuList.js";
import '../App.css';

class MenuCategories extends Component {

  render() {
    return (
      <div style={{color:(this.props.active)?'orange':'black', marginBottom:20}}>
      {this.props.CategoryData.category_name}
      </div>
    );
  }
}

export default MenuCategories;
