import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Photo from '../component/Photo';
import Icon from '@expo/vector-icons/Ionicons';

const PhotoStack = createStackNavigator({
    Photo: {
        screen: Photo,
        navigationOptions: ({navigation}) => {
            return {
                headerTitle: 'Picture',
                headerLeft: 
                (
                    <Icon style={{paddingLeft: 10}}
                        onPress={() => navigation.openDrawer()}
                        name="md-menu" size={30} />
                ),
                headerStyle: { backgroundColor: '#2b7ce5' }
            }
        }
    }
})

export default PhotoStack;