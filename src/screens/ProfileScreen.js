import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#4CAF50" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Icon name="cog" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileInitials}>JD</Text>
            </View>
          </View>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>john.doe@example.com</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Pickups</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>56</Text>
            <Text style={styles.statLabel}>kg Recycled</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>₹200</Text>
            <Text style={styles.statLabel}>Rewards</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="history" size={24} color="#4CAF50" style={styles.menuIcon} />
            <Text style={styles.menuText}>Pickup History</Text>
            <Icon name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon name="wallet" size={24} color="#4CAF50" style={styles.menuIcon} />
            <Text style={styles.menuText}>Payment Methods</Text>
            <Icon name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon name="home" size={24} color="#4CAF50" style={styles.menuIcon} />
            <Text style={styles.menuText}>Saved Addresses</Text>
            <Icon name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon name="gift" size={24} color="#4CAF50" style={styles.menuIcon} />
            <Text style={styles.menuText}>Rewards & Offers</Text>
            <Icon name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon name="headphones" size={24} color="#4CAF50" style={styles.menuIcon} />
            <Text style={styles.menuText}>Support</Text>
            <Icon name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Icon name="information" size={24} color="#4CAF50" style={styles.menuIcon} />
            <Text style={styles.menuText}>About Us</Text>
            <Icon name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Icon name="logout" size={20} color="#FF5252" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  settingsButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    marginBottom: 10,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitials: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  editProfileButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  editProfileText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#ddd',
    marginHorizontal: 10,
  },
  menuSection: {
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: 'white',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 2,
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5252',
  },
});

export default ProfileScreen;
