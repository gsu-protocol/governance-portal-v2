import { Text, ThemeUIStyleObject } from 'theme-ui';

type Props = {
  text: string;
  styles?: ThemeUIStyleObject;
};

export const CardSummary = ({ text, styles }: Props): JSX.Element => (
  <Text
    as="p"
    sx={{
      color: 'onSecondary',
      ...styles
    }}
  >
    {text}
  </Text>
);
