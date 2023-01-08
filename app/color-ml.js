import React, { Component } from 'react';
import './style.scss';

export default class ColorML extends Component {
	constructor(props) {
		super(props);

		this.state = {
			red: 0,
			green: 0,
			blue: 0,
			colorName: 'blue'
		}
	}

	handleColorSliderChange(e) {
		const slider = e.target;
		const color = slider.name;
		const value = slider.value

		this.setState({[color]: value});
	}

	render() {
		const { red, green, blue } = this.state;
		return (
			<div className='app-container'>
				<div className='wrapper'>
					<h1>ColorML</h1>

					<div className='output-wrapper'>
						<div className='color-output' style={{backgroundColor: `rgb(${red}, ${green}, ${blue})`}}>
							<h2>{this.state.colorName}</h2>
						</div>

						<div className='training-wrapper'>
							<button className='red'>Red</button>
							<button className='green'>Green</button>
							<button className='blue'>Blue</button>
						</div>
					</div>

					<div className='controls-wrapper'>
						<div className='input-wrapper'>
							<label htmlFor='red'>Red</label>
							<input type='range' onChange={this.handleColorSliderChange.bind(this)} name='red' min={0} max={255} value={this.state.red} />
						</div>

						<div className='input-wrapper'>
							<label htmlFor='green'>Green</label>
							<input type='range' onChange={this.handleColorSliderChange.bind(this)} name='green' min={0} max={255} value={this.state.green} />
						</div>

						<div className='input-wrapper'>
							<label htmlFor='blue'>Blue</label>
							<input type='range' onChange={this.handleColorSliderChange.bind(this)} name='blue' min={0} max={255} value={this.state.blue} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}