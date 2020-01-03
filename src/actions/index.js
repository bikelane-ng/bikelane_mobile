import * as loginActions from './login';
import * as registerActions from './register';
import * as userActions from './user';
import * as appActions from './app';
import * as driverActions from './driver';
import * as homeActions from './home';
import * as adminActions from './admin';

export const doLogin = loginActions.doLogin,
    doRegister = registerActions.doRegister,
    inputNumber = appActions.inputNumber,
    validateMobile = appActions.validateMobile,
    generateOTP = appActions.generateOTP,
    verifyOTP = appActions.verifyOTP,
    logout = userActions.logout,
    initApp = appActions.initializeApp,
    updateDriverProfile = driverActions.driverProfile,
    fetchDriver = driverActions.fetchDriver,
    bankDetails = driverActions.bankDetails,
    driverInfo = driverActions.driverInfo,
    addPhoto = driverActions.addPhoto,
    addBankDetails = driverActions.addBankDetails,
    personalDocs = driverActions.personalDocs,
    editUser = userActions.editUser,
    editDriver = driverActions.editDriver,
    fetchUser = userActions.fetchUser,
    addCard = userActions.addCard,
    getCurrentLocation = homeActions.getCurrentLocation,
    getCurrentAddress = homeActions.getCurrentAddress,
    toggleSearchModal = homeActions.toggleSearchResultModal,
    closeToggleModal = homeActions.unToggleSearchResultModal,
    getAddressPredictions = homeActions.getAddressPredictions,
    getInputData = homeActions.getInputData,
    clearInputData = homeActions.clearInputData,
    getSelectedAddress = homeActions.getSelectedAddress,
    updateInputAddress = homeActions.updateInputAddress,
    getRouteDirections = homeActions.getRouteDirections,
    getNearbyDrivers = homeActions.getNearbyDrivers,
    nearestDriver = homeActions.nearestDriver,
    requestRide = homeActions.requestRide,
    cancelRide = homeActions.cancelRide,
    mapRef = homeActions.mapRef,
    confirmSelection = homeActions.confirmSelection,
    driverReg = adminActions.driverReg,
    allDrivers = adminActions.allDrivers,
    driverDetails = driverActions.driverDetails,
    estimateRideDetails = homeActions.estimateRideDetails
