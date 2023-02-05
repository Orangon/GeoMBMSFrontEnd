import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';

const Footer: React.FC = () => {

  const defaultMessage = 'OneSIS, All Rights Reserved.';

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'onesis',
          title: '地理空间智能系统门户',
          href: 'https://www.onesis.cn/introduce',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/lreis2415',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
