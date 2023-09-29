import { memo } from 'react';

function ToggleSounds({ allowSound, setAllowSound }) {
  return (
    <button
      className="btn-sound"
      onClick={() => setAllowSound((allow) => !allow)}
    >
      {allowSound ? '🔈' : '🔇'}
    </button>
  );
}

export default memo(ToggleSounds);

// Well, if it is some children components that are re-rendering, just because the parent component is re-rendering, then the solution is to memorize those components.
