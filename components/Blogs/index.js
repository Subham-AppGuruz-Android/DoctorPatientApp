import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  eSafeAreaView,
  ScrollView,
  TextInput,
  Image,
  FlatList,Share
} from 'react-native';
import {
  Text,
  Icon,
  Header,
  Title,
  Container,
} from 'native-base';
import Feather from 'react-native-vector-icons/dist/Feather';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import Ionicons from "react-native-vector-icons/Ionicons";

import { colors, Styles } from '../../common/index';
import Fonts from '../../common/fonts';
import Loader from '../../containers/Loader';
import { postApiRequest } from '../../common/user';
const defaultBlog = require('../../assets/imgs/blog_default.jpg');

export default class Blogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Blogs: [],
      loader: true
    };
  }
  componentDidMount() {
    this.getBlogs();
  }

  getBlogs = () => {
    postApiRequest('index.php/Common_API/getBlogs', '')
      .then(response => {
        console.log('response of post api', response)
        this.setState({ Blogs: response, loader: false })
      })
      .catch(error => {
        console.log('error', error);
      })
  }
  goback = () => {
    this.props.navigation.pop();
  };
  openDrawer = () => {
    this.props.navigation.openDrawer();
  };
  onShare = async (item) => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      console.log('result ',result)
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  renderBlogs = (item) => {
    let { post_title, post_content, is_liked } = item.item
    return (
      <TouchableOpacity style={styles.row_container} onPress={() => this.props.navigation.navigate('BlogDetails', { blog_detail: item.item })}>
        <View style={styles.image_view}>
          <Image style={styles.image} source={defaultBlog} />
        </View>
        <View style={styles.text_container}>
          <Text style={styles.heading_text}>
            {post_title}
          </Text>
          <Text style={styles.description_text} numberOfLines={6}>
            {post_content}
          </Text>
          <View style={{ marginTop: 5, flexDirection: 'row' }}>
            <TouchableOpacity style={{ paddingVertical: 5 }}>
              <Feather name="thumbs-up" style={styles.like_icon} />
            </TouchableOpacity>
            <TouchableOpacity style={{ paddingVertical: 5, marginLeft: '10%' }} onPress={() => this.onShare(item.item)}>
              <Entypo name="share" style={styles.share_icon} />
            </TouchableOpacity>
          </View>




        </View>
      </TouchableOpacity >
    )
  }
  render() {
    const { loader, Blogs } = this.state;
    return (
      <Container>

        <Header style={[Styles.CommonStyles.header_container]}>
          <TouchableOpacity
            style={{ marginLeft: 5 }}
            onPress={() => this.openDrawer()}
          >
            <Ionicons
              name="ios-menu"
              color="white"
              style={[{ fontSize: Platform.OS === "ios" ? 35 : 30 }]}
            />
          </TouchableOpacity>

          <Title style={{ fontFamily: Fonts.SemiBold }}>Health Articles</Title>
          <View />
        </Header>




        {loader ? (
          <Loader />
        ) : (
            <View style={{ flex: 1, paddingTop: 10 }}>
              {
                Blogs.length != 0
                  ?
                  <FlatList
                    data={Blogs}
                    renderItem={item => this.renderBlogs(item)}
                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}
                  />
                  :
                  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text
                      style={{ fontSize: 20, fontFamily: Fonts.Bold, color: colors.LIGHT_GREY }}
                    >
                      No Articles Found!
                    </Text>
                  </View>
              }


            </View>
          )
        }

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    marginTop: 15,
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

  row_container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  image_view: {
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
  },
  text_container: {
    flex: 2,
  },
  heading_text: {
    fontSize: 15,
    fontFamily: Fonts.Bold
  },
  description_text: {
    fontSize: 10,
    fontFamily: Fonts.Regular, marginTop: 5,
    textAlign: 'justify'
  },
  like_icon: {
    fontSize: Platform.OS === 'ios' ? 25 : 20,
    color: colors.GREEN,
  },
  share_icon: {
    fontSize: Platform.OS === 'ios' ? 25 : 20,
    color: colors.gray,
  },
  icon_text: { marginTop: 10 },
});
