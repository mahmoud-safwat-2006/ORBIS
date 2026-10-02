const fs = require('fs');

const path = 'src/view/com/posts/PostFeedErrorMessage.tsx';
let code = fs.readFileSync(path, 'utf8');

// Handle author feed errors gracefully as EmptyState
const replacement = `  if (feedDesc.startsWith('author')) {
    return (
      <EmptyState
        icon={WarningIcon}
        iconSize="2xl"
        message={_l(msgLingui\`لا توجد منشورات متاحة حالياً\`)}
        style={{paddingVertical: 40}}
      />
    )
  }

  return (
    <ErrorMessage
      message={cleanError(error)}
      onPressTryAgain={onPressTryAgain}
    />
  )`;

code = code.replace(
  /return \(\s*<ErrorMessage\s+message=\{cleanError\(error\)\}\s+onPressTryAgain=\{onPressTryAgain\}\s*\/>\s*\)/,
  replacement
);

fs.writeFileSync(path, code, 'utf8');
console.log('Successfully handled author feed internal errors gracefully!');
