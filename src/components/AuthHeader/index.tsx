import { colors } from '../../config/themeSettings';
import { Typography } from 'antd';
import './index.scss'
const { Text, Title } = Typography;

interface IAuthHeaderProps {
  title: string;
  desc: string;
}

const AuthHeader: React.FC<IAuthHeaderProps> = (props) => {
  return (
    <>
      <Title className="mt-4" level={3}>
        {props.title}
      </Title>
      <Text className="my-4 block" style={{ color: colors.gray[200] }}>
        {props.desc}
      </Text>
    </>
  );
};

export default AuthHeader;
