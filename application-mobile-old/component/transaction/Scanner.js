import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarCodeScanner, Permissions, WebBrowser } from 'expo'

function delay(time) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => resolve(), time);
    });
  }

export default class Scanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasCameraPermission: null, value: ''}
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    async handleBarCodeScanned(data) {
        await WebBrowser.openBrowserAsync(data.data);
    }

    onBarCodeRead = async obj => {
        await delay(500);
        if (this.state.value == obj.data) return;
        this.setState({ value: obj.data });
        alert(obj.data);
    };

    render () {
        if (this.state.hasCameraPermission === null) {
            return <Text>Nothing happened</Text>
        } else if (this.state.hasCameraPermission === false) {
            return <Text>No access to camera</Text>
        }
        return (
            <View style={styles.component}>
                <View style={styles.layouts}>
                    <View style={styles.layout1}>
                        <View style={styles.itemcontainer1}>
                            <View style={styles.itemcontainer1Inner}>
                                <Text>Scan a QR Code to pay !</Text>
                                <BarCodeScanner 
                                    style={styles.item1}
                                    onBarCodeRead={this.onBarCodeRead}
                                />
                            </View>
                        </View>
                    </View>
                </View>            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    component: {
        width: '100%',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        paddingLeft: 7.5,
        paddingRight: 7.5,
        paddingTop: 7.5,
        paddingBottom: 7.5,
    },

    layouts: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    layout1: {
        width: '100%',
        height: 604.5,
    },

    itemcontainer1: {
        width: '100%',
        height: '100%',
        paddingTop: 7.5,
        paddingBottom: 7.5,
        paddingLeft: 7.5,
        paddingRight: 7.5,
    },

    itemcontainer1Inner: {
        width: '100%',
        height: '100%',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },

    item1: {
        width: '60%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'rgba(33, 150, 243, 1)',
        borderRadius: 0,
    }
})