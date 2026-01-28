const capitalize = (str = '') => {
	if (typeof str !== 'string') {
		throw new Error("Can't capitalize non string");
	}
	// if (!str) {
	// 	throw new Error('Can\'t capitalize blank string');
	// }
	return str
		.trim()
		.split(' ')
		.map((item) => item[0]?.toUpperCase() + item.substring(1).toLowerCase())
		.join(' ');
};

export default capitalize;
