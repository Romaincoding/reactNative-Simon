import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../components/Home';
import Config from '../components/Config';
import About from '../components/About';
import Game from '../components/Game';
import Score from '../components/Score';


const Tab = createBottomTabNavigator();

export default class Router extends React.Component {
	render() {
		return (
			<NavigationContainer>
				<Tab.Navigator>
					<Tab.Screen name="Home" component={Home} />
					<Tab.Screen name="Config" component={Config} />
					<Tab.Screen name="About" component={About} />
					<Tab.Screen name="Game" component={Game} />
					<Tab.Screen name="Score" component={Score} />
				</Tab.Navigator>
			</NavigationContainer>
		);
	}
}