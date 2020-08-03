import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  eSafeAreaView,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import {
  Button,
  Text,
  Icon,
  Header,
  Left,
  Body,
  Title,
  Content,
  Container,
  Right,
} from 'native-base';

import {colors} from '../../common/index';

export default class Help extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goback = () => {
    this.props.navigation.pop();
  };

  render() {
    const {name, email, number, loader} = this.state;
    return (
      <Container>
        <Header style={[styles.header_container]}>
          <View
            style={[
              styles.inner_header,
              {marginTop: Platform.OS === 'ios' ? 0 : 10},
            ]}>
            <Button transparent style={[styles.header_btn, {}]}>
              <TouchableOpacity onPress={() => this.goback()}>
                <Icon
                  ios="ios-arrow-back"
                  android="ios-arrow-back"
                  style={[{fontSize: Platform.OS === 'ios' ? 35 : 30}]}
                />
              </TouchableOpacity>
            </Button>
          </View>
          <Body>
            <Title>Help Center</Title>
          </Body>
        </Header>

        <Content>
          <View style={styles.text_container}>
            <Text style={{fontWeight: 'bold'}}>Chat with Doctor</Text>
          </View>
          <View style={styles.text_container}>
            <Text style={{fontWeight: 'bold'}}>Chat with Wishhealth Team</Text>
          </View>
          <View style={styles.text_container}>
            <Text style={{fontWeight: 'bold'}}>FAQ'S</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  header_container: {
    height: 50,
    alignItems: 'center',
    backgroundColor: colors.THEME_BLUE,
  },
  inner_header: {
    height: 80,
    width: 120,
    flexDirection: 'row',
    justifyContent: 'center',

    alignItems: 'center',
  },
  header_btn: {
    textAlign: 'left',
    position: 'absolute',
    top: '20%',
    left: 0,
  },
  text_container: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#f8f8f8',
  },
});
