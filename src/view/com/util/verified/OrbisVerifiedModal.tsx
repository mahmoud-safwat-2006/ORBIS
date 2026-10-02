import React, {useState} from 'react'
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native'
import {OrbisVerifiedBadge} from './OrbisVerifiedBadge'

interface OrbisVerifiedModalProps {
  visible: boolean
  onClose: () => void
}

export function OrbisVerifiedModal({visible, onClose}: OrbisVerifiedModalProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = () => {
    setSubscribed(true)
    setTimeout(() => {
      onClose()
      setSubscribed(false)
    }, 2000)
  }

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.badgeRow}>
              <Text style={styles.title}>ORBIS</Text>
              <OrbisVerifiedBadge size={26} tier="personal" />
              <Text style={styles.titleSub}>Verified</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeTxt}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
            <Text style={styles.heroText}>
              Elevate your presence. Protect your identity. Unlock the next generation of social networking.
            </Text>

            {/* Features List (Competing directly with Meta) */}
            <View style={styles.featuresBox}>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🛡️</Text>
                <View style={styles.featureTextCol}>
                  <Text style={styles.featureTitle}>Proactive Impersonation Defense</Text>
                  <Text style={styles.featureDesc}>
                    Advanced AI-powered monitoring stops identity theft and fake accounts before they start.
                  </Text>
                </View>
              </View>

              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>⭐</Text>
                <View style={styles.featureTextCol}>
                  <Text style={styles.featureTitle}>Signature Verified Badge</Text>
                  <Text style={styles.featureDesc}>
                    Official seal of authenticity verified by ORBIS cryptographic protocols.
                  </Text>
                </View>
              </View>

              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>⚡</Text>
                <View style={styles.featureTextCol}>
                  <Text style={styles.featureTitle}>Priority Direct Support</Text>
                  <Text style={styles.featureDesc}>
                    Skip the bots. Get immediate 24/7 dedicated human engineer support.
                  </Text>
                </View>
              </View>

              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🚀</Text>
                <View style={styles.featureTextCol}>
                  <Text style={styles.featureTitle}>Increased Discovery Reach</Text>
                  <Text style={styles.featureDesc}>
                    Boost your posts, custom feeds, and replies with priority network distribution.
                  </Text>
                </View>
              </View>
            </View>

            {/* Pricing Toggle */}
            <View style={styles.toggleRow}>
              <TouchableOpacity
                style={[
                  styles.toggleBtn,
                  billingCycle === 'monthly' && styles.toggleBtnActive,
                ]}
                onPress={() => setBillingCycle('monthly')}>
                <Text
                  style={[
                    styles.toggleBtnTxt,
                    billingCycle === 'monthly' && styles.toggleBtnTxtActive,
                  ]}>
                  Monthly ($9.99/mo)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.toggleBtn,
                  billingCycle === 'annual' && styles.toggleBtnActive,
                ]}
                onPress={() => setBillingCycle('annual')}>
                <Text
                  style={[
                    styles.toggleBtnTxt,
                    billingCycle === 'annual' && styles.toggleBtnTxtActive,
                  ]}>
                  Annual ($95.99/yr) - Save 20%
                </Text>
              </TouchableOpacity>
            </View>

            {/* Action CTA */}
            <TouchableOpacity
              style={[styles.subscribeBtn, subscribed && styles.subscribedSuccess]}
              onPress={handleSubscribe}
              disabled={subscribed}>
              <Text style={styles.subscribeBtnTxt}>
                {subscribed ? '✓ Subscribed to ORBIS Verified!' : `Get ORBIS Verified — ${billingCycle === 'annual' ? '$95.99 / year' : '$9.99 / month'}`}
              </Text>
            </TouchableOpacity>

            <Text style={styles.termsNotice}>
              Identity verification with government ID required after subscription. Powered by ORBIS Security & AT Protocol.
            </Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    backgroundColor: '#0F141C',
    borderRadius: 20,
    width: '100%',
    maxWidth: 520,
    maxHeight: '90%',
    borderWidth: 1,
    borderColor: '#1E293B',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  titleSub: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0085FF',
    marginLeft: 6,
  },
  closeBtn: {
    padding: 6,
  },
  closeTxt: {
    fontSize: 18,
    color: '#94A3B8',
    fontWeight: 'bold',
  },
  body: {
    padding: 22,
  },
  heroText: {
    fontSize: 15,
    color: '#CBD5E1',
    lineHeight: 22,
    marginBottom: 20,
    textAlign: 'center',
  },
  featuresBox: {
    backgroundColor: '#161E2E',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  featureIcon: {
    fontSize: 22,
    marginRight: 12,
    marginTop: 2,
  },
  featureTextCol: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 18,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  toggleBtnActive: {
    backgroundColor: '#0085FF',
  },
  toggleBtnTxt: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '600',
  },
  toggleBtnTxtActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  subscribeBtn: {
    backgroundColor: '#0085FF',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  subscribedSuccess: {
    backgroundColor: '#10B981',
  },
  subscribeBtnTxt: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  termsNotice: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 16,
  },
})
