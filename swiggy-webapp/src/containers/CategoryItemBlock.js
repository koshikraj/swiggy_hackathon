import React, { Component } from 'react';
// import {getMenuList} from "../api/getMenuList.js";
import CategoryItems from '../components/CategoryItems';

class CategoryItemBlock extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      popup: null
    };
  }

  RenderItems(category_items){
  	let _categoryitems = []
    for(let i in category_items){
        _categoryitems.push(
        	<div onClick={()=>{this.setState({popup:i})}}>
        	<CategoryItems active={i==this.state.popup} ItemData={category_items[i]}/>
        	</div>
        	)}
    return (<div>{_categoryitems}</div>)
  }

  render() {
    return (
      <div >
      <div style={{fontWeight: 'bold', fontSize: 20, paddingBottom: 2}}>{this.props.ItemsData.category_name}</div>
      <div style={{fontSize:12, color:'grey', textDecorationLine:"underline", paddingBottom: 12}} >{this.props.ItemsData.category_items.length}{' ITEM/S'}</div>
      <div>{this.RenderItems(this.props.ItemsData.category_items)}</div>
      </div>
    );
  }
}

export default CategoryItemBlock;
