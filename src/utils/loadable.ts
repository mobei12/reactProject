import React, { Component } from 'react'


const Loadable = require('react-loadable')
import NProgress from 'nprogress'

import 'nprogress/nprogress.css'


class loadingComponent extends Component {
	constructor(props: any) {
		super(props)
		NProgress.start()
	}

	componentWillMount() {
		NProgress.done()
	}

	render() {
		return '<div />'
	}
}

export default (loader: any, loading = loadingComponent) => {
	return Loadable({
		loader,
		loading
	})
};
