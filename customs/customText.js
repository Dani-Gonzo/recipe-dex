import React from 'react';
import {Text, StyleSheet} from 'react-native';

export class CustomText extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const childProps = {
            ...this.props,
            style: [styles.defaultStyle, this.props.style],
        }
        return (
            <Text {...childProps}>
                {this.props.children}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    defaultStyle: {
        fontSize: 16,
        color: "lightgray"
    },
});