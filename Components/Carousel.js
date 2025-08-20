import * as React from "react";
import { Text, View, SafeAreaView, Image, Dimensions } from "react-native";

import Carousel from "react-native-snap-carousel";
import Metrics from "../Helpers/Metrics";
import Images from "../constant/images/Images";
import FastImage from "react-native-fast-image";

export default class CarouselComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: [
        {
          title: "Item 1",
          text: "Text 1",
          img: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907465/bg-355e511c_g2mtbd.png",
        },
        {
          title: "Item 2",
          text: "Text 2",
          img: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907471/banner-2_onk0tn.png",
        },
        {
          title: "Item 3",
          text: "Text 3",
          img: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907462/banner-3_axquvw.png",
        },
      ],
    };
  }

  _renderItem({ item, index }) {
    return (
      <View
        style={{
          borderRadius: 10,
          height: 180,
          width: "95%",
          overflow: "hidden",
          alignSelf: "center",
        }}
      >
        <FastImage
          style={{ width: "100%", height: "100%", borderRadius: 10 }}
          resizeMode="cover"
          source={{ uri: item.img, priority: FastImage.priority.low, }}
        />
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "transparent", paddingTop: 10 }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            borderRadius: 8,
            overflow: "hidden",
          }}
        >
          <Carousel
            loop
            autoplay
            layout={"default"}
            enableSnap={false}
            ref={(ref) => (this.carousel = ref)}
            data={this.state.carouselItems}
            sliderWidth={Dimensions.get("screen").width}
            itemWidth={Dimensions.get("screen").width}
            renderItem={this._renderItem}
            onSnapToItem={(index) => this.setState({ activeIndex: index })}
          />
        </View>
      </SafeAreaView>
    );
  }
}
