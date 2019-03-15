import React, { Fragment } from 'react';
import LoginBox from '../../components/LoginBox';
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";

import Background from '../../images/background-login.jpg'

const styles = theme => ({
	"@global": {
		body: {
			height: "100%",
			width: "100%",
			background: 'rgba(0, 0, 0, .6)',
			position: 'absolute',
		},
		html: {
			backgroundImage: `url(${Background})`,
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center center",
			backgroundSize: "cover",
			backgroundAttachment: "fixed",
			overflow: "hidden",
			height: "100%",
		},
	}
});

const Login = (props) => {
	return (
		<Fragment>
			<CssBaseline />
			<LoginBox {...props} />
		</Fragment>
	);
}
export default withStyles(styles)(Login);