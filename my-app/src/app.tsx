import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';

const isDev = process.env.NODE_ENV === 'development';
/**
 * 无需获取用户登录状态的页面
 */
const loginPath = '/user/login';
const registerPath = '/user/register';
const WHITE_LIST = [registerPath,loginPath];


/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};
import type { RequestConfig } from 'umi';
import { message } from 'antd';
import { GeoMBMS } from './services/ant-design-pro/typings';



/**
 * 自定义响应拦截器，拦截所有后端发回的申请
 * @param response
 * @param options
 * @returns
 */
const demoResponseInterceptors = async (response: Response, options: RequestConfig) => {
  const res = await response.clone().json();
  if (res.code === 200||res.code === 2000) {
    console.log(res.data)
    return res.data;
  }
  else if (res.code === 4010) {
    message.error(res.message);
    history.push(loginPath);
  } else {
    message.error(res.description);
  }
  return res.data;
};
/**
 * 设置超时时长
 * 响应拦截器
 * 前缀，如果是开发环境，就改为mbms.cn
 */
export const request: RequestConfig = {
  timeout: 10000,
  responseInterceptors: [demoResponseInterceptors],
  prefix:process.env.NODE_ENV === 'production' ? 'http://mbms.cn' : undefined,
};


/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: GeoMBMS.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<GeoMBMS.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      return await queryCurrentUser();
    } catch (error) {
      // 如果没有登录，就回到登录页面
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录注册页面，执行
  if (!WHITE_LIST.includes(history.location.pathname)) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.username,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      //设置白名单
      if(WHITE_LIST.includes(location.pathname)){
        return;
      }
      // 如果没有登录/注册，重定向到 login
      if (!initialState?.currentUser) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs" key="docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
