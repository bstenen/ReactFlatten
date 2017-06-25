import React, { Component } from 'react';
import './App.css';
import NumericInput from 'react-numeric-input';
import Button from 'react-bootstrap/lib/Button';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import { PageHeader } from 'react-bootstrap';
import { Popover } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';
import { Well } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

var array = [ [1, 2,[3]], 4];

var resultArray = [];

function randomInt(min,max)
{
	return Math.floor(Math.random() * (max - min + 1) + min);
}

var num = 0;
function getNextNumber()
{
	return ++num;
}


function clearResult()
{
	resultArray = [];
}
function flattenArray(arr)
{
	if (typeof(arr) === 'number')
		resultArray[resultArray.length] = arr;
	else
	{
		for (var i = 0; i < arr.length; ++i)
		{
			flattenArray(arr[i]);
		}
	}
	return resultArray;
}


function getFlattenedArrayString(intArray)
{
	clearResult();
	return getArrayString(flattenArray(intArray));
}


function getArrayString(intArray)
{
	if (typeof(intArray) === 'number')
		return intArray.toString();

	var result = "[";
	for (var i =0; i < intArray.length; ++i)
	{
		result += getArrayString(intArray[i]);
		if (i + 1 < intArray.length)
			result += ", ";
	}
	result += "]"
	return result;
	
}







function displayNestedArray() {
	return (
		<div>{getArrayString(array)}</div>
	);
}
function displayFlattenedArray()
{
	return (
		<div >{getFlattenedArrayString(array)}</div>
	);
}


const flattenPopover = (
	<Popover id="popover-trigger-hover-focus">
		<strong> Flatten the current array and show the result </strong>
	</Popover>
);
const generatePopover = (
	<Popover id="popover-trigger-hover-focus">
		<strong> Generate a new array with  &lt;Potential array depth&gt; nested arrays </strong>
	</Popover>
);

class App extends Component {
	
	constructor(props) {
		console.log(props);
		super();
		this.state = {
			showResult: false,
			depth: 10,
		}
	}
	
    makeNestedArray(maxDepth, currentDepth = 0)
	{
		var elements = randomInt(1,5);
		var result = [];
		for (var i = 0; i < elements; ++i)
		{
			if (currentDepth < maxDepth && randomInt(1,3) === 1)
			{
				result[i] = this.makeNestedArray(maxDepth, currentDepth+1);
			}
			else
			{
				result[i] = getNextNumber();
			}
		}
		return result;
	}
	
	
	makeNewArray(e) {
		num=0;
		array = this.makeNestedArray(this.state.depth);
		this.setState({showResult: false})
	}
	
	onFlattenClick(e) {
		this.setState({showResult: !this.state.showResult})
	}
	

	handleDepthChange(e) {
		this.setState({depth: e})
	}
	
	render() {
		return (
		<div>
		
			<Jumbotron>
				<h1>Flatten dimensional arrays</h1>
				<p> A simple ReactJS app to generate, display, and flatten multidimensional arrays.</p>
			</Jumbotron>
			
			<Row className="smallerRow">
			<Col xs={6} md={3}>
			
			<Panel bsStyle="primary" header="Potential array depth">
				<NumericInput 
					name="depthInput"
					onChange={this.handleDepthChange.bind(this)}
					className="form-control" 
					value={ this.state.depth } 
					min={ 1 } 
					max={ 30 } 
					step={ 1 } 
					precision={ 0 } 
					size={ 5 } 
					mobile
				/>
			</Panel>
			</Col>
			<Col xs={6} md={9}>
				<Well>
					<span className="nestedArrayContainer"> {displayNestedArray()} </span>
				<OverlayTrigger trigger={['hover','focus']} placement="top" overlay={generatePopover}>
					<Button className="buttonGenerate" onClick={this.makeNewArray.bind(this)} bsStyle="primary">Generate Array</Button>
				</OverlayTrigger>
				</Well>
			</Col>
			</Row>
			<Row className="smallerRow">
			<Col xs={12} md={12}>
				<OverlayTrigger trigger={['hover','focus']} placement="right" overlay={flattenPopover}>
					<Button className="buttonFlatten" onClick={this.onFlattenClick.bind(this)} bsStyle="primary">Flatten Array</Button>
				</OverlayTrigger>
				<Panel collapsible expanded={this.state.showResult}>
					{displayFlattenedArray()}
				</Panel>
			</Col>
			</Row>
		
		
		
		</div>
		
		/*
			<div> 
				<div className="header">
					<h1>Flatten multidimensional arrays</h1>
				</div>
				<div className="body">
					<div className="nestedArrayContainer">
						<h4>Current Array</h4>
						<div className="generateButtonContainer">
							<button className="generateButton" onClick={this.makeNewArray.bind(this)}><span>Generate new array</span></button>
						</div>
						<div className="arrayData">
							{displayNestedArray()}
						</div>
					</div>
					<div className="resultArrayContainer">
						<h4>Result Array</h4>
						<div className="generateButtonContainer">
						{!this.state.showResult && <button className="generateButton" onClick={this.onClick.bind(this)}> Flatten array </button>}
						</div>
						{this.state.showResult && displayFlattenedArray()}
					</div>
				</div>
			</div>
		*/
		);
	}
}

export default App;
