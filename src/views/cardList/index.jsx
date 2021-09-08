import React from "react";
/* prop 传参校验 */
import PropTypes from "prop-types";
import "./index.scss";

const photoList = [
	{ title: "随便写点有的没得", style: "one" },
	{ title: "随便写点有的没得", style: "two" },
	{ title: "随便写点有的没得", style: "three" },
	{ title: "随便写点有的没得", style: "four" },
	{ title: "随便写点有的没得", style: "five" },
	{ title: "随便写点有的没得", style: "six" },
	{ title: "todo react17直接onclick失效了,不知道为啥", style: "seven" }
];

class CardList extends React.Component {
	constructor(prop) {
		super(prop);
		this.state = {
			active: "one"
		};
	}

	/* PropTypes的验证 */
	static propTypes = {
		name: PropTypes.string.isRequired,
		age: PropTypes.number.isRequired
	};
	/* 默认属性 */
	static defaultProps = {
		name: "asd",
		age: 123
	};
	active = "one";
	selectStyle = value => {
		this.setState({
			active: value
		});
	};

	render() {
		return (
			<div className="photo-list">
				{photoList.map((photo, i) => (
					<div
						className={`photo ${this.state.active || "one"}`}
						onClick={() => this.selectStyle(photo.style)}
						key={i}
					>
						点击选择样式{photo.style}
					</div>
				))}
			</div>
		);
	}
}

export default CardList;
