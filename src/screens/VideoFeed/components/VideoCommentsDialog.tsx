import {View} from 'react-native'
import {Trans} from '@lingui/react/macro'

import {PostThread} from '#/screens/PostThread'
import {atoms as a, useTheme} from '#/alf'
import * as Dialog from '#/components/Dialog'
import {Text} from '#/components/Typography'

export function VideoCommentsDialog({
  control,
  postUri,
  replyCount,
}: {
  control: Dialog.DialogControlProps
  postUri: string
  replyCount?: number
}) {
  const t = useTheme()

  return (
    <Dialog.Outer control={control}>
      <Dialog.Handle />
      <Dialog.ScrollableInner
        label="Comments"
        style={[{height: '80%', maxHeight: 750}, a.p_0]}>
        {/* Header */}
        <View
          style={[
            a.px_lg,
            a.py_md,
            a.border_b,
            t.atoms.border_contrast_low,
            a.flex_row,
            a.align_center,
            a.justify_between,
          ]}>
          <Text style={[a.text_lg, a.font_bold]}>
            <Trans>Comments</Trans> {typeof replyCount === 'number' ? `(${replyCount})` : ''}
          </Text>
        </View>

        {/* عرض الثريد والتعليقات بالكامل */}
        <View style={[a.flex_1]}>
          <PostThread uri={postUri} />
        </View>
      </Dialog.ScrollableInner>
    </Dialog.Outer>
  )
}