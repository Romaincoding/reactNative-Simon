import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './redux/reducer'
import Router from './router/router';

const store = createStore(reducer);

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<SafeAreaProvider>
					<Router />
				</SafeAreaProvider>
			</Provider>
		);
	}
}

