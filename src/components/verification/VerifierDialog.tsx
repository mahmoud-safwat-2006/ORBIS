import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import * as Dialog from '#/components/Dialog'
import {Button, ButtonText} from '#/components/Button'
import type * as bsky from '#/types/bsky'

export function VerificationsDialog({
  control,
  profile,
}: {
  control: Dialog.DialogControlProps
  profile: bsky.profile.AnyProfileView
}) {
  const isFounder = Boolean(
    profile.handle?.includes('mahmoud-safwat') ||
    profile.displayName?.includes('Mahmoud Safwat') ||
    profile.handle === 'orbis.tech' ||
    profile.handle === 'orbis.app'
  )

  return (
    <Dialog.Outer control={control}>
      <Dialog.Handle />
      <Dialog.ScrollableInner
        label={isFounder ? 'مؤسس ومالك منصة ORBIS' : 'حساب موثق'}
        style={styles.inner}>
        {isFounder ? (
          <View style={styles.content}>
            <View style={styles.founderIconWrapper}>
              <Text style={{fontSize: 40}}>👑</Text>
            </View>

            <Text style={styles.title}>مؤسس ومالك منصة ORBIS</Text>
            
            <View style={styles.founderTag}>
              <Text style={styles.founderTagText}>✔ الحساب الإداري الرسمي الأعلى</Text>
            </View>

            <Text style={styles.description}>
              هذا الحساب هو الحساب الشخصي الرسمي لمؤسس ومالك منصة ORBIS. يمتلك كافة الصلاحيات الحصرية لتوثيق الحسابات وإدارة المنصة بالكامل.
            </Text>

            <Button
              variant="solid"
              color="primary"
              size="large"
              label="تم"
              onPress={() => control.close()}
              style={{marginTop: 22, width: '100%'}}>
              <ButtonText>تم</ButtonText>
            </Button>
          </View>
        ) : (
          <View style={styles.content}>
            <View style={styles.verifiedIconWrapper}>
              <Text style={{fontSize: 34, color: '#ffffff'}}>✔</Text>
            </View>

            <Text style={styles.title}>
              {profile.displayName || profile.handle}
            </Text>

            <View style={styles.verifiedTag}>
              <Text style={styles.verifiedTagText}>✔ حساب موثق رسمياً</Text>
            </View>

            <Text style={styles.description}>
              تم توثيق هذا الحساب رسمياً واعتماده بالشارة الزرقاء من قِبل مؤسس ومالك منصة ORBIS.
            </Text>

            <Button
              variant="solid"
              color="primary"
              size="large"
              label="إغلاق"
              onPress={() => control.close()}
              style={{marginTop: 22, width: '100%'}}>
              <ButtonText>إغلاق</ButtonText>
            </Button>
          </View>
        )}
      </Dialog.ScrollableInner>
    </Dialog.Outer>
  )
}

export const VerifierDialog = VerificationsDialog
export default VerificationsDialog

const styles = StyleSheet.create({
  inner: {
    maxWidth: 440,
    width: '100%',
  },
  content: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  founderIconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0284c7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  verifiedIconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#0284c7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 6,
  },
  founderTag: {
    backgroundColor: '#fef3c7',
    borderColor: '#f59e0b',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 14,
  },
  founderTagText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#b45309',
  },
  verifiedTag: {
    backgroundColor: '#f0fdf4',
    borderColor: '#86efac',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 14,
  },
  verifiedTagText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#15803d',
  },
  description: {
    fontSize: 15,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 8,
  },
});
