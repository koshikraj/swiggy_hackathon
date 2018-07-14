import React, { Component } from 'react';
// import {getMenuList} from "../api/getMenuList.js";
import MenuCategories from "../components/MenuCategories.js"
import CategoryItemBlock from "./CategoryItemBlock.js"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import '../App.css';

class MenuBody extends Component {

  constructor(prop) {
    super(prop);
    this.state = {
      activeTab: 0
    };
    this.RenderCategories = this.RenderCategories.bind(this)
  }

  RenderCategories(MenuData){
    let _categoriesList = []
    for(let i in MenuData){
        _categoriesList.push(
        	<div onClick={()=>{this.setState({activeTab:i})}}>
        	<MenuCategories active={i==this.state.activeTab} CategoryData={MenuData[i]}/>
        	</div>
        	)}
    return (<div>{_categoriesList}</div>)
  }

  RenderCategoryDetails(ItemData){
  	return(<CategoryItemBlock ItemsData={ItemData} />)
  }

  render() {
    return (
      
      <div style={{marginTop:20,display: 'flex',flex_wrap: 'nowrap'}}>
        <div style={{marginLeft:100}}>{this.RenderCategories(this.props.MenuCategories)}</div>
        <div style={{paddingLeft:100}}>{this.RenderCategoryDetails(this.props.MenuCategories[this.state.activeTab])}</div>
      </div>
      
    );
  }
}

export default MenuBody;
