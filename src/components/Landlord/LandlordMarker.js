import React from 'react'
import PropTypes from 'prop-types'

const camelize = function(str) {
  return str.split(' ').map(function(word){
    return word.charAt(0).toUpperCase() + word.slice(1)
  }).join('')
}

const evtNames = [
  'click',
  'dblclick',
  'dragend',
  'mousedown',
  'mouseout',
  'mouseover',
  'mouseup',
  'recenter',
]

export class Marker extends React.Component {

	componentDidMount() {
	  this.renderMarker();
	}

	componentDidUpdate(prevProps) {
		if( (this.props.map !== prevProps.map) || (this.props.position !== prevProps.position) ) {
			this.renderMarker()
		}
	}

	renderMarker() {
		let {
			map, google, position, mapCenter
		} = this.props;

		if(!google) return null

		let pos = position || mapCenter
		position = new google.maps.LatLng(pos.lat, pos.lng)

		const pref = {
			map: map,
			position: position,
		}
		this.marker = new google.maps.Marker(pref)

		evtNames.forEach(e => {
		  this.marker.addListener(e, this.handleEvent(e))
		})
	}

	handleEvent(evtName) {
    return (e) => {
      const evtName = `on${camelize(evtName)}`
      if (this.props[evtName]) {
        this.props[evtName](this.props, this.marker, e);
      }
    }
  }

	render() {
		return null
	}

}

Marker.propTypes = {
	position: PropTypes.object,
	map: PropTypes.object,
}

evtNames.forEach( e => Marker.propTypes[e] = PropTypes.func)

Marker.defaultProps = {
	name: 'Marker',
}

export default Marker