import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

export function FacebookIcon({ size = 12, color = 'white' }: { size?: number; color?: string }) {
  return (
    <Svg width={size * 0.486} height={size} viewBox="0 0 5.83244 12" fill="none">
      <G>
        <Path
          d="M1.48889 12V6.36925H0V4.34191H1.48889V2.6103C1.48889 1.24958 2.36838 0 4.39492 0C5.21543 0 5.82216 0.07866 5.82216 0.07866L5.77435 1.97185C5.77435 1.97185 5.15558 1.96583 4.48036 1.96583C3.74956 1.96583 3.63247 2.30261 3.63247 2.86158V4.34191H5.83244L5.73672 6.36925H3.63247V12H1.48889Z"
          fill={color}
        />
      </G>
    </Svg>
  );
}
