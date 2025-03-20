import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SchedulePickupScreen = ({ navigation, route }) => {
  const initialServiceType = route.params?.serviceType || '';
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    wasteType: initialServiceType,
    date: '',
    time: '',
    address: '',
    notes: '',
  });

  const wasteTypes = [
    { id: '1', title: 'Household Waste', icon: 'trash-can-outline', description: 'Regular domestic waste from your home' },
    { id: '2', title: 'Recyclables', icon: 'recycle', description: 'Paper, plastic, glass and metal items' },
    { id: '3', title: 'E-Waste', icon: 'laptop', description: 'Electronic devices and accessories' },
    { id: '4', title: 'Green Waste', icon: 'leaf', description: 'Yard trimmings and plant material' },
  ];

  const handleNext = () => {
    if (step === 1 && !formData.wasteType) {
      showValidationError('Please select a waste category to continue');
      return;
    }
    if (step === 2 && (!formData.date || !formData.time)) {
      showValidationError('Please select both date and time for your pickup');
      return;
    }
    if (step === 3 && !formData.address) {
      showValidationError('Please provide a complete pickup address');
      return;
    }
    
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Submit the form
      showSuccessMessage();
    }
  };

  const showValidationError = (message) => {
    Alert.alert(
      'Information Required',
      message,
      [{ text: 'Understood', style: 'default' }],
      { cancelable: true }
    );
  };

  const showSuccessMessage = () => {
    Alert.alert(
      'Pickup Scheduled',
      'Your waste collection has been successfully scheduled. You will receive a confirmation shortly.',
      [
        { 
          text: 'Return to Home', 
          onPress: () => navigation.navigate('Home')
        }
      ],
      { cancelable: false }
    );
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigation.goBack();
    }
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3, 4].map((item) => (
        <View key={item} style={styles.stepContainer}>
          <View
            style={[
              styles.stepCircle,
              {
                backgroundColor: step >= item ? '#2E7D32' : '#e0e0e0',
              },
            ]}
          >
            <Text style={styles.stepNumber}>{item}</Text>
          </View>
          {item < 4 && (
            <View
              style={[
                styles.stepLine,
                {
                  backgroundColor: step > item ? '#2E7D32' : '#e0e0e0',
                },
              ]}
            />
          )}
        </View>
      ))}
    </View>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Select Waste Category</Text>
            <Text style={styles.stepDescription}>
              Please select the appropriate category for your waste collection
            </Text>
            <View style={styles.wasteTypeContainer}>
              {wasteTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.wasteTypeButton,
                    formData.wasteType === type.title && styles.selectedWasteType,
                  ]}
                  onPress={() =>
                    setFormData({ ...formData, wasteType: type.title })
                  }
                >
                  <Icon
                    name={type.icon}
                    size={30}
                    color={formData.wasteType === type.title ? '#fff' : '#2E7D32'}
                  />
                  <Text
                    style={[
                      styles.wasteTypeText,
                      formData.wasteType === type.title && styles.selectedWasteTypeText,
                    ]}
                  >
                    {type.title}
                  </Text>
                  <Text
                    style={[
                      styles.wasteTypeDescription,
                      formData.wasteType === type.title && styles.selectedWasteTypeDescription,
                    ]}
                  >
                    {type.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      case 2:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Schedule Collection</Text>
            <Text style={styles.stepDescription}>
              Select your preferred date and time for waste collection
            </Text>
            
            <Text style={styles.inputLabel}>Collection Date</Text>
            <TouchableOpacity
              style={styles.dateTimeInput}
              onPress={() => {
                // Here you would typically show a date picker
                // For now, we'll just set a dummy date
                setFormData({ ...formData, date: 'Tuesday, 18 Mar 2025' });
              }}
            >
              <Icon name="calendar" size={22} color="#2E7D32" style={styles.inputIcon} />
              <Text style={[styles.inputText, formData.date ? styles.inputTextSelected : {}]}>
                {formData.date || 'Select a date for collection'}
              </Text>
              <Icon name="chevron-right" size={22} color="#999" />
            </TouchableOpacity>

            <Text style={styles.inputLabel}>Collection Time Window</Text>
            <TouchableOpacity
              style={styles.dateTimeInput}
              onPress={() => {
                // Here you would typically show a time picker
                // For now, we'll just set a dummy time
                setFormData({ ...formData, time: '9:00 AM - 12:00 PM' });
              }}
            >
              <Icon name="clock-outline" size={22} color="#2E7D32" style={styles.inputIcon} />
              <Text style={[styles.inputText, formData.time ? styles.inputTextSelected : {}]}>
                {formData.time || 'Select a time window'}
              </Text>
              <Icon name="chevron-right" size={22} color="#999" />
            </TouchableOpacity>
            
            <View style={styles.infoCard}>
              <Icon name="information-outline" size={20} color="#2E7D32" style={styles.infoIcon} />
              <Text style={styles.infoText}>
                Our collection team will arrive within your selected time window. Please ensure waste is properly segregated and accessible.
              </Text>
            </View>
          </View>
        );
      case 3:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Collection Location</Text>
            <Text style={styles.stepDescription}>
              Provide the address where your waste should be collected
            </Text>
            
            <Text style={styles.inputLabel}>Complete Address</Text>
            <View style={styles.addressInputContainer}>
              <TextInput
                style={styles.addressInput}
                placeholder="Enter your full address including landmarks"
                value={formData.address}
                onChangeText={(text) => setFormData({ ...formData, address: text })}
                multiline
              />
              <TouchableOpacity
                style={styles.mapButton}
                onPress={() => navigation.navigate('MapScreen')}
              >
                <Icon name="map-marker" size={20} color="#fff" />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Special Instructions (Optional)</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Add any specific instructions for our collection team"
              value={formData.notes}
              onChangeText={(text) => setFormData({ ...formData, notes: text })}
              multiline
            />
            
            <View style={styles.infoCard}>
              <Icon name="information-outline" size={20} color="#2E7D32" style={styles.infoIcon} />
              <Text style={styles.infoText}>
                Providing accurate location details helps our team locate your waste quickly. Consider adding gate codes, building numbers, or directions if necessary.
              </Text>
            </View>
          </View>
        );
      case 4:
        return (
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Review & Confirm</Text>
            <Text style={styles.stepDescription}>
              Please review your collection details below before confirming
            </Text>
            
            <View style={styles.confirmationCard}>
              <View style={styles.confirmationHeader}>
                <Icon name="check-circle-outline" size={24} color="#2E7D32" />
                <Text style={styles.confirmationHeaderText}>Collection Summary</Text>
              </View>
              
              <View style={styles.confirmationItem}>
                <Text style={styles.confirmationLabel}>Waste Type:</Text>
                <Text style={styles.confirmationValue}>{formData.wasteType}</Text>
              </View>
              
              <View style={styles.confirmationItem}>
                <Text style={styles.confirmationLabel}>Date:</Text>
                <Text style={styles.confirmationValue}>{formData.date}</Text>
              </View>
              
              <View style={styles.confirmationItem}>
                <Text style={styles.confirmationLabel}>Time:</Text>
                <Text style={styles.confirmationValue}>{formData.time}</Text>
              </View>
              
              <View style={styles.confirmationItem}>
                <Text style={styles.confirmationLabel}>Address:</Text>
                <Text style={styles.confirmationValue}>{formData.address}</Text>
              </View>
              
              {formData.notes ? (
                <View style={styles.confirmationItem}>
                  <Text style={styles.confirmationLabel}>Instructions:</Text>
                  <Text style={styles.confirmationValue}>{formData.notes}</Text>
                </View>
              ) : null}
              
              <View style={styles.pricingContainer}>
                <Text style={styles.pricingTitle}>Service Charges</Text>
                <View style={styles.pricingItem}>
                  <Text style={styles.pricingItemLabel}>Standard Collection Fee</Text>
                  <Text style={styles.pricingItemValue}>₹199.00</Text>
                </View>
                <View style={styles.pricingItem}>
                  <Text style={styles.pricingItemLabel}>Environmental Contribution</Text>
                  <Text style={styles.pricingItemValue}>₹0.00</Text>
                </View>
                <View style={styles.pricingTotal}>
                  <Text style={styles.pricingTotalText}>Total Amount</Text>
                  <Text style={styles.pricingTotalAmount}>₹199.00</Text>
                </View>
              </View>
              
              <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  By confirming, you agree to our terms of service and waste handling guidelines. Payment will be collected upon completion of service.
                </Text>
              </View>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#2E7D32" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule Collection</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 30 }}>
        {renderStepIndicator()}
        {renderStepContent()}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, step === 4 && styles.confirmButton]}
          onPress={handleNext}
        >
          <Text style={styles.buttonText}>
            {step === 4 ? 'Confirm Collection' : 'Continue'}
          </Text>
          {step < 4 && <Icon name="arrow-right" size={20} color="#fff" style={styles.buttonIcon} />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#2E7D32',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  stepNumber: {
    color: 'white',
    fontWeight: 'bold',
  },
  stepLine: {
    height: 2,
    width: 40,
    backgroundColor: '#e0e0e0',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  stepDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
    lineHeight: 22,
  },
  wasteTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  wasteTypeButton: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  selectedWasteType: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  wasteTypeText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  wasteTypeDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  selectedWasteTypeText: {
    color: 'white',
  },
  selectedWasteTypeDescription: {
    color: '#e0f2f1',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    marginTop: 20,
  },
  dateTimeInput: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 16,
    marginBottom: 15,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  inputIcon: {
    marginRight: 12,
  },
  inputText: {
    color: '#999',
    flex: 1,
  },
  inputTextSelected: {
    color: '#333',
    fontWeight: '500',
  },
  addressInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 15,
    elevation: 1,
    minHeight: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  mapButton: {
    backgroundColor: '#2E7D32',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    elevation: 3,
  },
  notesInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginBottom: 15,
    elevation: 1,
    minHeight: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
    marginBottom: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#2E7D32',
  },
  infoIcon: {
    marginRight: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  confirmationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 0,
    elevation: 2,
    overflow: 'hidden',
  },
  confirmationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  confirmationHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginLeft: 10,
  },
  confirmationItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  confirmationLabel: {
    flex: 1,
    fontSize: 16,
    color: '#666',
  },
  confirmationValue: {
    flex: 2,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  pricingContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  pricingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  pricingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  pricingItemLabel: {
    fontSize: 15,
    color: '#666',
  },
  pricingItemValue: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  pricingTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  pricingTotalText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  pricingTotalAmount: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  termsContainer: {
    padding: 20,
    backgroundColor: '#fafafa',
  },
  termsText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    textAlign: 'center',
  },
  footer: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    elevation: 5,
  },
  button: {
    backgroundColor: '#2E7D32',
    borderRadius: 10,
    height: 54,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#2E7D32',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginLeft: 8,
  },
});

export default SchedulePickupScreen;