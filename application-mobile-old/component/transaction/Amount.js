import React from 'react';
import { View, Text, TextInput, StyleSheet, AsyncStorage, TouchableOpacity } from 'react-native';

class Amount extends React.Component {
    
    constructor(props)
    {
        super(props);
        this.state = {
            id: '',
            amount: '',
        }
        this.init_id();
    }

    init_id() {
        AsyncStorage.getItem('id', (err, getId) => {
            this.setState(
                { id : getId }
            )
        });
    }

    onChangeAmount = (amount) => {
        this.setState({amount})
    }

    createAmountToPay() {
        let data = {
            id: this.state.id,
            amount: this.state.amount
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems:'center', justifyContent:'center' }}>
                <TextInput value={this.state.amount}
                    style={styles.textinput}
                    placeholder="Amount"
                    onChangeText={this.onChangeAmount} />

                <TouchableOpacity onPress={() => this.createAmountToPay()}>
                    <Text>Create amount to pay</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Amount;

const styles = StyleSheet.create({
    textinput: {
        textAlign: 'center',
        alignSelf: 'stretch',
        height: 40,
        fontSize: 20,
        marginTop: 40,
        marginLeft: 65,
        marginRight: 72,
        marginBottom: 20,
        color: '#000',
        borderRadius: 15,
        borderTopColor: '#2b7ce5',
        borderRightColor: '#2b7ce5',
        borderLeftColor: '#2b7ce5',
        borderBottomColor: '#2b7ce5',
        borderTopWidth: 1,
        borderRightWidth:1,
        borderLeftWidth:1,
        borderBottomWidth: 1,
    },
});