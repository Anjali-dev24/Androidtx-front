import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import React, {useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Sheet from './Sheet';
import Timer from './Timer';
import PageWrapperView from './PageWrapperView';
import {Fonts, FONT_SIZE, gameData} from '../constant/data';
import Metrics from '../Helpers/Metrics';
import {Colors} from '../Helpers/Colors';
import K3Winningtable from './K3Winningtable';
import Sound from 'react-native-sound';
import KChart from './KChart';
import MyHistory from './MyHistory';
import coundown from '../Assets/mp3/coundown.mp3';
import {styles} from '../Screens/home/K3/styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TextWithIcon from './TextWithIcon';
import DigitsRow from './DigitsRow';
import FastImage from 'react-native-fast-image';

Sound.setCategory('Playback');

const K3 = ({navigation}) => {
  const [gameTimeOption, setGameTimeOption] = useState(1);
  const [selectedButton, setSelectedButton] = useState('gameHistory');
  const [diceValue, setDiceValue] = useState([1, 1, 1]);
  const [selectedColor, setSelectedColor] = useState('');
  const [ClockVisible, setClockVisible] = useState(false);
  const [Name, setName] = useState('');
  const [option, setOption] = useState('Total');
  const bottomSheetRef = useRef();
  const gameTime = [1, 3, 5, 10];
  const [timeLeft, setTimeLeft] = useState(null);
  const digitsOptions = {
    '2 same': ['11', '22', '33', '44', '55', '66'],
    '3 same': ['111', '222', '333', '444', '555', '666'],
    Different: ['1', '2', '3', '4', '5', '6'],
  };
  const getDiceImage = value => {
    switch (value) {
      case 1:
        return require('../Assets/dies/rotate_dies/1.png');
      case 2:
        return require('../Assets/dies/rotate_dies/2.png');
      case 3:
        return require('../Assets/dies/rotate_dies/3.png');
      case 4:
        return require('../Assets/dies/rotate_dies/4.png');
      case 5:
        return require('../Assets/dies/rotate_dies/5.png');
      case 6:
        return require('../Assets/dies/rotate_dies/6.png');
      default:
        return require('../Assets/dies/rotate_dies/1.png');
    }
  };
  const shakeDice = () => {
    // Start changing dice numbers randomly for 3 seconds
    const intervalId = setInterval(() => {
      setDiceValue([
        Math.floor(Math.random() * 6) + 1, // Random number between 1-6
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ]);
    }, 100);
    setTimeout(() => {
      clearInterval(intervalId);
    }, 2000); // Change for 3 seconds
  };
  const handleFiveSecondsLeft = timeLeft => {
    console.log(`5 seconds remaining: ${timeLeft}`);
    setTimeLeft(timeLeft); // Set state to indicate 5 seconds left
  };
  const getDiesImage = (ModalWithItem, index) => {
    switch (ModalWithItem) {
      case 3.1:
        return require('../Assets/dies/Sqaure_dies/6.png');
      case 3.2:
        return require('../Assets/dies/Sqaure_dies/starDies.png');
      case 4.1:
        return index === 0
          ? require('../Assets/dies/Sqaure_dies/1.png')
          : index === 1
          ? require('../Assets/dies/Sqaure_dies/2.png')
          : require('../Assets/dies/Sqaure_dies/4.png');
      case 4.2:
        return index === 0
          ? require('../Assets/dies/Sqaure_dies/1.png')
          : index === 1
          ? require('../Assets/dies/Sqaure_dies/2.png')
          : require('../Assets/dies/Sqaure_dies/3.png');
      case 4.3:
        return index === 0
          ? require('../Assets/dies/Sqaure_dies/1.png')
          : require('../Assets/dies/Sqaure_dies/2.png');
      case 2.2:
        return index === 1
          ? require('../Assets/dies/Sqaure_dies/5.png')
          : require('../Assets/dies/Sqaure_dies/1.png');
      default:
        return require('../Assets/dies/Sqaure_dies/5.png');
    }
  };
  const [currentModalContent, setCurrentModalContent] = useState('');
  const renderTimeBoxes = () => {
    if (!timeLeft) return null;

    const [minutes, seconds] = timeLeft.split(':');

    // Check if both minutes and seconds are zero
    if (minutes === '0' && seconds === '0') {
      // Call shakeDice function when timeLeft is 0:0
      shakeDice();
      return null; // Optionally return null or an empty view after the function call
    }

    return (
      <View style={styles.squareContainer}>
        <View style={styles.squareBox}>
          <Text style={styles.timeText}>{minutes}</Text>
        </View>
        <View style={styles.squareBox}>
          <Text style={styles.timeText}>{seconds}</Text>
        </View>
      </View>
    );
  };
  const [fiveSecondsLeft, setFiveSecondsLeft] = useState(false);
  // const [timeLeft, setTimeLeft] = useState(minutes * 60 + seconds);
  const gameType = ['Total', '2 same', '3 same', 'Different'];
  const [modalVisible, setModalVisible] = useState(false);
  const [ModalWithItem, setModalWithItem] = useState();
  console.log('ModalWithItem', ModalWithItem);

  const handleIconPress = item => {
    setModalWithItem(item);
    setCurrentModalContent(
      modalContentMapping[item] || modalContentMapping['default'],
    );
    setModalVisible(true);
  };
  const modalContentMapping = {
    2.1: 'Choose 2 same numbers. If the draw results match your selection, you win (unless 3 numbers are the same).',
    2.2: 'Choose 2 same numbers and 1 different number. If the draw results match your selection, you win.',
    3.1: 'Choose 3 same numbers. If the draw results match your selection, you win.',
    3.2: 'Choose any 3 same numbers. If the draw results are any three of the same numbers, you win.',
    4.1: 'Choose 3 or more different numbers. If the draw results match your selection, you win.',
    4.2: 'Choose any 3 consecutive numbers. If the draw results are any three consecutive numbers, you win.',
    default:
      'Choose 2 or more different numbers. If the draw results are different numbers and match with your selected numbers, you win.',
  };
  const handleNumber = item => {
    // console.log(item.number);
    setName(item.number);
    setSelectedColor(item.color);
    bottomSheetRef.current.open();
  };
  function handleText(params) {
    setName(params);
    bottomSheetRef.current.open();
  }
  const handlePress = button => {
    setSelectedButton(button);
  };
  const GameDataItem = ({item, ClockVisible, handleNumber}) => (
    <TouchableWithoutFeedback
      disabled={ClockVisible}
      onPress={() => handleNumber(item)}>
      <View style={styles.gameDataItem}>
        <FastImage
          source={[item.source,{priority: FastImage.priority.low,}]}
          resizeMode="cover"
          style={styles.gameDataImage}
        />
        <Text style={styles.GameText}>{item.value}</Text>
      </View>
    </TouchableWithoutFeedback>
  );

  const preSaleRules = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        // visible={true}
        visible={rulesModal}
        onRequestClose={() => {
          // Prevent the modal from closing when pressing back button
        }}
      >
        <View style={[styles.rulesModalContainer]}>
          <View style={[styles.rulesModalView]}>
            <Text style={styles.rulesTitle}>Pre-Sale rules</Text>
            <ScrollView style={{height:Dimensions.get('screen').height/2}}>
            <Text style={styles.preSalesRule}>
              "In order to protect the legitimate rights and interests of users
              participating in the pre-sale and maintain the normal operating
              order of the pre-sale, these rules are formulated in accordance
              with relevant agreements and laws and regulations. country Chapter
              1 Definition1.{"\n"}1 Pre-sale definition: refers to a sales model
              in which a seller offers a bundle of a product or service,
              collects consumer orders through product tools before selling, and
              makes it available to customers. consumers of goods and/or
              services by prior agreement1.{"\n"}2 Presale mode is "deposit"
              mode. "Consignment" refers to the pre-delivery of a fixed number
              of items prior to sale. "Deposit" Scam Join mini games for a
              chance to win more deposits. Deposits can be exchanged directly
              for goods. Deposit is not refundable.1.{"\n"}3 Pre-sale product: A
              product that is shipped by the seller using the pre-sale product
              tool. Only highlight the word presale on the product name or
              product detail page, and products that do not use the presale
              product tool are not presale. 1.{"\n"}4 Pre-sale system: refers to
              the system product tool that helps sellers to sell samples before
              selling.1.{"\n"}5 Product price before selling: is the selling
              price of the product before selling. The price of pre-sale items
              consists of two parts: deposit and final payment. "
            </Text>
            </ScrollView>
            <Button
              forwordIcon={false}
              buttonStyle={styles.rulesButtonStyle}
              full={false}
              buttonTitleStyle={styles.rulesButtonText}
              buttonTitle="I Know"
              onButtonPress={() => {
                setRulesModal(false);
              }}
            />
            {/* </View> */}
          </View>
        </View>
      </Modal>
    );
  };

  const renderBetModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        // visible={true}
        visible={betModal}
        onRequestClose={() => {
          // Prevent the modal from closing when pressing back button
        }}
      >
        <View style={[styles.imageView, { minWidth: "100%" }]}>
          <View
            style={{
              marginTop: "auto",
            }}
          >
            <View
              style={[
                styles.modalVisible,
                { width: Dimensions.get("screen").width },
              ]}
            >
              {selectedNumber == 0 || selectedNumber == 5 ? (
                <LinearGradient
                  useAngle={true}
                  angle={170}
                  angleCenter={{ x: 0.5, y: 0.5 }}
                  locations={[0.5, 0.5]}
                  start={{ x: 0.25, y: 0.0 }}
                  end={{ x: 1.0, y: 0.5 }}
                  colors={colorArr}
                  style={[styles.titleCont]}
                >
                  <Text style={styles.infoTitle}>Win Go 5Min</Text>
                  <View style={styles.greenButton}>
                    <Text style={styles.greenText}>Select {title}</Text>
                  </View>
                </LinearGradient>
              ) : (
                <View
                  style={[
                    styles.titleCont,
                    {
                      backgroundColor:
                        selectedColor == "Green"
                          ? "#18BB60"
                          : selectedColor == "Violet"
                          ? "#C86EFF"
                          : selectedColor == "yellow"
                          ? "#FEAA57"
                          : selectedColor == "blue"
                          ? "#6EA8F4"
                          : "#962f2a",
                    },
                  ]}
                >
                  <Text style={styles.infoTitle}>Win Go 5Min</Text>
                  <View style={styles.greenButton}>
                    <Text style={styles.greenText}>Select {title}</Text>
                  </View>
                </View>
              )}
              <View style={styles.balanceContainer}>
                <Text style={styles.balanceText}>Balance</Text>
                <View style={styles.betContainer}>
                  {balanceString.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        setBetSizeIndex(index);
                      }}
                      style={[
                        styles.sizeBetText,
                        {
                          backgroundColor:
                            betSizeIndex == index ? "#18BB60" : "#F7F8FF",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.sizeText,
                          {
                            color: betSizeIndex == index ? "#fff" : Colors.grey,
                          },
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={styles.balanceContainer}>
                <Text style={styles.balanceText}>Quantity</Text>
                <View style={styles.betContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      quantity > 1 && setQuantity(quantity - 1);
                    }}
                    style={styles.decreaseButton}
                  >
                    <Text style={styles.minus}>--</Text>
                  </TouchableOpacity>
                  <View style={styles.quantity}>
                    <Text style={styles.quantityNum}>{quantity}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setQuantity(quantity + 1);
                    }}
                    style={styles.decreaseButton}
                  >
                    <Text style={styles.minus}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={[styles.betContainer, { justifyContent: "flex-end" }]}
              >
                {betSize.map((item, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      setBetSizeIndex(index);
                    }}
                    style={[
                      styles.sizeBetText,
                      {
                        backgroundColor:
                          betSizeIndex == index ? "#18BB60" : "#F7F8FF",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.sizeText,
                        {
                          color: betSizeIndex == index ? "#fff" : Colors.grey,
                        },
                      ]}
                    >
                      X{item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => {
                    setIsShowAgain(!isShowAgain);
                  }}
                  style={styles.tickBorder}
                >
                  {isShowAgain ? (
                    <FastImage
                      style={styles.rememberIcon}
                      source={{
                        uri: "https://res.cloudinary.com/dwtdpelrp/image/upload/v1735907849/tick_ctsqt5.png",
                        priority: FastImage.priority.low,
                      }}
                    />
                  ) : null}
                </TouchableOpacity>
                <Text style={styles.agreeText}>I agree </Text>
                <TouchableOpacity
                  onPress={() => {
                    setRulesModal(true);
                  }}
                >
                  <Text
                    style={styles.preSaleText}
                  >{`  <<Pre-sale rules>>`}</Text>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.buttonView,
                  { width: "100%", marginTop: Metrics.rfv(10) },
                ]}
              >
                <Button
                  forwordIcon={false}
                  buttonStyle={styles.cancelbuttonStyle}
                  full={false}
                  buttonTitleStyle={styles.cancelButtonText}
                  buttonTitle="Cancel"
                  onButtonPress={() => {
                    setBetModal(false);
                  }}
                />
                <Button
                  forwordIcon={false}
                  buttonStyle={[
                    styles.nextbuttonStyle,
                    selectedNumber == 0
                      ? { backgroundColor: "#962f2a" }
                      : selectedNumber == 5
                      ? { backgroundColor: "#18BB60" }
                      : {
                          backgroundColor:
                            selectedColor == "Green"
                              ? "#18BB60"
                              : selectedColor == "Violet"
                              ? "#C86EFF"
                              : selectedColor == "yellow"
                              ? "#FEAA57"
                              : selectedColor == "blue"
                              ? "#6EA8F4"
                              : "#962f2a",
                        },
                  ]}
                  full={false}
                  buttonTitleStyle={styles.nextButtonText}
                  buttonTitle="Total amount"
                  onButtonPress={() => {
                    setBetModal(false);
                    setIsToast(true),
                      setTimeout(() => {
                        setIsToast(false);
                      }, 3000);
                    // setInfoModal(false);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const SizeOptionButton = ({
    label,
    color,
    ClockVisible,
    setName,
    setSelectedColor,
    bottomSheetRef,
  }) => (
    <TouchableOpacity
      disabled={ClockVisible}
      onPress={() => {
        setName(`${label} 2X`);
        setSelectedColor(color);
        bottomSheetRef.current.open();
      }}
      style={[styles.sizeOption, {backgroundColor: color}]}>
      <Text style={styles.sizeOptionText}>{label}</Text>
      <Text style={styles.sizeOptionText}>2X</Text>
    </TouchableOpacity>
  );
  const call_sound = new Sound(coundown, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    console.log(
      'duration in seconds: ' +
        whoosh.getDuration() +
        'number of channels: ' +
        whoosh.getNumberOfChannels(),
    );
  });
  const HistoryButton = ({selectedButton, buttonType, handlePress, label}) => {
    const isSelected = selectedButton === buttonType;
    return isSelected ? (
      <LinearGradient
        colors={['#ad2928', '#cd413b', '#e8554b']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.historyButton}>
        <TouchableOpacity onPress={() => handlePress(buttonType)}>
          <Text style={styles.historyButtonText}>{label}</Text>
        </TouchableOpacity>
      </LinearGradient>
    ) : (
      <TouchableOpacity
        style={[styles.historyButton, styles.whiteBackground]}
        onPress={() => handlePress(buttonType)}>
        <Text style={styles.historyButtonTextBlack}>{label}</Text>
      </TouchableOpacity>
    );
  };
  call_sound.setVolume(1);

  const playsong = () => {
    call_sound.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };

  const handleBackdropPress = () => {
    console.log('inisddee');
    setModalVisible(!modalVisible);
  };
  return (
    <PageWrapperView
      topSafeArea
      dark={true}
      style={styles.pageWrapper}
      statusBar={{background: '#a32324'}}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={{marginTop: Metrics.rfv(12)}}>
              <MaterialIcons
                name="arrow-back-ios"
                color={'#fff'}
                size={Metrics.rfv(28)}
                onPress={() => navigation.goBack()}
              />
            </View>
            <View style={styles.headerLeft}>
              <Text style={styles.headerText}>9T</Text>
              <View style={styles.headerIcon}>
                <Text style={styles.headerIconText}>X</Text>
              </View>
            </View>
            <View></View>
          </View>
          <View style={styles.walletContainer}>
            <View style={styles.walletView}>
              <FontAwesome5 name="wallet" color={'#a32324'} size={30} />
              <Text style={styles.currentBalance}>Current Balance:</Text>
            </View>
          </View>
        </View>

        <View style={styles.gameTimeOptions}>
          {gameTime.map(item => (
            <TouchableOpacity
              key={item}
              style={styles.gameTimeOption}
              onPress={() => setGameTimeOption(item)}>
              <LinearGradient
                colors={
                  item !== gameTimeOption
                    ? ['#fff', '#fff', '#fff']
                    : ['#ad2928', '#cd413b', '#e8554b']
                }
                style={styles.gameTimeGradient}>
                {item !== gameTimeOption ? (
                  <FastImage
                    source={[require('../Assets/disable_timer.png'),{priority: FastImage.priority.low,}]}
                    style={{height: Metrics.rfv(40), width: Metrics.rfv(30)}}
                  />
                ) : (
                  <FastImage
                    source={require('../Assets/timer.png')}
                    style={{height: Metrics.rfv(40), width: Metrics.rfv(30)}}
                  />
                )}

                <Text
                  style={[
                    styles.gameTimeText,
                    {
                      color: item === gameTimeOption ? '#fff' : 'grey',
                      fontFamily: Fonts.Roboto300,
                    },
                  ]}>
                  K3 Lottery
                </Text>
                <Text
                  style={[
                    styles.gameTimeText,
                    {color: item === gameTimeOption ? '#fff' : 'grey'},
                  ]}>
                  {item} Min
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
        <FlatList
          data={[]}
          ListHeaderComponent={
            <View style={styles.contentContainer}>
              <View style={styles.flatlistView}>
                <View style={styles.colorOptions}>
                  <View style={styles.fleContainer}>
                    <Text style={styles.periodText}>Period</Text>
                    <TouchableWithoutFeedback>
                      <View
                        style={{
                          ...styles.playView,
                          marginLeft: Metrics.rfv(10),
                        }}>
                        <FontAwesome5
                          name="clipboard-list"
                          color={Colors.Primary_100}
                          size={20}
                        />
                        <Text style={styles.playText}>How to play</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                  <Text style={styles.TimeText}>Time remaining</Text>
                </View>
                <View style={styles.colorOptions}>
                  <Text style={styles.NumText}>20240810091233</Text>
                  <Timer
                    setClockVisible={setClockVisible}
                    ClockVisible={ClockVisible}
                    minute={gameTimeOption}
                    playsong={playsong}
                    onFiveSecondsLeft={handleFiveSecondsLeft}
                  />
                </View>

                <View style={styles.diceOuterView} />
                <View style={styles.sideBoxView} />
                <View style={styles.diceInnerView}>
                  <View style={styles.Tcontainer}>
                    <View style={[styles.triangle, styles.arrowRight]} />
                    <View style={styles.mainView}>
                      {diceValue.map((value, index) => (
                        <View
                          key={index}
                          style={{
                            // margin: 0,
                            backgroundColor: 'grey',
                            padding: 10,
                          }}>
                          <FastImage
                            source={getDiceImage(value)} // Get the dice image based on the value
                            style={{
                              width: Metrics.rfv(70),
                              height: Metrics.rfv(70),
                            }}
                          />
                        </View>
                      ))}
                    </View>
                    <View style={[styles.triangle, styles.arrowLeft]} />
                  </View>
                </View>
                {/* black Vieew */}

                <View style={[styles.colorOptions, {paddingHorizontal: 0}]}>
                  {gameType.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{
                        backgroundColor:
                          option === item ? '#a32324' : '#f6f6f6',
                        ...styles.gameView,
                      }}
                      onPress={() => {
                        console.log('-=-=-=-=-=-item-=-=-=-=-=-=-', item, typeof item);
                        
                        setOption(item);
                      }}>
                      <Text
                        style={{
                          ...styles.optionText,
                          color: option === item ? '#fff' : 'grey',
                        }}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {option === 'Total' && (
                  <View
                    style={{
                      backgroundColor: ClockVisible ? '#666666' : '#fff',
                    }}>
                    <View>
                      <View style={styles.gameDataContainer}>
                        {gameData.map((item, index) => (
                          <GameDataItem
                            key={index}
                            item={item}
                            ClockVisible={ClockVisible}
                            handleNumber={handleNumber}
                          />
                        ))}
                      </View>

                      <View style={styles.sizeOptions}>
                        <SizeOptionButton
                          label="Big"
                          color="#feaa57"
                          ClockVisible={ClockVisible}
                          setName={setName}
                          setSelectedColor={setSelectedColor}
                          bottomSheetRef={bottomSheetRef}
                        />
                        <SizeOptionButton
                          label="Small"
                          color="#38bdf8"
                          ClockVisible={ClockVisible}
                          setName={setName}
                          setSelectedColor={setSelectedColor}
                          bottomSheetRef={bottomSheetRef}
                        />
                        <SizeOptionButton
                          label="Odd"
                          color="#fb5b5b"
                          ClockVisible={ClockVisible}
                          setName={setName}
                          setSelectedColor={setSelectedColor}
                          bottomSheetRef={bottomSheetRef}
                        />
                        <SizeOptionButton
                          label="Even"
                          color="#18b660"
                          ClockVisible={ClockVisible}
                          setName={setName}
                          setSelectedColor={setSelectedColor}
                          bottomSheetRef={bottomSheetRef}
                        />
                      </View>
                    </View>
                    {ClockVisible && renderTimeBoxes()}
                  </View>
                )}
                {option === '2 same' && (
                  <View>
                    <TextWithIcon
                      text={'2 matching numbers: odds (13.38)'}
                      onIconPress={() => {
                        handleIconPress(2.1);
                      }}
                    />
                    <DigitsRow
                      digits={digitsOptions['2 same']}
                      backgroundColor="white"
                      ClickOnNumber={() => {
                        handleText(2.1);
                      }}
                    />
                    <TextWithIcon
                      text={'A pair of unique numbers: odds'}
                      onIconPress={() => {
                        handleIconPress(2.2);
                      }}
                    />
                    <DigitsRow
                      digits={digitsOptions['2 same']}
                      backgroundColor={Colors.white}
                      color={Colors.Light_red}
                      ClickOnNumber={() => {
                        handleText(2.2);
                      }}
                    />
                    <DigitsRow
                      digits={digitsOptions['Different']}
                      backgroundColor={Colors.white}
                      color={Colors.Light_green}
                      ClickOnNumber={() => {
                        handleText(2.2);
                      }}
                    />
                  </View>
                )}

                {option === '3 same' && (
                  <View>
                    <TextWithIcon
                      text={'3 of the same number: odds (207.36)'}
                      onIconPress={() => {
                        handleIconPress(3.1);
                      }}
                    />
                    <DigitsRow
                      digits={digitsOptions['3 same']}
                      backgroundColor="white"
                      ClickOnNumber={() => {
                        handleText(3.1);
                      }}
                    />
                    <TextWithIcon
                      text={'3 of the same number: odds'}
                      onIconPress={() => {
                        handleIconPress(3.2);
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        handleText(3.2);
                      }}>
                      <View
                        style={{
                          ...styles.digitsRow,
                          ...styles.digitRow2,
                        }}>
                        <Text
                          style={{
                            ...styles.twoSameNo,
                            ...styles.oneItem,
                          }}>
                          Any 3 of the same number: odds(34.56)
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}

                {option === 'Different' && (
                  <View>
                    <TextWithIcon
                      text={'3 different numbers: odds (34.56)'}
                      onIconPress={() => {
                        handleIconPress(4.1);
                      }}
                    />
                    <DigitsRow
                      digits={digitsOptions['Different']}
                      backgroundColor="white"
                      ClickOnNumber={() => {
                        handleText(4.1);
                      }}
                    />
                    <TextWithIcon
                      text={'3 continuous numbers: odds (34.56)'}
                      onIconPress={() => {
                        handleIconPress(4.2);
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        handleText(4.2);
                      }}>
                      <View
                        style={{
                          ...styles.digitsRow,
                          ...styles.digitRow2,
                        }}>
                        <Text
                          style={{
                            ...styles.twoSameNo,
                            ...styles.oneItem,
                          }}>
                          3 continuous numbers
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TextWithIcon
                      text={'2 different numbers: odds(6.91)'}
                      onIconPress={() => {
                        handleIconPress(4.3);
                      }}
                    />
                    <DigitsRow
                      digits={digitsOptions['Different']}
                      backgroundColor="white"
                      ClickOnNumber={() => {
                        handleText(4.3);
                      }}
                    />
                  </View>
                )}
              </View>
              <View style={styles.historyButtons}>
                <HistoryButton
                  selectedButton={selectedButton}
                  buttonType="gameHistory"
                  handlePress={handlePress}
                  label="Game History"
                />
                <HistoryButton
                  selectedButton={selectedButton}
                  buttonType="chart"
                  handlePress={handlePress}
                  label="Chart"
                />
                <HistoryButton
                  selectedButton={selectedButton}
                  buttonType="myHistory"
                  handlePress={handlePress}
                  label="My History"
                />
              </View>
              {selectedButton === 'gameHistory' && <K3Winningtable />}
              {selectedButton === 'chart' && <KChart />}
              {selectedButton === 'myHistory' && (
                <MyHistory ItemKey={'FromK3'} navigation={navigation} />
              )}
              {
                <Modal
                  transparent={true}
                  animationType="slide"
                  visible={modalVisible}
                  onRequestClose={handleBackdropPress}>
                  <TouchableWithoutFeedback onPress={handleBackdropPress}>
                    <View style={styles.modalContainer}>
                      <View style={styles.modalContent}>
                        <View style={{flexDirection: 'row'}}>
                          {/* First Die */}
                          <FastImage
                            style={styles.diesView}
                            source={getDiesImage(ModalWithItem, 0)}
                          />

                          {/* Second Die */}
                          <FastImage
                            style={{
                              ...styles.diesView,
                              marginLeft: Metrics.rfv(10),
                            }}
                            source={getDiesImage(ModalWithItem, 1)}
                          />

                          {/* Third Die (only for ModalWithItem != 4.3) */}
                          {ModalWithItem !== 4.3 && (
                            <FastImage
                              style={{
                                ...styles.diesView,
                                marginLeft: Metrics.rfv(10),
                              }}
                              source={getDiesImage(ModalWithItem, 2)}
                            />
                          )}
                        </View>

                        <Text style={styles.currentModal}>
                          {currentModalContent}
                        </Text>

                        <TouchableOpacity
                          style={styles.closeButton}
                          onPress={() => setModalVisible(false)}>
                          <TouchableOpacity
                            onPress={() => setModalVisible(false)}>
                            <AntDesign
                              name="closecircleo"
                              color={Colors.white}
                              size={Metrics.rfv(30)}
                              style={{marginLeft: Metrics.rfv(10)}}
                            />
                          </TouchableOpacity>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </Modal>
              }
            </View>
          }
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <Sheet
        bottomSheetRef={bottomSheetRef}
        selectedColor={selectedColor}
        gameTimeOption={gameTimeOption}
        selectedName={Name}
        onClose={() => bottomSheetRef.current?.close()}
        // Number={Number}
      />
    </PageWrapperView>
  );
};

export default K3;
