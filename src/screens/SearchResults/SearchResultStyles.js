import {Dimensions} from 'react-native';
var width = Dimensions.get('window').width; //full width
const styles = {
  searchResultsWrapper: {
    // top: 160,
    // position: "absolute",
    marginTop: 10,
    // height: '42%',
    // width: width,
    // height: 1000,
    // backgroundColor: "#fff",
    opacity: 0.9,
  },
  primaryText: {
    fontFamily: 'NoirPro-Medium',
    color: '#373737',
  },
  secondaryText: {
    fontStyle: 'italic',
    color: '#7D7D7D',
  },
  leftContainer: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    borderLeftColor: '#7D7D7D',
  },
  leftIcon: {
    fontSize: 20,
    color: '#EFD303',
  },
  distance: {
    fontSize: 12,
  },
  cardShadow: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
    paddingLeft: 15,
    marginRight: 5,
    marginTop: 10,
  },
  input: {
    fontFamily: 'NoirPro-Regular',
    color: '#222B2F',
    height: 45,
    fontSize: 13,
    paddingVertical: 4,
  },
};

export default styles;
