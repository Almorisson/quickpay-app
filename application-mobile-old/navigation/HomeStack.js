import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Home from '../component/Home';
import Amount from '../component/transaction/Amount';
import Payment from '../component/transaction/Payment';
import Charge from '../component/transaction/Charge';
import Scanner from '../component/transaction/Scanner';
import Icon from '@expo/vector-icons/Ionicons';

const HomeStack = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({navigation}) => {
            return {
                headerTitle: 'Home',
                headerLeft: 
                (
                    <Icon style={{paddingLeft: 10}}
                        onPress={() => navigation.openDrawer()}
                        name="md-menu" size={30} />
                ),
                headerStyle: { backgroundColor: '#2b7ce5' }
            }
        }
    },
    Scanner: { screen: Scanner,
        navigationOptions: {headerTitle: 'Scan a QR Code'}
    },
    Amount: { screen: Amount,
        navigationOptions: {headerTitle: 'Create an amount to pay'}
    },
    Payment: { screen: Payment,
        navigationOptions: {headerTitle: 'Payment'}
    },
    Charge: { screen : Charge,
        navigationOptions: {headerTitle: 'Create a charge'}
    }
})

export default HomeStack;