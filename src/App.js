import React, { Component } from 'react';
import './App.css';


var array = [ [1,[2,5],[3]], 4];

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
		<div className="arrayData">{getFlattenedArrayString(array)}</div>
	);
}




class App extends Component {
	
	constructor() {
		super();
		this.state = {
			showResult: false
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
		e.preventDefault();
		num=0;
		array = this.makeNestedArray(30);
		this.setState({showResult: false})
	}
	
	onClick(e) {
		e.preventDefault();
		this.setState({showResult: !this.state.showResult})
	}

	render() {
		return (
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
		);
	}
}

export default App;
