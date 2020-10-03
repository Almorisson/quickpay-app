import React from 'react';
import { Button, View, Text, TextInput, AsyncStorage, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux';

class UpdateProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            picture: null,
            id: '',
            token: '',

            firstName: '',
            lastName: '',
            email: '',
            nameSociety: '',
            phoneNumber: '',
            address: '',
            postalCode: '',
            city: '',
            siretNumber: '',
            iban: '',

            load: true,
            pushNotifications: true,
        };
    }

    componentDidMount() {
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                stores.map((result, i, store) => {
                    this.setState({ load: true })
                    // get at each store's key/value so you can work with it
                    let key = store[i][0];
                    let value = store[i][1];
                    console.log("UPDATE PROFILE => ", key + " , " + value);
                    if (key == 'id') {
                        this.setState({
                            id: value
                        })
                    } else if (key == 'token') {
                        this.setState({
                            token: value
                        })
                    } else if (key == 'email') {
                        this.setState({
                            email: value
                        })
                    } else if (key == 'address') {
                        this.setState({
                            address: value
                        })
                    } else if (key == 'city') {
                        this.setState({
                            city: value
                        })
                    } else if (key == 'firstname') {
                        this.setState({
                            firstName: value
                        })
                    } else if (key == 'lastname') {
                        this.setState({
                            lastName: value
                        })
                    } else if (key == 'nameSociety') {
                        this.setState({
                            nameSociety: value
                        })
                    } else if (key == 'phoneNumber') {
                        this.setState({
                            phoneNumber: value
                        })
                    } else if (key == 'postalCode') {
                        this.setState({
                            postalCode: value
                        })
                    } else if (key == 'country') {
                        this.setState({
                            country: value
                        })
                    } else if (key == 'siretNumber') {
                        this.setState({
                            siretNumber: value
                        })
                    } else if (key == 'codeCountry') {
                        this.setState({
                            codeCountry: value
                        })
                    } else if (key == 'iban') {
                        this.setState({
                            iban: value
                        })
                    }
                    this.setState({ load: false });
                });
            });
        });
    }

    updateProfile() {
        let data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            nameSociety: this.state.nameSociety,
            phoneNumber: this.state.phoneNumber,
            address: this.state.address,
            postalCode: this.state.postalCode,
            city: this.state.city,
            country: this.state.country,
            siretNumber: this.state.siretNumber,
            iban: this.state.iban
        }

        let token = this.state.token;
        const AuthToken = 'Bearer '.concat(token);

        axios.put('http://10.0.2.2:3000/api/v1/traders/' + this.state.id, data, {
            headers:
            {
                'Content-Type': 'application/json',
                Authorization: AuthToken
            }
        })
            .then(response => {
                let obj = response.data
                console.log("aaah" + JSON.stringify(obj));
                /*
                this.setState({ email: obj.email })
                this.setState({ firstName: obj.firstName })
                this.setState({ lastName: obj.lastName })
                console.log(obj.lastName)
                this.setState({ load: false })
                */
                const action = {
                    type: "UPDATE_PROFILE",
                    value: {
                        email: obj.trader.email,
                        firstName: obj.trader.firstName,
                        lastName: obj.trader.lastName,
                        address: obj.trader.address,
                        city: obj.trader.city,
                        nameSociety: obj.trader.nameSociety,
                        phoneNumber: obj.trader.phoneNumber,
                        postalCode: obj.trader.postalCode,
                        country: obj.trader.country,
                        codeCountry: obj.trader.codeCountry,
                        siretNumber: obj.trader.siretNumber,
                        iban: obj.trader.iban
                    }
                }
                this.props.updateProfile(action)
                this.props.navigation.navigate('Profile');
            }).catch(error => {
                Toast.show("Problem from profil's request", { position: Toast.positions.CENTER });
                console.log(error);
            })
    }

    render() {
        return (
            <>
                {this.state.load === false ?
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>Firstname</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(firstName) => this.setState({ firstName })}
                                value={this.state.firstName}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>Lastname</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(lastName) => this.setState({ lastName })}
                                value={this.state.lastName}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>Email</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(email) => this.setState({ email })}
                                value={this.state.email}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>Name of society</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(nameSociety) => this.setState({ nameSociety })}
                                value={this.state.nameSociety}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>Phone number</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(phoneNumber) => this.setState({ phoneNumber })}
                                value={this.state.phoneNumber}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>Address</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(address) => this.setState({ address })}
                                value={this.state.address}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>Postal Code</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(postalCode) => this.setState({ postalCode })}
                                value={this.state.postalCode}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>City</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(city) => this.setState({ city })}
                                value={this.state.city}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>Siret number</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(siretNumber) => this.setState({ siretNumber })}
                                value={this.state.siretNumber}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>Iban</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(iban) => this.setState({ iban })}
                                value={this.state.iban}
                            />
                        </View>

                        <TouchableOpacity onPress={() => this.updateProfile()}>
                            <Text style={styles.registerbutton}>Update your profile</Text>
                        </TouchableOpacity>
                    </View> :
                    <ActivityIndicator style={{ position: 'absolute', top: 200, left: 200 }} size="large" color="#0000ff" />
                }
            </>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("Update mapState :" + JSON.stringify(state))

    return {
        email: state.email,
        firstName: state.firstName,
        lastName: state.lastName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateProfile: (data) => {
            dispatch({ type: "UPDATE_TRADER_PROFILE", data: data })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);

const styles = StyleSheet.create({
    registerbutton: {
        textDecorationLine: 'underline',
        marginTop: 10,
        fontSize: 15,
        color: '#2b7ce5',
        marginLeft: 0,
    },
    input: {
        padding: 10,
        width: 300,
        height: 40,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 10
    },
})