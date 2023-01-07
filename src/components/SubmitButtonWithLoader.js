import SubmitButton from './form/SubmitButton';
import { ActivityIndicator } from "react-native-paper";
import { spacing } from '../theme';
const SubmitButtonWithLoader = ({loading, label}) => {
  return (
    <SubmitButton
      title={loading?
        <ActivityIndicator
          style={{ marginTop: 5 }}
          animating={true}
          color="white"
          size={25}
        />:
        label
      }
      style={{ marginTop: spacing[4] }}
    />
  );
}

export default SubmitButtonWithLoader